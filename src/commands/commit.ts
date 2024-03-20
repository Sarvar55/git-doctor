import { isCancel } from 'axios'
import { APP_CONSTANTS, ConfigManager } from '../config/config'
import {
	customCliSelect,
	getCommitSubject,
	has,
	isConfirm,
} from '../utils/commons'
import { commitTypes, commitTypesWithEmoji } from '../utils/constants'
import {
	gitCommit,
	gitGetModifiedFiles,
	gitStatus,
	gitaddFilesToStagedArea,
} from '../utils/git'
import { logger } from '../utils/logger'
import { translateCommit } from '../utils/translate-commit'

const config = ConfigManager.getInstance()
const manuelCommit = async () => {
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0) {
		logger.info('There is no change for Commit.')
		return false
	}

	const hasEmoji = config.get(APP_CONSTANTS.hasEmoji) || false

	const commitType = await customCliSelect(
		hasEmoji ? commitTypesWithEmoji : commitTypes
	)

	let commitSubject = await getCommitSubject()

	const isAutoTranslate = config.get(
		APP_CONSTANTS.translate_auto_to_target_lang
	)

	if (isAutoTranslate) {
		commitSubject = (await translateCommit(
			commitSubject?.toString()
		)) as string
	}

	const message = `${commitType}: ${commitSubject.toString()}`

	logger.info('Commit Message: ' + message)

	try {
		const isConfirmedCommit = await isConfirm('Confirm commit message?')

		if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
			logger.error('Commit message has been cancelled.')
			return false
		}

		const status = await gitStatus()

		if (!has(status)) {
			logger.error('There is no change for Commit.')
			return false
		}

		await gitaddFilesToStagedArea(changedFiles)

		const commitOutput = await gitCommit(message)
		logger.success('✔ Commit successful.')
		logger.info(commitOutput)
		return true
	} catch (err) {
		logger.error(err)
		return false
	}
}

const commitWithAi = async (commitMessage: string) => {
	if (!has(commitMessage)) {
		logger.info(commitMessage)
		logger.warning('commit message cannot be empty.')
		process.exit(1)
	}
	const changedFiles = await gitGetModifiedFiles()

	try {
		logger.info(commitMessage)
		const isConfirmedCommit = await isConfirm('Confirm commit message?')

		if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
			logger.error('Commit message canceled')
			return false
		}

		await gitaddFilesToStagedArea(changedFiles)

		const commitOutput = await gitCommit(commitMessage)
		logger.success('✔ commit successful.')
		logger.info(commitOutput)

		return true
	} catch (error) {
		logger.error(error)
		return false
	}
}

export { commitWithAi, manuelCommit }
