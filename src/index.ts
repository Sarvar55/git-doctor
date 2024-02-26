import chalk from 'chalk'
import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import { gitDiff, gitGetModifiedFiles } from './utils/git'
import { outro } from '@clack/prompts'
import { logger } from './utils/logger'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, true)
// config.set(APP_CONSTANTS.translate_auto_to_target_lang, true)
// config.set(APP_CONSTANTS.targetLang, 'CN')

async function main() {
	const diff: string | null = await gitDiff()
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0 && diff == null) {
		logger.error(`✖ commit için herhangi bir değişiklik yok.`)
		process.exit(1)
	}
	if (diff != null) {
		await askToAi(diff)
	}
}

main()
