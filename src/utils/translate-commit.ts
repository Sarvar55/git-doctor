import { outro } from '@clack/prompts'
import axios from 'axios'
import chalk from 'chalk'
import { logger } from './logger'

export const translateCommit = async (commitmessage: string) => {
	const sourceLang = 'tr'
	const targetLang = 'ru'

	try {
		const response = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(commitmessage)}`
		)
		return response.data[0][0][0]
	} catch (error) {
		return logger.error(error)
	}
}
