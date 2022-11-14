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
import { Link, TextLink } from '../Link'

export default function Conclusion () {
  return (
    <>
      <h2 class='page-title'>The end! 🎉</h2>
      <p class='page-paragraph'>
        This marks the end of your journey on running the first command on your own. You should be able to claim your
        <i>Active Developer</i> badge within the next 24 hours here: <TextLink href='https://discord.com/developers/active-developer'/>.
      </p>
      <p class='page-paragraph'>
        I hope you enjoyed this tutorial and learned something. Maybe the next milestone is to build the part that
        responds to the command yourself! Discord themselves put together guides to help you get started on that.
      </p>
      <p class='page-paragraph'>
        Fun fact: the server that responded to your /ping command is less than 100 lines of JavaScript code! If you
        ignore the parts required for use as part of this "tutorial", you can get away with less than 50 lines of code!
        Don't believe me? Try it ;)
      </p>

      <hr/>
      <p class='page-paragraph'>
        Here are a few resources that'll help you go further in your adventure of creating Discord applications:
      </p>
      <ul>
        <li>Discord Developers server: <TextLink href='https://discord.gg/discord-developers'/></li>
        <li><Link href='https://discord.com/developers/docs/tutorials/hosting-on-cloudflare-workers'>Discord's Cloudflare Workers tutorial</Link></li>
        <li><Link href='https://discord.dev'>Discord docs</Link> as a whole</li>
      </ul>

      <hr/>
      <p class='page-paragraph'>
        If you want to support me, here are a few things you can do:
      </p>
      <ul>
        <li>Share this around</li>
        <li>Leave a star on the <Link href=''>GitHub repository</Link></li>
        <li><Link href=''>Donate on ko-fi</Link>, if you're extra generous!</li>
      </ul>
    </>
  )
}
