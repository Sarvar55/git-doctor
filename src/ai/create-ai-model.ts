import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../env'
import { logger } from '../utils/logger'
import { ErrorApiKey } from '../types/errors'

export const createAIModel = (): GenerativeModel => {
	if (!env.API_KEY) {
		logger.error('API_KEY is not set in the environment variables .')
		throw new ErrorApiKey(
			'API_KEY is not set in the environment variables.'
		)
	}

	return new GoogleGenerativeAI(env.API_KEY).getGenerativeModel({
		model: 'gemini-pro',
	})
}
