#!/usr/bin/env node

import { GitManager } from '../git-manager'
import { program } from './command'

if (process.argv.length == 2) {
	const gitManager = new GitManager()
	await gitManager.aiCommit()
}

program.parse()
