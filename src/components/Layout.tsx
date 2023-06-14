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
		a: 'Ian'
	},
	{
		q: 'I would highly recommend not running an exe file to get a badge.',
		a: 'Ian'
	},
	{
		q: 'For the record - getting the badge this way is valid and should be encouraged!',
		a: 'Ian'
	},
	{
		q: 'We should not judge people for how they start bot development, we should instead welcome them into our community',
		a: 'Ian'
	},
	{
		q: 'Ghost.: "From what I know a lot of people have been copying other people\'s bots and receiving the badge" - we support and encourage this',
		a: 'Ian'
	},
	{
		q: 'it\'s not abuse',
		a: 'DV8FromTheWorld'
	},
	{
		q: 'bad news everyone, I have decided my cat iago is cuter than all of you',
		a: 'Ian'
	},
	{
		q: 'Yeah I\'m a real person',
		a: 'Ian'
	},
	{
		q: 'I\'m a badge',
		a: 'Ian'
	},
	{
		q: 'It\'s scary work, gotta touch some jobs / sql / data pipelines. I just wanna write CSS 😭',
		a: 'Ian'
	},
	{
		q: 'cry: "im trying to make a slash command in assembly its really difficult can u help" - only if it\'s MIPS',
		a: 'Ian'
	},
	{
		q: 'ian 1 is goated - is that what the kids say',
		a: 'Ian 2'
	},
	{
		q: 'not even dyno can strike me down',
		a: 'Ian'
	},
	{
		q: '#active-dev-badge-faq',
		a: 'DDevs moderators'
	},
	{
		q: 'please stay on topic',
		a: 'DDevs moderators'
	},
	{
		q: 'Badges are unimportant and should not be a focus',
		a: 'Mozzy'
	},
	{
		q: 'You are not eligible for the Active Developer Badge',
		a: 'Discord Developer Portal'
	},
	{
		q: 'I bet discord are regretting making this badge. 95% of the users who have the badge aren\'t devs and they aren\'t even close to be one. I bet discord will discontinue this badge very soon',
		a: 'Omer'
	},
	{
		q: 'where is my badge',
		a: 'impatient people'
	},
	{
		q: 'Beaver fact: Beavers secrete castoreum, which is used to bring out flavor in vanilla ice cream and add fruity notes to perfumes',
		a: 'Ian'
	},
	{
		q: 'Hippo fact:  Hippos can sleep underwater, because they have a natural reflex that lets them come up for air, take a breath, and sink back down without waking up',
		a: 'heymoo'
	},
	{
		q: 'Rabbit fact: Bunnies make noises, but they are very quiet. Content rabbits purrrrr by gently grinding their teeth together, and excited rabbits oink',
		a: 'shaydew'
	},
	{
		q: 'delete system32',
		a: '"funny" people'
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
					<span class='footer-quote-text'>{DISC_QUOTES[quoteId].q}</span>
					<span> — </span>
					<span class='footer-quote-credit'>{DISC_QUOTES[quoteId].a}</span>
				</div>
				<div class='footer-legal'>
					<div>
						Copyright &copy; Cynthia Rey. Licensed under the BSD-3-Clause license.
						Quotes from the <Link href='https://discord.gg/discord-developers'>Discord Developers</Link> server.
					</div>
					<div>
						The quotes are provided in respect of the applicable intellectual property laws in France.
						(<Link href='https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000037388886'>CPI, art. L. 122-5</Link>)
					</div>
				</div>
			</footer>
		</>
	)
}
