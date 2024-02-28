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

	return buildPrompt(hasEmoji, diff, '' + language)
}

const validateDiff = (diff: string): void => {
	if (!diff.trim()) {
		logger.error('Diff string cannot be empty or only contain whitespace.')
		process.exit(1)
	}
}
const buildPrompt = (
	hasEmoji: boolean,
	diff: string,
	language: string
): string => {
	const mission = DEFINE_MISSION_PROMPT
	const rules = RULES_FOR_COMMIT_MESSAGE
	const responseStructurePrompt = PROMPT_FOR_RESPONSE_STRUCTURE

	const mainPrompt = MAIN_PROMPT_FOR_COMMIT_MESSAGE({
		hasEmoji,
		diff,
		language,
	} as GenerateCommitRequest)

	return generateOrderForPrompts([
		mission,
		rules,
		mainPrompt,
		responseStructurePrompt,
	])
}
const generateOrderForPrompts = (porompts: string[]) => {
	return porompts
		.map(prompt => {
			return `${prompt}\n\n`
		})
		.join('')
}

const DEFINE_MISSION_PROMPT = `
You are a very good software developer and you know very well how to write git commit messages. You will also write a git commit message.
`

const RULES_FOR_COMMIT_MESSAGE = `
- Response must be in JSON format.
- Separate subject from body with a blank line.
- Limit the subject line to 50 characters.
- Capitalize the subject line.
- Do not end the subject line with a period.
- Use the imperative mood in the subject line.
- Wrap the body at 72 characters.
- Use the body to explain what and why vs.
- Specify the file or property that Commit affects. For example, "Fix bug in user login feature".
- State why the commit is being made. For example, "Fix bug to improve user experience".
- Use an action word (for example, "Add", "Fix", "Update") at the beginning of the commit message. This immediately states what the commit does.
- Explain the problem that this commit is solving. Focus on why you are making this change as opposed to how (the code explains that).
`

const MAIN_PROMPT_FOR_COMMIT_MESSAGE = (request: GenerateCommitRequest) => {
	const { hasEmoji, diff, language } = request

	return `
    Your task is to create a clear commit message according to the git diff file I gave you.
    ${DIFF_PROMPT_FOR_COMMIT_MESSAGE(diff)}
    ${
		hasEmoji
			? 'Use the GitMoji convention to preface the commit. Note that some emojis are not supported on GitHub. Ensure the emojis you use are supported on GitHub.'
			: 'Do not preface the commit with any emoji or symbol.'
	}

    Commit message must be in present tense. Use this language ${language} for the write commit message pay attention to this.
    `
}

const DIFF_PROMPT_FOR_COMMIT_MESSAGE = (diff: string): string => {
	return `
	You need to create your commit message according to all changes in the project. Create a commit message containing the following changes:
	Changes:
    ${diff}
	
    `
}

const PROMPT_FOR_RESPONSE_STRUCTURE = `
   - This JSON object indicates that your commit message is a legal format. However, this should only be used as a basis. You need to create your commit message according to the changes in the project.
	{
		"commit": "The commit message will be placed here according to all changes in the project."
	}
		  
   The JSON object must include the following field:
    - "commit": "[string]"

   Format the response as a valid JSON object with all fields filled. Here is the structure for reference:

	Examples:1
    {
     "commit":  /* details */
    },
   Example:2
    {
	 "commit":"The commit message you created will be written here"
    },
   Example:3
    {
	 "commit":"This is the location of the commit message"
    }

   Respond only with the completed JSON object, without any additional explanatory or descriptive text. The JSON should be complete and ready for parsing. JSON.parse()
   It should not cause any errors when used and should be parsed directly. 
`
