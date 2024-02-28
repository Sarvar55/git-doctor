import { logger } from './logger'

export const has = (str: string | unknown | undefined): boolean => {
	if (str == undefined || str == 'unknown') return false
	if (typeof str === 'string') {
		return str.trim() !== ''
	} else {
		return false
	}
}

export async function logAsyncMethodResult<T>(
	method: () => Promise<T>,
	methodName: string
): Promise<T> {
	try {
		const result = await method()
		logger.success(`${methodName} result: ${result}`)
		return result
	} catch (error) {
		console.error(`Error occured (${methodName}):`, error)
		throw error
	}
}
