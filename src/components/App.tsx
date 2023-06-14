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

import { h } from 'preact'
import { useCallback, useState } from 'preact/hooks'

import Layout from './Layout'

import GettingStarted from './views/GettingStarted'
import CreateApplication from './views/CreateApplication'
import Authenticate from './views/Authenticate'
import CreateCommand from './views/CreateCommand'
import SetInteraction from './views/SetInteraction'
import Invite from './views/Invite'
import Conclusion from './views/Conclusion'

export type Credentials = { clientId: string, clientSecret: string }

export default function App () {
	const [ step, setStep ] = useState(0)

	// State
	const [ credentials, setCredentials ] = useState<Credentials | undefined>()
	const [ token, setToken ] = useState<string | undefined>()

	// Callbacks
	const onCreateApp = useCallback(
		(clientId?: string, clientSecret?: string) => {
			if (clientId && clientSecret) setCredentials({ clientId, clientSecret })
			setStep(2)
		},
		[ setCredentials, setStep ]
	)
	const onAuthenticate = useCallback(
		(token?: string) => {
			setToken(token)
			setStep(3)
		},
		[ setToken, setStep ]
	)

	return (
		<Layout>
			{step === 0 && <GettingStarted onNext={() => setStep(1)}/>}
			{step === 1 && <CreateApplication onNext={onCreateApp}/>}
			{step === 2 && <Authenticate credentials={credentials} onNext={onAuthenticate} onPrev={() => setStep(1)}/>}
			{step === 3 && <CreateCommand credentials={credentials} token={token} onNext={() => setStep(4)} onPrev={() => setStep(2)}/>}
			{step === 4 && <SetInteraction token={token} onNext={() => setStep(5)} onPrev={() => setStep(3)}/>}
			{step === 5 && <Invite credentials={credentials} onNext={() => setStep(6)} onPrev={() => setStep(4)}/>}
			{step === 6 && <Conclusion/>}
		</Layout>
	)
}
