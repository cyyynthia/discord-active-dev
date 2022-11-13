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

import type { Credentials } from '../App'

import { h } from 'preact'
import { useMemo, useState } from 'preact/hooks'

import { TextLink } from '../Link'
import ApiCallView from '../ApiCallView'
import { Response } from '../code/OAuthCredentials'

type Props = {
  credentials?: Credentials
  onNext: (token?: string) => void
  onPrev: () => void
}

export default function Authenticate ({ credentials, onNext, onPrev }: Props) {
  const [ token, setToken ] = useState('')
  const basicToken = useMemo(
    () => credentials ? btoa(`${credentials.clientId}:${credentials.clientSecret}`) : '',
    [ credentials ]
  )

  const canGoNext = useMemo(() => !credentials || !!token, [ credentials, token ])

  return (
    <>
      <h2 class='page-title'>Second step: authentication</h2>
      <p class='page-paragraph'>
        You now have your application's credentials. However, you're not yet ready to call the Discord API. You need
        to convert your credentials into an <i>OAuth2 Access Token</i>. To do so, you need to send your first (!)
        request to Discord, and perform a <i>Client Credentials Grant</i>.
      </p>
      <p class='page-paragraph'>
        You'll need to prepare a <i>Basic authentication token</i>. To get it, you simply need to join your Client ID
        and your Client Secret with a colon (<code>client_id:client_secret</code>), and encode it as Base64. You now
        have a Basic authentication token! Now, let's convert it to a <i>Bearer access token</i>, which is what we're
        interested in.
      </p>
      <p class='page-paragraph'>
        The request body will be urlencoded for this specific endpoint. That's kind of an ugly format, but it's only
        for this endpoint, and you'll then be able to use neat JSON data. For now, you can just use the body used below,
        and check Discord's documentation if you want more info about what this body is about.
      </p>

      <ApiCallView
        method='POST'
        url='https://discord.com/api/v10/oauth2/token'
        token={{ type: 'Basic', token: basicToken }}
        callable={!!basicToken}

        isUrlEncoded
        requestData='grant_type=client_credentials&scope=applications.commands.update'

        responseView={Response}
        onResponse={(res) => setToken(res.access_token)}
      />

      <p class='page-paragraph'>
        The <i>access_token</i> is what will allow you to call the Discord API on behalf of your application. As with
        the Client Secret, make sure you treat it like a password!
      </p>
      <p class='page-paragraph'>
        Whenever this token expires, you'll simply have to generate a new one following the same steps.
      </p>


      <div class='flex'>
        <button onClick={() => onPrev()}>Prev step</button>
        <button onClick={() => canGoNext && onNext(token)} disabled={!canGoNext}>Next step</button>
      </div>

      <hr/>
      <h3>Extra resources</h3>
      <ul>
        <li>Client Credentials Grant docs: <TextLink href='https://discord.dev/topics/oauth2#client-credentials-grant'/></li>
      </ul>
    </>
  )
}
