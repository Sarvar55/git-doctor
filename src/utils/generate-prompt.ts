import { APP_CONSTANTS, ConfigManager } from '../config/config'
import { GenerateCommitRequest } from '../types/types'

export const generatePrompt = (request: GenerateCommitRequest): string => {
	const config = new ConfigManager()
	return `
    Your mission is to craft clear and concise commit messages that adhere to the conventional commit convention. Your task is to create the most appropriate commit message based on the git diff file I provided. The parts with + are additions to the code, and the parts with - are deletions.

    Rules:
        - The response must be in JSON format.
        - The commit message should be concise and descriptive.
        - I want you to create a commit message for me according to this ${request.diff} change.
        - The commit message should also include information such as why it was done and what to do.
        - The commit message you need to write should not be something very specific, it should be something general, that is, it should resemble all the changes made.
        - Use imperative mood (e.g., 'Fix', 'Add', 'Update').
        - Avoid using the word 'commit' in the message.
        - Do not include words like 'fixes', 'fixing', 'bug', 'bugs', 'issue', 'issues', 'error', 'errors', 'problem', 'problems', 'solution', 'solutions', 'patch', 'patches'.
        - !The commit message must be in present tense, you need to be very careful about this. 
        - Keep lines under 100 characters.
        - This language (${
			config.has(APP_CONSTANTS.translate_auto_to_target_lang)
				? config.has(APP_CONSTANTS.targetLang)
					? config.get(APP_CONSTANTS.targetLang)
					: 'en'
				: 'en'
		}) determines the language in which the values of your json data will be, pay attention to this.
        - ${
			config.get(APP_CONSTANTS.hasEmoji)
				? 'Optionally, use the GitMoji convention to preface the commit. Note that some emojis are not supported on GitHub. Ensure the emojis you use are supported on GitHub.'
				: 'Do not preface the commit with any emoji or symbol.'
		}

    The JSON object must include the following field:
        - "commit": "[string]"

    Example Output:
      {
        "commit": "${config.get(APP_CONSTANTS.hasEmoji) ? '🐛' : ''} Update frontend dependencies"
      }

    Format the response as a valid JSON object with all fields filled. Here is the structure for reference:

    Respond only with the completed JSON object, without any additional explanatory or descriptive text. The JSON should be complete and ready for parsing. JSON.parse()
    It should not cause any errors when used and should be parsed directly.
    `.trim()
}
