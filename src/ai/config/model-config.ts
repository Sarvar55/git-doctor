import { HarmBlockThreshold, HarmCategory } from '@google/generative-ai'

export const modelConfig = {
	generationConfig: {
		maxOutputTokens: 75,
		temperature: 0.9,
		topP: 0.8,
	},
	safetySettings: [
		{
			category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_HARASSMENT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
		{
			category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
			threshold: HarmBlockThreshold.BLOCK_NONE,
		},
	],
}
