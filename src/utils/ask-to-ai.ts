import { ChatSession, GenerativeModel } from '@google/generative-ai'
import { modelConfig } from '../ai/config/model-config'
import { createAIModel } from '../ai/create-ai-model'
import { generatePrompt } from './generate-prompt'
import { CommitMessage } from '../types/types'
import { outro } from '@clack/prompts'
import chalk from 'chalk'

export const askToAi = async (message: string): Promise<void> => {
	const model = createAIModel()

	const chat = prepareChat(model)

	const prompt = generatePrompt({
		hasEmoji: true,
		diff: message,
	})

	try {
		const { response } = await chat.sendMessage(prompt)

		const commitJson = parseJsonFromMarkdown(response.text())

		const commitMessge: CommitMessage = JSON.parse(commitJson)

		console.log(chalk.green(commitMessge.commit))
	} catch (error) {
		outro(`${chalk.red('✖')} ${error}`)
		process.exit(1)
	}
}

const prepareChat = (model: GenerativeModel): ChatSession => {
	const {
		safetySettings,
		generationConfig: { maxOutputTokens, temperature },
	} = modelConfig

	return model.startChat({
		generationConfig: { temperature, maxOutputTokens },
		safetySettings,
	})
}

const parseJsonFromMarkdown = (markdownString: string): string => {
	const pattern = /```json([\s\S]*?)```/
	const match = markdownString.match(pattern)

	return match ? match[1].trim() : ''
}
