import { APP_CONSTANTS, ConfigManager } from '../config/config'

const config = ConfigManager.getInstance()

const language: string =
	(config.get(APP_CONSTANTS.target_lang) as string) || 'en'

const hasEmoji: boolean = !!config.get(APP_CONSTANTS.has_emoji) || false

export const generatePrompt = (diff: string) => {
	const emojiPrompt = hasEmoji
		? ' **Select an emoji based on the given diff for the commit prefix (use lowercase). '
		: ' **Do not preface the commit with any emoji or symbol.**'

	const prompt = `
  - You are a commit message generator.
  - Receive a git diff file and convert it into a useful commit message.
  - Utilize the ${language} for the commit message and follow the given rules:
    - Do not preface the commit with anything.
    - Use the present tense.
    - Follow the conventional commits specification.
    ${emojiPrompt}
  - **Summarize the provided git diff into a concise, 10 word commit message.**
   ${diff}
  Examples:
    "The commit message will be placed here according to all changes in the project."
  - **Do not provide explanations, only reply with the commit message.**
  - **Return the commit message as a string.**
   ${
		hasEmoji &&
		`- **Output:**
    - **Select an emoji based on the given diff for the commit prefix, then provide the commit message.**
    - Example:
      - :emoji: commit message will come here`
   }
`
	return prompt
}
