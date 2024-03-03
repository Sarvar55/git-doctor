import { APP_CONSTANTS, ConfigManager } from './config/config'
import { generateCommitWithAi } from './utils/generate-commit-with-ai'
import {
	checkIsGitRepository,
	has,
	isConfirm,
	logAsyncMethodResult,
} from './utils/commons'
import {
	gitDiff,
	gitDiffStaged,
	gitGetModifiedFiles,
	gitInit,
	gitStatus,
	gitaddFilesToStagedArea,
} from './utils/git'
import { logger } from './utils/logger'
import { commitWithAi } from './commands/commit'
import { push } from './commands/push'
import { isCancel } from '@clack/prompts'

const config = new ConfigManager()
config.set(APP_CONSTANTS.targetLang, 'ru')

async function main() {
	const isGitRepo = checkIsGitRepository()

	if (!isGitRepo) {
		const isConfirimGitInit = isConfirm('Do you want to create a git repo?')
		if (isConfirimGitInit && isCancel(isConfirimGitInit)) {
			await gitInit()
		} else {
			return logger.info(
				"If you want create git repo use this command 'git init .'"
			)
		}
	}

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
