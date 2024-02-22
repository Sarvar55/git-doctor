import axios from 'axios'

export const translateCommit = async (commitmessage: string) => {
	const sourceLang = 'tr'
	const targetLang = 'ru'

	try {
		const response = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(commitmessage)}`
		)
		return response.data[0][0][0]
	} catch (error) {
		console.error('Çeviri hatası:', error)
	}
}
