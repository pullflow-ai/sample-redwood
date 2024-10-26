import { build, defaultBuildOptions } from '@redwoodjs/framework-tools'

const jsBanner = `\
#!/usr/bin/env node

const require = (await import("node:module")).createRequire(import.meta.url);
const __filename = (await import("node:url")).fileURLToPath(import.meta.url);
const __dirname = (await import("node:path")).dirname(__filename);
`

async function runBuild() {
  await build({
    buildOptions: {
      ...defaultBuildOptions,
      banner: {
        js: jsBanner,
      },
      bundle: true,
      entryPoints: ['src/create-redwood-app.js'],
      format: 'esm',
      minify: true,
    },
  })
}

runBuild().catch((error) => {
  console.error(error)
  process.exit(1)
})
