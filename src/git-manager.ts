import { generateCommitWithAi } from './utils/generate-commit'
import {
	checkIsGitRepository,
	has,
	isConfirm,
	logAsyncMethodResult,
} from './utils/commons'
import {
	checkRemoteUrl,
	gitDiff,
	gitDiffStaged,
	gitGetModifiedFiles,
	gitInit,
	gitStatus,
	gitaddFilesToStagedArea,
} from './utils/git'
import { logger } from './utils/logger'
import { commitWithAi, manuelCommit } from './commands/commit'
import { push } from './commands/push'
import { isCancel } from '@clack/prompts'

export class GitManager {
	async initializeGitRepository() {
		const isGitRepo = checkIsGitRepository()

		if (!isGitRepo) {
			const isConfirmGitInit = await isConfirm(
				'Do you want to create a git repo ?'
			)
			if (isConfirmGitInit && !isCancel(isConfirmGitInit)) {
				await gitInit()
			} else {
				logger.info(
					"If you want to create a git repo, use this command 'git init .'"
				)
				process.exit(1)
			}
		}
	}

	async aiCommit() {
		await this.initializeGitRepository()

		const diff = await this.getDiffFromGit()

		if (has(diff)) {
			logger.info(diff + '')
			const commitMessage = await generateCommitWithAi(diff)
			const isConfirm = await commitWithAi(commitMessage)
			if (isConfirm) {
				await this.handleRemoteOperations()
			}
		} else {
			logger.info('There are no changes for git diff')
		}
	}

	async manualCommit() {
		await this.initializeGitRepository()
		const isConfirm = await manuelCommit()
		if (isConfirm) {
			await this.handleRemoteOperations()
		}
	}

	private async handleRemoteOperations() {
		if (!(await checkRemoteUrl())) {
			logger.error('There is no remote URL in Git repositories.')
			process.exit(1)
		}
		await push()
	}

	private async getDiffFromGit(): Promise<string> {
		let diff = ''
		const status = await gitStatus()
		if (!status.length) {
			logger.info('No changes to commit')
			process.exit(1)
		}

		diff = await this.getDiff()

		if (!has(diff)) {
			await this.getModifiedFilesAndStage()
			diff = await gitDiffStaged()
		}

		return diff
	}

	private async getModifiedFilesAndStage() {
		const modifiedFiles = await logAsyncMethodResult(
			() => gitGetModifiedFiles(),
			'gitGetModifiedFiles'
		)
		await gitaddFilesToStagedArea(modifiedFiles)
		return modifiedFiles
	}

	private async getDiff() {
		const diffFromStagedArea = await logAsyncMethodResult(
			() => gitDiffStaged(),
			'gitDiffStaged'
		)
		return has(diffFromStagedArea) ? diffFromStagedArea : await gitDiff()
	}
}
