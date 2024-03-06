import { APP_CONSTANTS, ConfigManager } from '../config/config'

const config = ConfigManager.getInstance()

const language: string =
	(config.get(APP_CONSTANTS.targetLang) as string) || 'en'

const hasEmoji: boolean = !!config.get(APP_CONSTANTS.hasEmoji) || false

export const generatePrompt = (diff: string) => {
	const prompt = `
	- I want you to act as a commit message generator.
	- I will give you git diff file, and your job is to convert it into useful commit message .
	- Use this language ${language} for the write commit message pay attention to this.
	- ${
		hasEmoji
			? '- Use GitMoji convention to preface the commit.'
			: '- Do not preface the commit with any emoji or symbol.'
	}
	- Do not preface the commit with anything, use the present tense, return the full sentence, and use the conventional commits specification.
	- Changes:
	- Summarize this git diff into a useful, 10 words commit message.
	 ${diff}
    Examples:
      "The commit message will be placed here according to all changes in the project."
	-  Do not write any explanations or other words, just reply with the commit message.  
	-  Do not include any additional text or explanations.
	-  You must return the commit message to me as a string.
	`
	return prompt
}
