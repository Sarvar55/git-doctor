import { isCancel } from 'axios'
import { APP_CONSTANTS, ConfigManager } from '../config/config'
import {
	customCliSelect,
	getCommitSubject,
	has,
	isConfirm,
} from '../utils/commons'
import {
	gitCommit,
	gitGetModifiedFiles,
	gitStatus,
	gitaddFilesToStagedArea,
} from '../utils/git'
import { logger } from '../utils/logger'
import { translateCommit } from '../utils/translate-commit'
import { GoogleTranslateService } from '../google-translate-service'
import { commitTypes, commitTypesWithEmoji } from '../types/options'

const config = ConfigManager.getInstance()
const manuelCommit = async () => {
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0) {
		logger.info('There is no change for Commit.')
		return false
	}

	const hasEmoji = config.get(APP_CONSTANTS.has_emoji) || false

	const commitType = await customCliSelect(
		hasEmoji ? commitTypesWithEmoji : commitTypes
	)

	let commitSubject = await getCommitSubject()

	const isAutoTranslate = config.get(
		APP_CONSTANTS.translate_auto_to_target_lang
	)

	if (isAutoTranslate) {
		const googleTranslateService = await GoogleTranslateService.build(
			commitSubject?.toString()
		)
		commitSubject = (await translateCommit(
			googleTranslateService
		)) as string
	}

	const message = `${commitType}: ${commitSubject?.toString()}`

	logger.info('Commit Message: ' + message)

	try {
		const isConfirmedCommit = await isConfirm('Confirm commit message ?')

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
