import { ChatSession, GenerativeModel } from '@google/generative-ai'
import { modelConfig } from '../ai/config/model-config'
import { createAIModel } from '../ai/create-ai-model'

const askToAi = async (message: string) => {
	const model = createAIModel()

	const chat = prepareChat(model)

	const response = chat.sendMessage(message)
}

const prepareChat = (model: GenerativeModel): ChatSession => {
	const {
		safetySettings,

		generationConfig: { maxOutputTokens, temperature },
	} = modelConfig

	const chat = model.startChat({
		generationConfig: {
			temperature,
			maxOutputTokens: maxOutputTokens,
		},
		safetySettings,
	})
	return chat
}
