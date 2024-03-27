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

const types = [
	{ value: 'build', label: 'Build' },
	{ value: 'chore', label: 'Chore' },
	{ value: 'ci', label: 'CI' },
	{ value: 'docs', label: 'Docs' },
	{ value: 'feat', label: 'Feat' },
	{ value: 'fix', label: 'Fix' },
	{ value: 'refactor', label: 'Refactor' },
	{ value: 'style', label: 'Style' },
	{ value: 'test', label: 'Test' },
	{ value: 'security', label: 'Security' },
]

const emojis = {
	build: '🔨',
	chore: '🔧',
	ci: '🔬',
	docs: '📝',
	feat: '✨',
	fix: '🐞',
	refactor: '🔨',
	style: '💅',
	test: '🔬',
	security: '🔒',
}

export const commitTypes = types.map(commitType => {
	return commitType.value
})

export const commitTypesWithEmoji = types.map(commitType => {
	return `${emojis[commitType.value as keyof typeof emojis]} ${commitType.value}`
})
