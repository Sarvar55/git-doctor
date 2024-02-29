import { APP_CONSTANTS, ConfigManager } from './config/config'
import { generateCommitWithAi } from './utils/generate-commit-with-ai'
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
config.set(APP_CONSTANTS.hasEmoji, false)
config.set(APP_CONSTANTS.targetLang, 'english')

async function main() {
	let diff: string = ''
	const status = await gitStatus()

	if (!has(status)) return logger.info('No changes to commit')

	diff = await getDiff()

	if (!has(diff)) {
		await gitGetModifiedFilesAndTostgaedArea()
		diff = await gitDiffStaged()
	}

	if (has(diff)) {
		logger.info(diff)
		const commitMessage = await generateCommitWithAi(diff)
	} else return logger.info('git diff için her hangi bir değişiklik yok')
}

const gitGetModifiedFilesAndTostgaedArea = async () => {
	const modifiedFiles = await logAsyncMethodResult(
		() => gitGetModifiedFiles(),
		'gitGetModifiedFiles'
	)
	await gitaddFilesToStagedArea(modifiedFiles)
	return modifiedFiles
}

const getDiff = async () => {
	const diffFromStagedArea = await logAsyncMethodResult(
		() => gitDiffStaged(),
		'gitDiffStaged'
	)
	return has(diffFromStagedArea) ? diffFromStagedArea : await gitDiff()
}

main()
