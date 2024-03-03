import { APP_CONSTANTS, ConfigManager } from './config/config'
import { generateCommitWithAi } from './utils/generate-commit-with-ai'
import {
	checkIsGitRepository,
	has,
	logAsyncMethodResult,
} from './utils/commons'
import {
	gitDiff,
	gitDiffStaged,
	gitGetModifiedFiles,
	gitStatus,
	gitaddFilesToStagedArea,
} from './utils/git'
import { logger } from './utils/logger'
import { commitWithAi } from './commands/commit'
import { push } from './commands/push'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, false)
config.set(APP_CONSTANTS.targetLang, 'es')

async function main() {
	const isGitRepo = checkIsGitRepository()

	if (!isGitRepo) return logger.error('This is not a git repository 😔')

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
		const isCommit = await commitWithAi(commitMessage)
		if (isCommit) {
			await push()
		}
	} else return logger.info('There are no changes for git diff')
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
