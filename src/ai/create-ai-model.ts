import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '../env'

export const createAIModel = (): GoogleGenerativeAI => {
	if (env.API_KEY)
		throw new Error('API_KEY is not set in the environment variables.')

	return new GoogleGenerativeAI(process.env.API_KEY)
}
