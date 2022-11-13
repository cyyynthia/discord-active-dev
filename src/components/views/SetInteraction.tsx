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

import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

type Props = {
  token?: string
  onNext: (token?: string) => void
  onPrev: () => void
}

export default function SetInteraction ({ token, onNext, onPrev }: Props) {
  const [ publicKey, setPublicKey ] = useState('<your_public_key>')
  useEffect(() => {
    if (!token) return
    fetch('https://discord.com/api/v10/oauth2/@me', { headers: { authorization: `Bearer ${token}`} })
      .then((r) => r.json())
      .then((r) => setPublicKey(r.application.verify_key))
  }, [ token ])

  return (
    <>
      <h2 class='page-title'>Fourth step: configure the interaction endpoint</h2>
      <p class='page-paragraph'>
        Whenever a user calls a command, Discord needs to know where to send the command to. That's the purpose of
        the <i>interactions endpoint</i>.
      </p>
      <p class='page-paragraph'>
        For now, we'll use a test server, that just does the bare minimum for the command to actually work. Go
        to your application's settings, and set the "Interactions Endpoint URL" to the following:
      </p>
      <p class='page-paragraph'>
        <code>https://disc-active-dev.cynthia.dev/i/{publicKey}</code>
      </p>
      <p class='page-paragraph'>
        The public key is the 64-char-long string Discord gives on your application's page.
      </p>

      <div class='flex'>
        <button onClick={() => onPrev()}>Prev step</button>
        <button onClick={() => onNext()}>Next step</button>
      </div>
    </>
  )
}
