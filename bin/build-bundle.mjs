#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import chalk from 'chalk'

import esbuild from 'esbuild'
import babel from 'esbuild-plugin-babel'

const petimg_ROOT = new URL('../', import.meta.url)
const PACKAGES_ROOT = new URL('./packages/', petimg_ROOT)

function buildBundle (srcFile, bundleFile, { minify = true, standalone = '', plugins, target, format } = {}) {
  return esbuild.build({
    bundle: true,
    sourcemap: true,
    entryPoints: [srcFile],
    outfile: bundleFile,
    platform: 'browser',
    minify,
    keepNames: true,
    plugins,
    target,
    format,
  }).then(() => {
    if (minify) {
      console.info(chalk.green(`✓ Built Minified Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    } else {
      console.info(chalk.green(`✓ Built Bundle [${standalone}]:`), chalk.magenta(bundleFile))
    }
  })
}

await fs.mkdir(new URL('./@petimg/locales/dist', PACKAGES_ROOT), { recursive: true })
await fs.mkdir(new URL('./petimg/dist', PACKAGES_ROOT), { recursive: true })

const methods = [
  buildBundle(
    './packages/petimg/bundle.mjs',
    './packages/petimg/dist/petimg.min.js',
    { standalone: 'petimg', format: 'iife' },
  ),
  buildBundle(
    './packages/petimg/bundle-legacy.mjs',
    './packages/petimg/dist/petimg.legacy.min.js',
    {
      standalone: 'petimg (with polyfills)',
      target: 'es5',
      plugins:[babel({
        config:{
          compact: false,
          highlightCode: false,
          inputSourceMap: true,

          browserslistEnv: 'legacy',
          presets: [['@babel/preset-env',  {
            loose: false,
            targets: { ie:11 },
            useBuiltIns: 'entry',
            corejs: { version: '3.24', proposals: true },
          }]],
        },
      })],
    },
  ),
  buildBundle(
    './packages/petimg/index.mjs',
    './packages/petimg/dist/petimg.min.mjs',
    { standalone: 'petimg (ESM)', format: 'esm' },
  ),
]

const localesModules = await fs.opendir(new URL('./@petimg/locales/src/', PACKAGES_ROOT))
for await (const dirent of localesModules) {
  if (!dirent.isDirectory() && dirent.name.endsWith('.js')) {
    const localeName = path.basename(dirent.name, '.js')
    methods.push(
      buildBundle(
        `./packages/@petimg/locales/src/${localeName}.js`,
        `./packages/@petimg/locales/dist/${localeName}.min.js`,
        { minify: true },
      ),
    )
  }
}

// Add BUNDLE-README.MD
methods.push(
  fs.copyFile(
    new URL('./BUNDLE-README.md', petimg_ROOT),
    new URL('./petimg/dist/README.md', PACKAGES_ROOT),
  ),
)

await Promise.all(methods).then(() => {
  console.info(chalk.yellow('✓ JS bundles 🎉'))
}, (err) => {
  console.error(chalk.red('✗ Error:'), chalk.red(err.message))
})
