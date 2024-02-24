var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { APP_CONSTANTS, ConfigManager } from './config/config.js';
import { askToAi } from './utils/ask-to-ai.js';
import { gitDiff } from './utils/git.js';
const config = new ConfigManager();
config.set(APP_CONSTANTS.hasEmoji, true);
// config.set(APP_CONSTANTS.translate_auto_to_target_lang, true)
// config.set(APP_CONSTANTS.targetLang, 'en')
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const message = yield gitDiff();
        yield askToAi(message);
    });
}
main();
