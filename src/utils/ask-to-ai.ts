import { ChatSession, GenerativeModel } from '@google/generative-ai'
import { modelConfig } from '../ai/config/model-config'
import { createAIModel } from '../ai/create-ai-model'
import { generatePrompt } from './generate-prompt'
import { CommitMessage, GenerateCommitRequest } from '../types/types'

export const askToAi = async (message: string) => {
	const model = createAIModel()

	const chat = prepareChat(model)

	const prompt = generatePrompt({
		hasEmoji: true,
		diff: message,
	} as GenerateCommitRequest)

	const { response } = await chat.sendMessage(prompt)

	const commitJson = parseJsonFromMarkdown(response.text())

	const commitMessge: CommitMessage = JSON.parse(commitJson)

	console.log(commitMessge.commit)
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

const parseJsonFromMarkdown = (markdownString: string): string => {
	const pattern = /```json([\s\S]*?)```/
	const match = markdownString.match(pattern)

	if (match) {
		const parsedJson = match[1].trim()
		return parsedJson
	} else {
		return ''
	}
}
