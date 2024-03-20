import axios from 'axios'
import { ITranslateService } from './types/types'

export class TranslateService implements ITranslateService {
	private sourcelang: String
	private targetLang: string

	public constructor(sourcelang: string, targetLang: string) {
		this.sourcelang = sourcelang
		this.targetLang = targetLang
	}

	async translate(commitMessage: string): Promise<string> {
		try {
			const response = await axios.get(
				`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${this.sourcelang}&tl=${this.targetLang}&dt=t&q=${encodeURI(commitMessage)}`
			)
			return response.data[0][0][0]
		} catch (error) {
			throw new Error('Translation failed')
		}
	}
}
