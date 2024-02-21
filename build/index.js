var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
function translateText() {
    return __awaiter(this, void 0, void 0, function* () {
        const sourceText = 'Merhaba Dünya!'; // Burada gerçekleştirmek istediğiniz çeviri metni
        const sourceLang = 'tr';
        const targetLang = 'ru';
        try {
            const response = yield axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(sourceText)}`);
            const translatedText = response.data[0][0][0];
            console.log('Çevrilen Metin:', translatedText);
            // İstersen başka bir işlem yapabilirsin, örneğin çevrilen metni bir dosyaya yazabilirsin.
        }
        catch (error) {
            console.error('Çeviri hatası:', error);
        }
    });
}
translateText();
