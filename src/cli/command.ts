import { Command } from 'commander'
import { GitManager } from '../git-manager'
import {
	APP_CONSTANTS,
	APP_CONSTANTS_KEYS,
	ConfigManager,
} from '../config/config'
import { logger } from '../utils/logger'

const gitManager = new GitManager()

const config = ConfigManager.getInstance()

function handleOptions(options: any) {
	Object.keys(options).forEach(key => {
		const value = options[key]
		if (value !== undefined) {
			const configKey = APP_CONSTANTS_KEYS.find(
				k => k === key.toUpperCase().replace(/-/g, '_')
			)
			if (configKey) {
				config.set(configKey, value)
				logger.info(`${key.replace(/-/g, ' ')} set to: ${value}`)
			}
		}
	})
}
export const program = new Command()
	.version('0.0.1', '-v, --vers', 'current version')
	.name('git-doctor')
	.description(
		'GitDoc, a TypeScript-powered CLI tool for streamlined Git workflows.'
	)

program
	.option('-s, --source-lang <string>', 'set source language')
	.option('-t, --target-lang <string>', 'set target language')
	.option('-a, --auto-trans <boolean>', 'enable auto-translate', false)
	.option('-k, --api-key <string>', 'set API key')
	.option('-c, --config', 'retrive all configs')
	.option('-e, --emoji <boolean>', 'set emoji', true)
	.action(options => {
		handleOptions(options)
		if (options.config) config.all()
	})

program
	.command('commit')
	.alias('cm')
	.description('Manual commit')
	.action(async () => {
		await gitManager.manualCommit()
	})
