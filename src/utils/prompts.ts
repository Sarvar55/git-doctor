import { APP_CONSTANTS, ConfigManager } from '../config/config'
import { GenerateCommitRequest } from '../types/types'
import { logger } from './logger'

const config = new ConfigManager()

/**
 * Generates a prompt for creating a commit message based on the given git diff.
 * @param {string} diff - The git diff string.
 * @returns {string} The generated prompt.
 */
export const generatePrompt = (diff: string): string => {
	if (!diff.trim()) {
		logger.error('Diff string cannot be empty or only contain whitespace.')
		process.exit(1)
	}

	const hasEmoji = config.get(APP_CONSTANTS.targetLang) ?? false
	const language = config.get(APP_CONSTANTS.targetLang) ?? 'en'

	const mission = DEFINE_MISSION_PROMPT
	const rules = RULES_FOR_COMMIT_MESSAGE
	const diffPrompt = DIFF_PROMPT_FOR_COMMIT_MESSAGE(diff)
	const responseStructurePrompt = PROMPT_FOR_RESPONSE_STRUCTURE

	const mainPrompt = MAIN_PROMPT_FOR_COMMIT_MESSAGE({
		hasEmoji,
		diff,
		language,
	} as GenerateCommitRequest)

	return `${mission}\n\n${rules}\n\n${diffPrompt}\n\n${mainPrompt}\n\n${responseStructurePrompt}`
}

export const DEFINE_MISSION_PROMPT = `
You are a highly skilled software developer proficient in writing effective git commit messages. Your task is to craft a git commit message based on the provided git diff file.
`

export const RULES_FOR_COMMIT_MESSAGE = `
- Responses must be in JSON format.
- Separate the subject from the body with a blank line.
- Limit the subject line to 50 characters.
- Capitalize the subject line.
- Do not end the subject line with a period.
- Use the imperative mood in the subject line.
- Wrap the body at 72 characters.
- Specify the file or property that the commit affects. For example, "Fix bug in user login feature."
- Clearly state why the commit is being made. For example, "Fix bug to improve user experience."
- Use an action word (e.g., "Add," "Fix," "Update") at the beginning of the commit message.
- Clearly explain the problem that this commit is solving, focusing on why rather than how (the code explains that).
`

const MAIN_PROMPT_FOR_COMMIT_MESSAGE = (request: GenerateCommitRequest) => {
	const { hasEmoji, diff, language } = request

	return `
Your task is to create a concise commit message based on the provided git diff file.
${DIFF_PROMPT_FOR_COMMIT_MESSAGE(diff)}
${
	hasEmoji
		? 'Utilize the GitMoji convention to prefix the commit. Ensure the emojis used are supported on GitHub.'
		: 'Do not use any emoji or symbol as a prefix for the commit.'
}

The commit message must be in the present tense. Use the ${language} language for the commit message, as it determines the language for the JSON data values.
`
}

const DIFF_PROMPT_FOR_COMMIT_MESSAGE = (diff: string): string => {
	return `
When composing a commit, provide a commit message for each file indicating the changes made and the reasons behind them.
Remember, this commit will serve as an automation tool, so ensure the output is accurate and understandable.
Pay close attention to the provided git diff file below while crafting these messages.
${diff}
`
}

const PROMPT_FOR_RESPONSE_STRUCTURE = `
The JSON object must include the following field:
  - "commit": "[string]"

Format the response as a valid JSON object with all fields filled. Here is the structure for reference:

{
  "commit":  /* details */
}

Reply only with the completed JSON object, without additional explanatory text. The JSON should be complete and ready for parsing using JSON.parse(). It should not cause any errors when used and should be parsed directly.
`
