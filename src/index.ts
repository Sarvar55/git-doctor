import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import {
	gitDiffStaged,
	gitGetModifiedFiles,
	gitaddFilesToStagedArea,
} from './utils/git'
import { logger } from './utils/logger'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, true)
config.set(APP_CONSTANTS.targetLang, 'en')

async function main() {
	let stagedFromDiff: string = await gitDiffStaged()
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0) {
		logger.error(`✖ commit için herhangi bir değişiklik yok.`)
		process.exit(1)
	}
	if (stagedFromDiff.trim() == '') {
		logger.warning('buradayım')
		const modifiedFiles = await gitGetModifiedFiles()
		logger.info('modified files' + modifiedFiles)
		await gitaddFilesToStagedArea(modifiedFiles)
		stagedFromDiff = await gitDiffStaged()
		await askToAi(stagedFromDiff)
	}
}

main()
