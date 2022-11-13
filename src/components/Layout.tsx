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

import type { ComponentChildren } from 'preact'
import { h, Fragment } from 'preact'
import { useMemo } from 'preact/hooks'

import { Link } from './Link'
import Badge from '../assets/badge.svg'

import '../styles/layout.css'

type Props = { children: ComponentChildren }

const APP_NAME = [
  'starter pack',
  '"learning tool"',
  'for starters',
  '"farm utility"',
  'thing',
]

const DISC_QUOTES = [
  {
    q: 'I want to stress that people who are upset that people can earn this badge should take a step back and re-evaluate why they want to gatekeep.',
    a: 'Ian aka Desch'
  },
  {
    q: 'I would highly recommend not running an exe file to get a badge.',
    a: 'Ian aka Desch'
  },
  {
    q: 'For the record - getting the badge this way is valid and should be encouraged!',
    a: 'Ian aka Desch'
  },
  {
    q: 'We should not judge people for how they start bot development, we should instead welcome them into our community',
    a: 'Ian aka Desch'
  },
  {
    q: '"From what I know a lot of people have been copying other people\'s bots and receiving the badge" - we support and encourage this',
    a: 'Ian aka Desch'
  },
  {
    q: 'it\'s not abuse',
    a: 'DV8FromTheWorld'
  }
]

export default function App ({ children }: Props) {
  const appNameId = useMemo(() => Math.floor(Math.random() * APP_NAME.length), [])
  const quoteId = useMemo(() => Math.floor(Math.random() * DISC_QUOTES.length), [])

  return (
    <>
      <header class='header'>
        <h1 class='header-title'>
          <Badge class='header-title-badge'/>
          <span class='header-title-text'>Discord Active Developer {APP_NAME[appNameId]}</span>
        </h1>
      </header>
      <main class='main'>{children}</main>
      <footer class='footer'>
        <div class='footer-links'>
          <span>meow</span>
          <div class='separator'/>
          <span><Link href='https://github.com/cyyynthia/discord-active-dev'>sauce code</Link></span>
          <div class='separator'/>
          <span><Link href='https://ko-fi.com/cyyynthia'>feed me</Link></span>
          <div class='separator'/>
          <span>meow</span>
        </div>
        <div class='footer-quote'>
          <div class='footer-quote-text'>{DISC_QUOTES[quoteId].q}</div>
          <span>—</span>
          <div class='footer-quote-credit'>{DISC_QUOTES[quoteId].a}</div>
        </div>
        <div class='footer-copyreich'>
          Copyright &copy; Cynthia Rey. Licensed under the BSD-3-Clause license.
          Quotes from the Discord Developers server.
        </div>
      </footer>
    </>
  )
}
