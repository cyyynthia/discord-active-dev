/*
 * Copyright (c) 2022 Cynthia Rey, All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors
 *    may be used to endorse or promote products derived from this software without
 *    specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import type { IncomingMessage, ServerResponse } from 'http'

import {} from 'prom-client'
import { webcrypto } from 'crypto'
import http from 'http'

const URL_REG = /\/([a-z0-9]{64})/

const PING_RES = JSON.stringify({ type: 1 })
const CMD_RES = JSON.stringify({ type: 4, data: { content: 'Pong! :D', flags: 1 << 6 } })

async function validateSignature (req: IncomingMessage, body: string, key: string) {
  try {
    const signature = req.headers['x-signature-ed25519']
    const timestamp = req.headers['x-signature-timestamp']
    if (typeof signature !== 'string' || typeof timestamp !== 'string') {
      return false
    }

    const keyBuf = Buffer.from(key, 'hex')
    const cryptoKey = await webcrypto.subtle.importKey(
      'raw',
      keyBuf,
      { name: 'Ed25519', namedCurve: 'Ed25519' },
      false,
      [ 'verify' ]
    )

    return webcrypto.subtle.verify(
      'Ed25519',
      cryptoKey,
      Buffer.from(signature, 'hex'),
      Buffer.from(timestamp + body)
    )
  } catch (e) {
    return false
  }
}

function handleDiscordPayload (payload: any, res: ServerResponse) {
  let reply = ''
  switch (payload.type) {
    case 1:
      reply = PING_RES
      break
    case 2:
    case 3:
      reply = CMD_RES
      break
  }

  if (!reply) {
    res.writeHead(400).end('Bad request.')
    return
  }

  res.setHeader('content-type', 'application/json')
  res.setHeader('content-length', reply.length)
  res.end(reply)
}

function processRequest (req: IncomingMessage, res: ServerResponse) {
  const match = req.url?.match(URL_REG)
  if (!match) {
    res.writeHead(405).end('Not found.')
    return
  }

  if (req.method !== 'POST') {
    res.writeHead(405).end('Method not allowed.')
    return
  }

  let body = ''
  req.setEncoding('utf8')
  req.on('data', (d) => (body += d))
  req.on('end', async () => {
    const sigValid = await validateSignature(req, body, match[1])
    if (!sigValid) {
      res.writeHead(400).end('Bad request.')
      return
    }

    // Sig passed, we can safely trust this is JSON.
    handleDiscordPayload(JSON.parse(body), res)
  })
}

http.createServer(processRequest).listen(2789)
