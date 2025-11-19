#!/usr/bin/env node
import { execSync } from 'node:child_process'
import { rmSync } from 'node:fs'

const validSteps = ['1', '2', '3', '3.5']

const args = process.argv.slice(2)
const step = args[0]

if (!validSteps.includes(step)) {
  console.error(`Invalid step: ${step}`)
  console.error(`Valid steps: ${validSteps.join(', ')}`)
  process.exit(1)
}

try {
  rmSync('.data/wordle.db')
} catch { /* empty */ }

execSync('git reset --hard')

execSync(`git checkout ${step}-step`)
