import { confirm, text } from '@clack/prompts'
import { logger } from './logger'
import cliSelect from 'cli-select'
import { execSync } from 'child_process'
import chalk from 'chalk'

/**
 * Checks if a given string is not undefined, not 'unknown', and not an empty string.
 * @param {string | unknown | undefined} str - The string to check.
 * @returns {boolean} True if the string is not undefined, not 'unknown', and not an empty string.
 */
const has = (str: string | unknown | undefined): boolean => {
	if (str == undefined || str == 'unknown') return false
	if (typeof str === 'string') {
		return str.trim() !== ''
	} else {
		return false
	}
}

/**
 * Prompts the user for confirmation with a given message.
 * @param {string} message - The message to display to the user.
 * @returns {Promise<boolean>} A promise that resolves to true if the user confirms, false otherwise.
 */
const isConfirm = async (message: string): Promise<boolean | symbol> => {
	return await confirm({
		message,
	})
}

/**
 * Allows the user to select an option from a list of values.
 * @param {string[]} values - The list of values to display to the user.
 * @returns {Promise<string>} A promise that resolves to the selected value.
 */
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

/**
 * Logs the result of an asynchronous method.
 * @param {() => Promise<T>} method - The asynchronous method to execute.
 * @param {string} methodName - The name of the method for logging purposes.
 * @returns {Promise<T>} A promise that resolves to the result of the method.
 */
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
/**
 * Prompts the user to enter a commit subject.
 * @returns {Promise<string>} A promise that resolves to the entered commit subject.
 */
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

const checkIsGitRepository = () => {
	try {
		const output = execSync('git rev-parse --is-inside-work-tree', {
			encoding: 'utf-8',
		})
		return output.trim() === 'true'
	} catch (err) {
		return false
	}
}

export {
	logAsyncMethodResult,
	isConfirm,
	has,
	customCliSelect,
	getCommitSubject,
	checkIsGitRepository,
}
