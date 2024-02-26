export interface GenerateCommitRequest {
	diff: string
	language: string
	hasEmoji: boolean
}

export interface CommitMessage {
	commit: string
}
