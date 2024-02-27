import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import {
	gitDiffStaged,
	gitGetModifiedFiles,
	gitStatus,
	gitaddFilesToStagedArea,
} from './utils/git'
import { logger } from './utils/logger'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, false)
config.set(APP_CONSTANTS.targetLang, 'ru')

async function main() {
	let stagedFromDiff: string = await gitDiffStaged()
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0)
		return logger.error(`✖ commit için herhangi bir değişiklik yok.`)

	if (!stagedFromDiff.trim()) {
		logger.info('ilk if e girdim')
		const status = await gitStatus()
		if (!status.trim()) {
			return logger.info('commit için herhangi bir değişiklik yok.')
		} else if (changedFiles.length > 0) {
			await gitaddFilesToStagedArea(changedFiles)
			stagedFromDiff = await gitDiffStaged()
			await askToAi(stagedFromDiff)
		}
	} else {
		await askToAi(stagedFromDiff)
	}
}
main()
