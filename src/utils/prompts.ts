import { APP_CONSTANTS, ConfigManager } from '../config/config'
import { GenerateCommitRequest } from '../types/types'

const config = new ConfigManager()

export const DEFINE_MISSION_PROMPT = `
You are a very good software developer and you know very well how to write git commit messages. You will also write a git commit message.
`

export const RULES_FOR_COMMIT_MESSAGE = `
- Separate subject from body with a blank line
- Limit the subject line to 50 characters
- Capitalize the subject line
- Do not end the subject line with a period
- Use the imperative mood in the subject line
- Wrap the body at 72 characters
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

    Commit message must be in present tense.  Use this language ${language} for the commit message. This language determines the language in which the values of your json data will be, pay attention to this.
    `
}

const DIFF_PROMPT_FOR_COMMIT_MESSAGE = (diff: string): string => {
	return `
    When writing a commit, there will be a commit message for each file showing the changes made and the reason for these changes.
    Remember, this commit will be an automation tool, so make sure the output is accurate and understandable.
    And while writing these, it is very important that you look at this git diff file below.
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

  Respond only with the completed JSON object, without any additional explanatory or descriptive text. The JSON should be complete and ready for parsing. JSON.parse()
  It should not cause any errors when used and should be parsed directly.
`

export const generatePrompt = (diff: string): string => {
	const hasEmoji = config.has(APP_CONSTANTS.targetLang)
	const language = config.has(APP_CONSTANTS.targetLang)
		? config.get(APP_CONSTANTS.targetLang)
		: 'en'

	const mission = DEFINE_MISSION_PROMPT
	const rules = RULES_FOR_COMMIT_MESSAGE
	const diffPrompt = DIFF_PROMPT_FOR_COMMIT_MESSAGE(diff)
	const responseStructurePrompt = PROMPT_FOR_RESPONSE_STRUCTURE

	const mainPrompt = MAIN_PROMPT_FOR_COMMIT_MESSAGE({
		hasEmoji,
		diff,
		language,
	} as GenerateCommitRequest)

	return `${mission}\n\n${rules}\n\n${diffPrompt}\n\n${responseStructurePrompt}\n\n${mainPrompt}`
}
