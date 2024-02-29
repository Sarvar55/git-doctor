import { APP_CONSTANTS, ConfigManager } from '../config/config'

const config = new ConfigManager()
const language: string =
	(config.get(APP_CONSTANTS.targetLang) as string) || 'en'
const hasEmoji: boolean = !!config.get(APP_CONSTANTS.hasEmoji) || false

export const generatePrompt = (diff: string) => {
	const prompt = `
	- I want you to act as a commit message generator.
	- I will give you git diff file, and your job is to convert it into useful commit message in this ${language} language.
	- ${
		hasEmoji
			? '- Use Use GitHub-supported emojis at the beginning of your commit message. This ensures that your commit message is clear and effective.'
			: '- Do not preface the commit with any emoji or symbol.'
	}
	- Do not preface the commit with anything, use the present tense, return the full sentence, and use the conventional commits specification.
	- Changes:
	- Summarize this git diff into a useful, 10 words commit message.
	 ${diff}
	-  The JSON object must include the following field:
	    "commit": "[string]"
	-  Format the response as a valid JSON object with all fields filled. Here is the structure for reference:	
	   {
		"commit":  /* details */
	   },
	   
	-  Do not write any explanations or other words, just reply with the commit message.  
	-  Respond only with the completed JSON object, without any additional explanatory or descriptive text.
	-  The JSON should be complete and ready for parsing. JSON.parse() ,It should not cause any errors when used and should be parsed directly. 
	`
	return prompt
}
