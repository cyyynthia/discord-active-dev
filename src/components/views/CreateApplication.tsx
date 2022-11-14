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
import { useRef } from 'preact/hooks'

import Box from '../Box'
import Field from '../Field'
import { TextLink } from '../Link'

type Props = { onNext: (clientId?: string, clientSecret?: string) => void }

export default function CreateApplication ({ onNext }: Props) {
  const idRef = useRef<HTMLInputElement>(null)
  const secretRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <h2 class='page-title'>First step: the application</h2>
      <p class='page-paragraph'>
        In order to interact with the Discord API, you first need to <b>register an application</b>. If you don't
        already have one, go to <TextLink href='https://discord.com/developers/applications'/>, and hit
        "New Application".
      </p>
      <p class='page-paragraph'>
        You will need to grab the "Client ID", and the "Client Secret". These two tokens will be used to authenticate
        to the Discord API and act on behalf of your application.
      </p>

      <p class='page-paragraph'>
        You can input these two elements in the boxes below, if you don't feel like sending some API commands by
        yourself to Discord and want this app to do it for you. This step is optional and if you wish to do it yourself,
        you can skip to the next step.
      </p>
      <Box type='warning'>
        Be careful where you input your credentials! You should consider the "Client Secret" as a password and protect
        it as much as the password to your Discord account. The credentials you'll enter here will stay safe in your
        web browser.
      </Box>
      <div class='flex-lg'>
        <Field inputRef={idRef} label='Client ID'/>
        <Field inputRef={secretRef} label='Client Secret' password/>
      </div>
      <button onClick={() => onNext(idRef.current?.value, secretRef.current?.value)}>Next step</button>
    </>
  )
}
