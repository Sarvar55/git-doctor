class ErrorApiKey extends Error {
	name: string

	constructor(message: string) {
		super(message)
		this.name = "'ErrorAPIKey"
	}
}
