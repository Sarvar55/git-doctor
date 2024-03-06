#!/usr/bin/env node

import { GitManager } from '../git-manager'
import { hasApiKey } from '../utils/commons'
import { logger } from '../utils/logger'
import { program } from './command'

if (process.argv.length == 2) {
	if (hasApiKey()) {
		const gitManager = new GitManager()
		await gitManager.aiCommit()
		process.exit(1)
	} else {
		logger.info(`
    git-doctor or gitd creates a commit message with ai by default, but it will not do this if you do not provide an api_key for this.
    First set apikey then try :)
    `)
		process.exit(1)
	}
}

program.parse()
