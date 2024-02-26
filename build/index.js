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
import { gitDiff, gitDiffStaged, gitGetModifiedFiles } from './utils/git.js';
import { logger } from './utils/logger.js';
const config = new ConfigManager();
config.set(APP_CONSTANTS.hasEmoji, true);
config.set(APP_CONSTANTS.targetLang, 'ru');
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const stagedFromDiff = yield gitDiffStaged();
        const changedFiles = yield gitGetModifiedFiles();
        if (changedFiles.length === 0) {
            logger.error(`✖ commit için herhangi bir değişiklik yok.`);
            process.exit(1);
        }
        if (stagedFromDiff.trim() == '') {
            const diff = yield gitDiff();
            if (diff.trim() == '') {
                logger.info('git diff için bir değişiklik yok');
                process.exit(1);
            }
            else {
                yield askToAi(diff);
                logger.success('askToAi methodu çalıştı');
            }
        }
    });
}
main();
