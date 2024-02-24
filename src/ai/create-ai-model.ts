import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../env'

export const createAIModel = (): GenerativeModel => {
	if (!env.API_KEY)
		throw new ErrorApiKey(
			'API_KEY is not set in the environment variables.'
		)

	return new GoogleGenerativeAI(env.API_KEY).getGenerativeModel({
		model: 'gemini-pro',
	})
}
