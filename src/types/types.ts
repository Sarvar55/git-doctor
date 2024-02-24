export interface ErrorAPIKey extends Error {
	name: 'ErrorAPIKey'
	message: string
}

export interface GenerateCommitRequest {
	diff: string
}

export interface CommitMessage {
	commit: string
}
