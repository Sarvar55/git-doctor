import { confirm, text } from '@clack/prompts'
import { logger } from './logger'
import cliSelect from 'cli-select'
import chalk from 'chalk'

const has = (str: string | unknown | undefined): boolean => {
	if (str == undefined || str == 'unknown') return false
	if (typeof str === 'string') {
		return str.trim() !== ''
	} else {
		return false
	}
}
const isConfirm = async (message: string) => {
	return await confirm({
		message,
	})
}

const customCliSelect = async (values: string[]): Promise<string> => {
	const { value } = await cliSelect({
		values,
		valueRenderer: (value: string, selected: boolean) => {
			if (selected) {
				return chalk.underline(value)
			}
			return value
		},
	})
	return value
}

async function logAsyncMethodResult<T>(
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
const getCommitSubject = async () => {
	return await text({
		message: 'Enter commit subject:',
		validate(value) {
			if (value.length === 0) {
				return logger.error('commit is required')
			}
		},
	})
}

export {
	logAsyncMethodResult,
	isConfirm,
	has,
	customCliSelect,
	getCommitSubject,
}
