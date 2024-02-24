import { GenerateCommitRequest } from '../types/types'
export const generatePrompt = (request: GenerateCommitRequest): string => {
	return `
    Your mission is to craft clear and concise commit messages that adhere to the conventional commit convention. Ensure that the commit message:
    Your task is to create the most appropriate commir message according to the git diff file I gave you. 
    The parts with + are added to the code and the parts with - are deleted.
    Rules:
        - Response must be in JSON format.
        - The message should be concise and descriptive
        - Use imperative mood (e.g., 'Fix', 'Add', 'Update').
        - Do not include the word 'commit' in the message.
        - Do not include the word 'fixes' or 'fixing' in the message.
        - Do not include the word 'bug' or 'bugs' in the message.
        - Do not include the word 'issue' or 'issues' in the message.
        - Do not include the word 'error' or 'errors' in the message.
        - Do not include the word 'problem' or 'problems' in the message.
        - Do not include the word 'solution' or 'solutions' in the message.
        - Do not include the word 'patch' or 'patches' in the message.
        - Commit message tense must be present tense.
        - As an answer markdown donme just don json.
        - ${
			request?.hasEmoji
				? 'Use GitMoji convention to preface the commit.'
				: 'Do not preface the commit with anything.'
		}

        The JSON object must include the following fields:
        -"commit":"[string]"

        Example Output:
          {
            "commit": ${request.hasEmoji ? ':art:' : ''} Update frontend dependencies"
          }

        Format the response as a valid JSON object with all fields filled. Here is the structure for reference:

        Respond only with the completed JSON object, without any additional explanatory or descriptive text. The JSON should be complete and ready for parsing. JSON.parse()
        It should not cause any errors when used and should be parsed directly.
    `.trim()
}
