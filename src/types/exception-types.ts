class ErrorApiKey extends Error {
	name: string = "'ErrorAPIKey"

	constructor(message: string) {
		super(message)
	}
}
