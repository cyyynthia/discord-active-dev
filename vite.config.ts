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

import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { createHash } from 'crypto'
import { readFileSync } from 'fs'
import { join } from 'path'
import { rename } from 'fs/promises'
import preact from '@preact/preset-vite'
import magicalSvg from 'vite-plugin-magical-svg'
import licensePlugin from 'rollup-plugin-license'

let finalLicensePath = ''
const baseLicensePath = join('dist', 'assets', 'third-party-licenses.txt')

// rollup-plugin-license doesn't do a great job w/ Vite :<
function finishLicense (): Plugin {
	let skip = false
	return {
		name: 'finish-license',
		configResolved (cfg) {
			skip = !cfg.isProduction
		},
		generateBundle (_, bundle) {
			if (process.argv.includes('--ssr')) return
			const header = [
				'Copyright (c) Cynthia Rey, All Rights Reserved.',
				'Licensed under the BSD-3-Clause license. Contains third-party software licensed under different terms.',
				`For third-party software licenses included in this build, please see /${finalLicensePath}`
			]

			for (const item of Object.values(bundle)) {
				if (item.type === 'chunk') {
					item.code = `/*!\n * ${header.join('\n * ')}\n */\n${item.code}`
					continue
				}

				if (item.fileName.endsWith('.svg')) {
					item.source = `<!--\n  ${header.join('\n  ')}\n-->\n${item.source}`
					continue
				}

				if (item.fileName.endsWith('.css')) {
					item.source = `/*!\n * ${header.join('\n * ')}\n */\n${item.source}`
					continue
				}
			}
		},
		closeBundle: async () => {
			if (!skip && !process.argv.includes('--ssr')) {
				await rename(baseLicensePath, join(__dirname, 'dist', finalLicensePath)).catch(() => void 0)
			}
		},
	}
}

export default defineConfig({
	build: {
		assetsInlineLimit: 0,
		polyfillModulePreload: false
	},
	plugins: [
		preact(),
		// @ts-expect-error
		magicalSvg.default({ target: 'preact' }),
		licensePlugin({
			thirdParty: {
				includePrivate: false,
				allow: {
					test: '(BSD-3-Clause OR MIT OR CC0-1.0)',
					failOnUnlicensed: true,
				},
				output: {
					file: join(__dirname, baseLicensePath),
					template: (deps) => {
						let str = 'Licenses for open-source software used in this website are reproduced below.\n=========================\n\n'
						for (const dep of deps) {
							if (!dep.licenseText) continue
							const home = dep.homepage || (dep.repository as any).url || dep.repository
							str += `${dep.name}${home ? ` (${home})` : ''}\nThis software is licensed under the following terms:\n\n${dep.licenseText.trim()}\n\n----------\n\n`
						}

						// Lexend
						const lexendLicense = readFileSync(join(__dirname, 'src', 'fonts', 'lexend-license.txt'), 'utf8')
						str += `Lexend font face (https://www.lexend.com/)\nThis software is licensed under the following terms:\n\n${lexendLicense.trim()}\n\n----------\n\n`

						// JB Mono
						const jetbrainsMonoLicense = readFileSync(join(__dirname, 'src', 'fonts', 'jetbrains-mono-license.txt'), 'utf8')
						str += `JetBrains Mono font face (https://www.jetbrains.com/lp/mono/)\nThis software is licensed under the following terms:\n\n${jetbrainsMonoLicense.trim()}\n\n----------\n\n`

						// Create hash
						str += 'Meow~'
						const hash = createHash('sha256').update(str).digest('hex').slice(0, 8)
						finalLicensePath = join('assets', `third-party-licenses.${hash}.txt`)

						return str
					},
				},
			},
		}),
		finishLicense(),
	]
})
