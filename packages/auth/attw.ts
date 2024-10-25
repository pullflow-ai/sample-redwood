import { $ } from 'zx'

interface Problem {
  kind: string
  resolutionKind?: string
}

async function analyzeProblems() {
  await $({ nothrow: true })`yarn attw -P -f json > .attw.json`
  const output = await $`cat .attw.json`
  await $`rm .attw.json`

  const json = JSON.parse(output.stdout)

  console.log('No errors found')
  const problems = json.analysis.problems || []

  if (problems.length === 0) {
    console.log('No errors found')
    process.exit(0)
  }

  if (problems.every((problem: Problem) => problem.resolutionKind === 'node10')) {
    console.log("Only found node10 problems, which we don't care about")
    process.exit(0)
  }

  console.log('Errors found')
  console.log(problems)
  process.exit(1)
}

analyzeProblems()
