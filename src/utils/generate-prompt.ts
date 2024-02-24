import { GenerateCommitRequest } from '../types/types'

export const generatePrompt = (request: GenerateCommitRequest): string => {
	return `
    Your mission is to craft clear and concise commit messages that adhere to the conventional commit convention. Your task is to create the most appropriate commit message based on the git diff file I provided. The parts with + are additions to the code, and the parts with - are deletions.

    Example Input:
    diff --git a/build/index.js b/build/index.js
    index  2994376..f1075b5  100644
    --- a/build/index.js
    +++ b/build/index.js
    @@ -6,10 +6,16 @@ index ec7c5aa..210daa3  100644
    --- a/src/app/chef/page.tsx
    +++ b/src/app/chef/page.tsx
    @@ -6,6 +6,7 @@ export default function page({}: Props) {
    +
    + const names=["Sarvar","Ilkin","Omer"]
    +
    + const filter=()=>{
    +  return names.filter(name=>name.equals("Sarvar"))
    +}
    +
    return (
      <div>
          <h1>merhaba</h1>
    - jhsbjhsbfjb
      </div>
    )
  }

    Rules:
        - The response must be in JSON format.
        - The commit message should be concise and descriptive.
        - I want you to create a commit message for me according to this ${request.diff} change.
        - Use imperative mood (e.g., 'Fix', 'Add', 'Update').
        - Avoid using the word 'commit' in the message.
        - Do not include words like 'fixes', 'fixing', 'bug', 'bugs', 'issue', 'issues', 'error', 'errors', 'problem', 'problems', 'solution', 'solutions', 'patch', 'patches'.
        - The commit message tense must be present tense.
        - Keep lines under  100 characters.
        - Provide the answer in JSON format only.
        - ${
			request?.hasEmoji
				? 'Optionally, use the GitMoji convention to preface the commit. Note that some emojis are not supported on GitHub. Ensure the emojis you use are supported on GitHub.'
				: 'Do not preface the commit with any emoji or symbol.'
		}

    The JSON object must include the following field:
        - "commit": "[string]"

    Example Output:
      {
        "commit": "${request.hasEmoji ? '🐛' : ''} Update frontend dependencies"
      }

    Format the response as a valid JSON object with all fields filled. Here is the structure for reference:

    Respond only with the completed JSON object, without any additional explanatory or descriptive text. The JSON should be complete and ready for parsing. JSON.parse()
    It should not cause any errors when used and should be parsed directly.
    `.trim()
}
