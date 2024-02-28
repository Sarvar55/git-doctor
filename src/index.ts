import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import {
	gitDiff,
	gitDiffStaged,
	gitGetModifiedFiles,
	gitStatus,
	gitaddFilesToStagedArea,
} from './utils/git'
import { logger } from './utils/logger'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, true)

async function main() {
	let diff: string | null = null
	const status = await gitStatus()
	if (!status.trim()) {
		return logger.info('commit için her hangibir değişiklik yok')
	}
	const diffFromStagedArea = await gitDiffStaged()
	if (!diffFromStagedArea.trim()) {
		const modifiedFiles = await gitGetModifiedFiles()

		logger.info(JSON.stringify(modifiedFiles))
		await gitaddFilesToStagedArea(modifiedFiles)

		const diffFromStagedArea = await gitDiffStaged()

		if (!diffFromStagedArea.trim()) {
			diff = diffFromStagedArea
		} else {
			diff = await gitDiff()
		}
	} else {
		diff = diffFromStagedArea
	}
	if (diff != null) {
		askToAi(diff)
	}
}
main()
