import { Command } from 'commander'
import { GitManager } from '../git-manager'
import { ConfigManager } from '../config/config'
import { logger } from '../utils/logger'
import { OPTION_ACTIONS } from '../types/options'

const gitManager = new GitManager()

const config = ConfigManager.getInstance()

export const program = new Command()
	.version('0.0.1', '-v, --vers', 'current version')
	.name('git-doctor')
	.description(
		'GitDoc, a TypeScript-powered CLI tool for streamlined Git workflows.'
	)

program
	.option('-s, --source-lang <string>', OPTION_ACTIONS.sourceLang.description)
	.option('-t, --target-lang <string>', OPTION_ACTIONS.targetLang.description)
	.option(
		'-a, --auto-trans <boolean>',
		OPTION_ACTIONS.autoTrans.description,
		false
	)
	.option('-k, --api-key <string>', OPTION_ACTIONS.apiKey.description)
	.option('-c, --config', OPTION_ACTIONS.config.description)
	.option('-e, --emoji <boolean>', OPTION_ACTIONS.emoji.description, true)
	.action(options => {
		for (const key in options) {
			if (Object.prototype.hasOwnProperty.call(options, key)) {
				const optionValue = options[key]
				const optionAction =
					OPTION_ACTIONS[key as keyof typeof OPTION_ACTIONS]
				if (optionValue) {
					if ('configKey' in optionAction && optionAction.configKey) {
						config.set(optionAction.configKey, optionValue)
						logger.info(`${optionAction.logMessage} ${optionValue}`)
					} else if (
						'action' in optionAction &&
						optionAction.action
					) {
						optionAction.action()
					}
				}
			}
		}
	})

program
	.command('commit')
	.alias('cm')
	.description('Manual commit')
	.action(async () => {
		await gitManager.manualCommit()
	})
