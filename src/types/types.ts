export interface ErrorAPIKey extends Error {
	name: 'ErrorAPIKey'
	message: string
}

export interface GenerateCommitRequest {
	diff: string
	hasEmoji: boolean
}

export interface CommitMessage {
	commit: string
}
