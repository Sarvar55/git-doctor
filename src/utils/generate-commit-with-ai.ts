import { ChatSession, GenerativeModel } from '@google/generative-ai'
import { modelConfig } from '../ai/config/model-config'
import { createAIModel } from '../ai/create-ai-model'
import { generatePrompt } from './prompts'
import { CommitMessage } from '../types/types'
import { logger } from './logger'

class AIManager {
	private model: GenerativeModel

	constructor() {
		this.model = createAIModel()
	}

	public async generateCommitMessage(message: string): Promise<string> {
		const chat = this.prepareChat()

		const prompt = generatePrompt(message)

		logger.info(prompt)
		try {
			const { response } = await chat.sendMessage(prompt)
			logger.info(response.text())
			const jsonCommit = response.text()
			logger.success(jsonCommit)
			const commitMessage: CommitMessage = JSON.parse(
				this.parseJsonFromMarkdown(jsonCommit)
			)

			return commitMessage.commit
		} catch (error) {
			this.handleError(error)
			process.exit(1)
		}
	}

	private prepareChat = (): ChatSession => {
		const {
			safetySettings,
			generationConfig: { maxOutputTokens, temperature, topP },
		} = modelConfig
		return this.model.startChat({
			generationConfig: { temperature, maxOutputTokens, topP },
			safetySettings,
		})
	}
	private parseJsonFromMarkdown(markdownString: string): string {
		const pattern = /```json([\s\S]*?)```/
		const match = markdownString.match(pattern)

		return match ? match[1].trim() : ''
	}

	private handleError(error: string | unknown): void {
		logger.error(`✖ ${error}`)
	}
}

export const generateCommitWithAi = async (diff: string): Promise<string> => {
	const aiManager = new AIManager()
	const commitMessage = await aiManager.generateCommitMessage(diff)
	console.log(logger.success(commitMessage))
	return commitMessage
}
