export class ErrorApiKey extends Error {
	name: string

	constructor(message: string) {
		super(message)
		this.name = "'ErrorAPIKey"
	}
}

export class GitError extends Error {
	constructor(message: string) {
		super(message)
		this.name = 'GitError'
	}
}
