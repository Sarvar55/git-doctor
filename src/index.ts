import axios from 'axios'
async function translateText() {
	const sourceText = 'Merhaba Dünya!' // Burada gerçekleştirmek istediğiniz çeviri metni
	const sourceLang = 'tr'
	const targetLang = 'ru'

	try {
		const response = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(sourceText)}`
		)

		const translatedText = response.data[0][0][0]
		console.log('Çevrilen Metin:', translatedText)
		// İstersen başka bir işlem yapabilirsin, örneğin çevrilen metni bir dosyaya yazabilirsin.
	} catch (error) {
		console.error('Çeviri hatası:', error)
	}
}
translateText()
