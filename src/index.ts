import { APP_CONSTANTS, ConfigManager } from './config/config'
import { askToAi } from './utils/ask-to-ai'
import { gitDiff } from './utils/git'

const config = new ConfigManager()
config.set(APP_CONSTANTS.hasEmoji, true)
// config.set(APP_CONSTANTS.translate_auto_to_target_lang, true)
// config.set(APP_CONSTANTS.targetLang, 'en')

async function main() {
	const message: string = await gitDiff()
	await askToAi(message)
}

main()
