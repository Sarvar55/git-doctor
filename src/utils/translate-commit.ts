import { logger } from './logger'
import { APP_CONSTANTS, ConfigManager } from '../config/config'
import { ITranslateService } from '../types/types'
import { TranslateService } from '../translate-service'
const config = ConfigManager.getInstance()

const translateService: ITranslateService = new TranslateService(
	config.get(APP_CONSTANTS.source_lang) as string,
	config.get(APP_CONSTANTS.targetLang) as string
)

export const translateCommit = async (commitmessage: string) => {
	try {
		return translateService.translate(commitmessage)
	} catch (error) {
		return logger.error(error)
	}
}
