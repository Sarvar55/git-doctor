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

const config = new ConfigManager()

export const manuelCommit = async () => {
	const changedFiles = await gitGetModifiedFiles()

	if (changedFiles.length == 0)
		return logger.info('commit için herhangi bir değişiklik yok.')

	const hasEmoji: boolean = !!config.get(APP_CONSTANTS.hasEmoji) || false

	const commitType = await customCliSelect(
		hasEmoji ? commitTypesWithEmoji : commitTypes
	)

	const commitSubject = await getCommitSubject()

	const message = `${commitType}: ${commitSubject.toString()}`

	try {
		const isConfirmedCommit = await isConfirm('Commit mesajını onaylayın?')

		if (!isConfirmedCommit || isCancel(isConfirmedCommit)) {
			return logger.error(' commit mesajı iptal edildi')
		}

		const status = await gitStatus()

		if (!has(status)) {
			return logger.error('commit için herhangi bir değişiklik yok.')
		}

		await gitaddFilesToStagedArea(changedFiles)

		const commitOutput = await gitCommit(message)
		logger.success('✔ commit başarılı.')
		logger.info(commitOutput)
		return true
	} catch (err) {
		logger.error(err)
		process.exit(1)
	}
}
