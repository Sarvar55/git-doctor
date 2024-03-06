import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'

import { logger } from '../utils/logger'
import { ErrorApiKey } from '../types/errors'
import { APP_CONSTANTS, ConfigManager } from '../config/config'

export const createAIModel = (): GenerativeModel => {
	const config = new ConfigManager()
	if (!config.has(APP_CONSTANTS.api_key)) {
		logger.error('API_KEY is not set in the environment variables .')
		throw new ErrorApiKey(
			'API_KEY is not set in the environment variables.'
		)
	}

	return new GoogleGenerativeAI(
		config.get(APP_CONSTANTS.api_key) as string
	).getGenerativeModel({
		model: 'gemini-pro',
	})
}
