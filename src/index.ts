import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import { has, logAsyncMethodResult } from './utils/commons'
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
	let diff: string = ''
	const status = await gitStatus()

	if (!has(status)) {
		return logger.info('commit için her hangibir değişiklik yok')
	}

	const diffFromStagedArea = await logAsyncMethodResult(
		() => gitDiffStaged(),
		'gitDiffStaged'
	)

	if (!has(diffFromStagedArea)) {
		const modifiedFiles = await logAsyncMethodResult(
			() => gitGetModifiedFiles(),
			'gitGetModifiedFiles'
		)

		await gitaddFilesToStagedArea(modifiedFiles)
		logger.success('d')

		const diffFromStagedArea = await gitDiffStaged()

		if (has(diffFromStagedArea)) {
			logger.info(diffFromStagedArea)
			diff = diffFromStagedArea
		} else {
			diff = await gitDiff()
		}
	} else if (has(diffFromStagedArea)) {
		diff = diffFromStagedArea
	} else {
		logger.info(diffFromStagedArea)
		diff = await gitDiff()
	}
	if (has(diff)) {
		logger.info(diff)
		askToAi(diff)
	}
}
main()
