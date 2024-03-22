import { APP_CONSTANTS, ConfigManager } from '../config/config'

export const OPTION_ACTIONS = {
	sourceLang: {
		description: 'set source language',
		configKey: APP_CONSTANTS.source_lang,
		logMessage: 'Source language set to:',
	},
	emoji: {
		description: 'set emoji',
		configKey: APP_CONSTANTS.has_emoji,
		logMessage: 'Emoji set to:',
	},
	targetLang: {
		description: 'set target language',
		configKey: APP_CONSTANTS.target_lang,
		logMessage: 'Target language set to:',
	},
	autoTrans: {
		description: 'enable auto-translate',
		configKey: APP_CONSTANTS.translate_auto_to_target_lang,
		logMessage: 'Auto translate feature set to:',
	},
	apiKey: {
		description: 'set API key',
		configKey: APP_CONSTANTS.api_key,
		logMessage: 'Api key set to:',
	},
	config: {
		description: 'retrive all configs',
		action: () => ConfigManager.getInstance().all(),
	},
}
