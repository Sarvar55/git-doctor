import { APP_CONSTANTS, ConfigManager } from '../config/config'
import { commitTypesWithDesc } from './constants'

const config = new ConfigManager()
const language: string =
	(config.get(APP_CONSTANTS.targetLang) as string) || 'en'
const hasEmoji: boolean = !!config.get(APP_CONSTANTS.hasEmoji) || false

export const generatePrompt = (diff: string) => {
	const emojiPrompt = `
	- Use GitHub-supported emojis at the beginning of your commit message.
	  ${commitTypesWithDesc()}
	`
	const prompt = `
	- I want you to act as a commit message generator.
	- I will give you git diff file, and your job is to convert it into useful commit message .
	- Use this language ${language} for the write commit message pay attention to this.
	- ${
		hasEmoji
			? emojiPrompt
			: '- Do not preface the commit with any emoji or symbol.'
	}
	- Do not preface the commit with anything, use the present tense, return the full sentence, and use the conventional commits specification.
	- Changes:
	- Summarize this git diff into a useful, 10 words commit message.
	 ${diff}	
	- Format the response as a valid JSON object with all fields filled. Here is the structure for reference:
    Examples:
     {
     "commit":  "The commit message will be placed here according to all changes in the project."
     },
	   
	-  Do not write any explanations or other words, just reply with the commit message.  
	-  Do not include any additional text or explanations.
	`
	return prompt
}
