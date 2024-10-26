import { $ } from 'zx'

interface Problem {
  kind: string
  resolutionKind?: string
}

await $({ nothrow: true })`yarn attw -P -f json > .attw.json`
const output = await $`cat .attw.json`
await $`rm
    (problem: Problem) => problem.resolutionKind === 'node10',
  )
) {
  console.log("Only found node10 problems, which we don't care about")
  process.exit(0)
}

console.log('Errors found')
console.log(json.analysis.problems)
process.exit(1)
