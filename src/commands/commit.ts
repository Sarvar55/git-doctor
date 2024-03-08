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

const config = new ConfigManager()

const manuelCommit = async () => {
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length === 0) {
		logger.info('Commit için herhangi bir değişiklik yok.')
		return
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
		commitSubject = await translateCommit(commitSubject?.toString())
	}

	const message = `${commitType}: ${commitSubject?.toString()}`

	try {
		const isConfirmedCommit = await isConfirm('Confirm commit message?')

		if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
			logger.error('Commit mesajı iptal edildi.')
			return
		}

		const status = await gitStatus()

		if (!has(status)) {
			logger.error('Commit için herhangi bir değişiklik yok.')
			return
		}

		await gitaddFilesToStagedArea(changedFiles)

		const commitOutput = await gitCommit(message)
		logger.success('✔ Commit başarılı.')
		logger.info(commitOutput)
		return true
	} catch (err) {
		logger.error(err)
		process.exit(1)
	}
}

const commitWithAi = async (commitMessage: string) => {
	if (!has(commitMessage)) {
		logger.info(commitMessage)
		logger.warning('commit mesajı boş olamaz.')
		process.exit(1)
	}
	const changedFiles = await gitGetModifiedFiles()

	try {
		logger.info(commitMessage)
		const isConfirmedCommit = await isConfirm('Commit mesajını onaylayın?')

		if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
			logger.error(' commit mesajı iptal edildi')
			return false
		}

		await gitaddFilesToStagedArea(changedFiles)

		const commitOutput = await gitCommit(commitMessage)
		logger.success('✔ commit başarılı.')
		logger.info(commitOutput)

		return true
	} catch (error) {
		logger.error(error)
		return false
	}
}

export { commitWithAi, manuelCommit }
