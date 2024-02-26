import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import {
	gitDiff,
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
		return logger.error(`✖ commit için herhangi bir değişiklik yok.`)
	}
	if (stagedFromDiff.trim() == '') {
		const modifiedFiles = await gitGetModifiedFiles()
		logger.info('modified files ' + modifiedFiles)
		await gitaddFilesToStagedArea(modifiedFiles)
		stagedFromDiff = await gitDiff()
		logger.info('stagedfrom' + stagedFromDiff)
		if (stagedFromDiff.trim() == '') {
			return logger.error(
				'Diff string cannot be empty or only contain whitespace.'
			)
		}
		await askToAi(stagedFromDiff)
	}
}
main()
