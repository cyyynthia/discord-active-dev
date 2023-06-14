/*
 * Copyright (c) Cynthia Rey, All rights reserved.
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
import { useState } from 'preact/hooks'

import { TextLink } from '../Link'
import ApiCallView from '../ApiCallView'
import { Request, Response } from '../code/Command'

type Props = {
	token?: string
	credentials?: Credentials
	onNext: (token?: string) => void
	onPrev: () => void
}

export default function CreateCommand ({ token, credentials, onNext, onPrev }: Props) {
	const clientId = credentials?.clientId || '<client_id>'
	const [ canGoNext, setCanGoNext ] = useState(!token)

	return (
		<>
			<h2 class='page-title'>Third step: create a command</h2>
			<p class='page-paragraph'>
				Now we can start doing fun things. Let's start by <b>registering your first command</b>! This example
				will register a global "ping" command to your application.
			</p>
			<p class='page-paragraph'>
				Type <code>1</code> corresponds to a Slash Command. All the available types are documented on Discord's
				docs.
			</p>

			<ApiCallView
				method='POST'
				url={`https://discord.com/api/v10/applications/${clientId}/commands`}
				token={{ type: 'Bearer', token: token || '' }}
				callable={!!token}

				requestData='{"name":"ping","type":1,"description":"Responds with pong!"}'
				requestView={Request}
				responseView={Response}
				onResponse={(res) => setCanGoNext(!!res.id)}
			/>

			<div class='flex'>
				<button onClick={() => onPrev()}>Prev step</button>
				<button onClick={() => canGoNext && onNext()} disabled={!canGoNext}>Next step</button>
			</div>

			<hr/>
			<h3>Extra resources</h3>
			<ul>
				<li>Registering a Command docs: <TextLink href='https://discord.dev/interactions/application-commands#registering-a-command'/></li>
			</ul>
		</>
	)
}
