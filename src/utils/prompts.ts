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
	validateDiff(diff)

	const hasEmoji: boolean = !!config.get(APP_CONSTANTS.hasEmoji) || false

	const language = config.get(APP_CONSTANTS.targetLang) ?? 'en'

	return buildPrompt({ hasEmoji, diff, language } as GenerateCommitRequest)
}

const validateDiff = (diff: string): void => {
	if (!diff.trim()) {
		logger.error('Diff string cannot be empty or only contain whitespace.')
		process.exit(1)
	}
}

const buildPrompt = (request: GenerateCommitRequest): string => {
	const { diff, hasEmoji, language } = request
	const mission = DEFINE_MISSION_PROMPT
	const rules = RULES_FOR_COMMIT_MESSAGE(hasEmoji, language)
	const responseStructurePrompt = PROMPT_FOR_RESPONSE_STRUCTURE

	const mainPrompt = MAIN_PROMPT_FOR_COMMIT_MESSAGE(diff)

	return generateOrderForPrompts([
		mission,
		rules,
		mainPrompt,
		responseStructurePrompt,
	])
}

const generateOrderForPrompts = (prompts: string[]): string => {
	return prompts.join('\n\n')
}

const DEFINE_MISSION_PROMPT = `
You are a skilled software developer who excels in writing git commit messages. Your task is to create a clear commit message based on the given git diff file.
`

const RULES_FOR_COMMIT_MESSAGE = (
	hasEmoji: boolean,
	language: string
): string => `
- Response must be in JSON format.
- Separate subject from body with a blank line.
- Limit the subject line to 50 characters.
- Capitalize the subject line.
- Do not end the subject line with a period.
- Use the imperative mood in the subject line.
- Wrap the body at 72 characters.
- Use the body to explain what and why vs.
- Explain the problem that this commit is solving. Focus on why you are making this change rather than how (the code explains that).
${
	hasEmoji
		? '- Use GitHub-supported emojis at the beginning of your commit message for clarity and effectiveness.'
		: '- Do not preface the commit with any emoji or symbol.'
}
- Commit message must be in the present tense. Use ${language} for writing commit messages.
`

const MAIN_PROMPT_FOR_COMMIT_MESSAGE = (diff: string): string => `
Your task is to create a clear commit message based on the given git diff file.
${DIFF_PROMPT_FOR_COMMIT_MESSAGE(diff)}
`

const DIFF_PROMPT_FOR_COMMIT_MESSAGE = (diff: string): string => `
You need to create a commit message based on all changes in the project. Create a commit message containing the following changes:
Changes:
${diff}
`

const PROMPT_FOR_RESPONSE_STRUCTURE = `
   - This JSON object indicates that your commit message is a legal format. However, this should only be used as a basis. You need to create your commit message according to the changes in the project.
   - The 'Content-Type' header of the incoming response should be 'application/json; charset=utf-8'.
	{
		"commit": "The commit message will be placed here based on all changes in the project."
	}

	Important: Compose your commit message in only 1 line.
	Important: The 'Content-Type' header of your response should be 'application/json; charset=utf-8'.

   The JSON object must include the following field:
    - "commit": "[string]"

   Format the response as a valid JSON object with all fields filled. Here is the structure for reference:

	Examples:
    {
        "commit": "The commit message you created will be written here."
    }

   Respond only with the completed JSON object, without any additional explanatory or descriptive text. The JSON should be complete and ready for parsing using JSON.parse().
`
