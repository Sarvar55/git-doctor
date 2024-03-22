import { logger } from './logger'
import { ITranslateService } from '../types/types'

export const translateCommit = async (translateService: ITranslateService) => {
	try {
		return await translateService.translate()
	} catch (error) {
		logger.error(error)
		throw error
	}
}
