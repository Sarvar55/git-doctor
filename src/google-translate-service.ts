import axios from 'axios'
import { ITranslateService } from './types/types'
import { APP_CONSTANTS, ConfigManager } from './config/config'

export class GoogleTranslateService implements ITranslateService {
	private sourcelang: String
	private targetLang: string
	private message: string

	public constructor(
		sourcelang: string,
		targetLang: string,
		message: string
	) {
		this.sourcelang = sourcelang
		this.targetLang = targetLang
		this.message = message
	}

	async translate(): Promise<string> {
		try {
			const response = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.sourcelang}&tl=${this.targetLang}&dt=t&q=${encodeURI(this.message)}`
			)
			return response.data[0][0][0]
		} catch (error) {
			throw new Error('Translation failed')
		}
	}

	static async build(commitMessage: string): Promise<GoogleTranslateService> {
		const config = ConfigManager.getInstance()
		return new GoogleTranslateService(
			config.get(APP_CONSTANTS.source_lang) as string,
			config.get(APP_CONSTANTS.target_lang) as string,
			commitMessage
		)
	}
}
