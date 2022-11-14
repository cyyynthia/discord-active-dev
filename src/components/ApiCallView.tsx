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

import type { ComponentType } from 'preact'
import { h } from 'preact'
import { useCallback, useMemo, useState } from 'preact/hooks'

import Loader from '../components/Loader'

import '../styles/api-call.css'

export type RequestProps = {}
export type ResponseProps = { response?: any }

type ApiCallViewProps = {
  isUrlEncoded?: boolean
  token: { type: 'Basic' | 'Bearer', token: string }
  callable: boolean

  // Request data
  method: string
  url: string
  requestData: string
  requestView?: ComponentType<RequestProps>

  // Response data
  responseView: ComponentType<ResponseProps>

  // Control flow
  onError?: () => void
  onResponse?: (res: any) => void
}

export function SecretValue () {
  return (
    <div class='api-call-secret'>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
    </div>
  )
}

const enum State {
  PENDING, LOADING, DONE, ERRORED
}

export default function ApiCallView (props: ApiCallViewProps) {
  const contentType = useMemo(
    () => props.isUrlEncoded ? 'application/x-www-form-urlencoded' : 'application/json',
    [ props.isUrlEncoded ]
  )

  const [ state, setState ] = useState(props.callable ? State.PENDING : State.DONE)
  const [ status, setStatus ] = useState('')
  const [ response, setResponse ] = useState<any>()

  const callApi = useCallback(
    async () => {
      setState(State.LOADING)
      const res = await fetch(props.url, {
        method: props.method,
        headers: {
          authorization: `${props.token.type} ${props.token.token}`,
          'content-type': contentType,
        },
        body: props.requestData,
      })

      const body = await res.json()
      setState(res.ok ? State.DONE : State.ERRORED)
      setStatus(`${res.status} ${res.statusText}`)
      setResponse(body)
      props.onResponse?.(body)
    },
    [ props, contentType, setResponse ]
  )

  return (
    <div class='api-call'>
      <div class='api-call-header'>
        <div class='api-call-data'>{props.method} {props.url}</div>
        {!!status && <div class='api-call-data'>{status}</div>}
      </div>
      <div class='api-call-body'>
        <div class='api-call-panel'>
          <div class='api-call-title'>Request</div>
          <div class='api-call-section'>Headers</div>
          <div class='api-call-data'>Authorization: {props.token.type} <SecretValue/></div>
          <div class='api-call-data'>Content-Type: {contentType}</div>

          <hr/>
          <div class='api-call-section'>Body</div>
          <pre class='api-call-data'>
            {props.requestView ? h(props.requestView, {}) : props.requestData}
          </pre>
        </div>

        {state === State.PENDING && (
          <div class='api-call-button'>
            <button onClick={callApi}>Send the query</button>
          </div>
        )}
        {state === State.LOADING && (
          <div class='api-call-button'>
            <Loader/>
          </div>
        )}
        {state === State.ERRORED && <div class='api-call-panel'>
          <div class='api-call-title'>Error...</div>
          <p class='page-paragraph'>
            It seems not everything went as planned... Did you set the right Client ID and Client Secret?
          </p>
          <div class='api-call-section'>Error response</div>
          <pre class='api-call-data'>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>}
        {state === State.DONE && <div class='api-call-panel'>
          <div class='api-call-title'>Response</div>
          <pre class='api-call-data'>
            {h(props.responseView, { response })}
          </pre>
        </div>}
      </div>
    </div>
  )
}
