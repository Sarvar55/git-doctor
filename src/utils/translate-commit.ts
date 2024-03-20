import axios from 'axios'
import { logger } from './logger'
import { APP_CONSTANTS, ConfigManager } from '../config/config'
const config = new ConfigManager()

export const translateCommit = async (commitmessage: string) => {
	const sourceLang = config.get(APP_CONSTANTS.source_lang) ?? 'tr'
	const targetLang = config.get(APP_CONSTANTS.targetLang) ?? 'en'

	try {
		const response = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(commitmessage)}`
		)
		const data = response.data[0][0][0]
		return data
	} catch (error) {
		return logger.error(error)
	}
}
