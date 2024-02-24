import { ChatSession, GenerativeModel } from '@google/generative-ai'
import { modelConfig } from '../ai/config/model-config'
import { createAIModel } from '../ai/create-ai-model'
import { generatePrompt } from './generate-prompt'
import { CommitMessage } from '../types/types'
import { outro } from '@clack/prompts'
import chalk from 'chalk'

class AIManager {
	private model: GenerativeModel

	constructor() {
		this.model = createAIModel()
	}

	public async generateCommitMessage(message: string): Promise<string> {
		const chat = this.prepareChat()

		const prompt = generatePrompt({
			diff: message,
		})

		outro(chalk.green(prompt))
		try {
			const { response } = await chat.sendMessage(prompt)
			const jsonCommit = this.parseJsonFromMarkdown(response.text())
			const commitMessage: CommitMessage = JSON.parse(jsonCommit)

			return commitMessage.commit
		} catch (error) {
			this.handleError(error)
			process.exit(1)
		}
	}

	private prepareChat = (): ChatSession => {
		const {
			safetySettings,
			generationConfig: { maxOutputTokens, temperature },
		} = modelConfig
		return this.model.startChat({
			generationConfig: { temperature, maxOutputTokens },
			safetySettings,
		})
	}
	private parseJsonFromMarkdown(markdownString: string): string {
		const pattern = /```json([\s\S]*?)```/
		const match = markdownString.match(pattern)

		return match ? match[1].trim() : ''
	}

	private handleError(error: string | unknown): void {
		outro(`${chalk.red('✖')} ${error}`)
	}
}

export const askToAi = async (diff: string): Promise<void> => {
	const aiManager = new AIManager()
	const commitMessage = await aiManager.generateCommitMessage(diff)
	console.log(chalk.green(commitMessage))
}
