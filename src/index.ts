import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import { gitDiff, gitDiffStaged, gitGetModifiedFiles } from './utils/git'
import { logger } from './utils/logger'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, true)
config.set(APP_CONSTANTS.targetLang, 'ru')

async function main() {
	const stagedFromDiff: string = await gitDiffStaged()
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0) {
		logger.error(`✖ commit için herhangi bir değişiklik yok.`)
		process.exit(1)
	}
	if (stagedFromDiff.trim() == '') {
		const diff: string = await gitDiff()
		if (diff.trim() == '') {
			logger.info('git diff için bir değişiklik yok')
			process.exit(1)
		} else {
			await askToAi(diff)
			logger.success('askToAi methodu çalıştı')
		}
	}
}

main()
