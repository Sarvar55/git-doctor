import { Command } from 'commander'
import { GitManager } from '../git-manager'
import { APP_CONSTANTS, ConfigManager } from '../config/config'
import { logger } from '../utils/logger'

const gitManager = new GitManager()

const config = ConfigManager.getInstance()

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
		if (options.sourceLang) {
			config.set(APP_CONSTANTS.source_lang, options.sourceLang)
			logger.info(`Source language set to: ${options.sourceLang}`)
		}
		if (options.emoji) {
			config.set(APP_CONSTANTS.has_emoji, options.emoji)
			logger.info(`Emoji set to: ${options.emoji}`)
		}
		if (options.targetLang) {
			config.set(APP_CONSTANTS.target_lang, options.targetLang)
			logger.info(`Target language set to: ${options.targetLang}`)
		}

		if (options.autoTrans) {
			config.set(
				APP_CONSTANTS.translate_auto_to_target_lang,
				options.autoTrans
			)
			logger.info(`Auto translate feature set to: ${options.autoTrans}`)
		}

		if (options.apiKey) {
			config.set(APP_CONSTANTS.api_key, options.apiKey)
			logger.info(`Api key set to: ${options.apiKey}`)
		}
		if (options.config) {
			config.all()
		}
	})

program
	.command('commit')
	.alias('cm')
	.description('Manual commit')
	.action(async () => {
		await gitManager.manualCommit()
	})
