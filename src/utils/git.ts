import { ExecaChildProcess, execa } from 'execa'
import { logger } from './logger'
import { GitError } from '../types/errors'
import fs from 'fs'
import { resolve, dirname } from 'path'

/**
 * Utility functions for interacting with Git repositories.
 *
 * This module provides a set of functions to perform various Git operations such as
 * checking the status of a repository, adding files to the staging area, retrieving the
 * root directory of the repository, listing local branches, getting remote URLs, committing
 * changes, pushing changes to a remote repository, and more.
 *
 * Each function is designed to be used asynchronously and returns promises, allowing for
 * non-blocking execution in Node.js environments.
 *
 * Note: Some functions, like `gitaddFilesToStagedArea`, perform additional checks or
 * operations before executing the Git command. For example, `gitaddFilesToStagedArea`
 * checks if files are ignored by `.gitignore` before adding them to the staging area.
 *
 * Error handling is implemented within each function to catch and log errors that may
 * occur during the execution of Git commands.
 */

/**
 * Executes the 'git status' command and returns the output.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git status' command.

 */
export const gitStatus = async (): Promise<string> => {
	const { stdout } = await executeGitCommand(['status', '--porcelain'])
	return stdout
}

/**
 * Adds files to the staging area in Git.
 * @param {string[]} files - An array of file paths to add.
 * @returns {Promise<void>} The output of the 'git add' command.
 */
export const gitaddFilesToStagedArea = async (
	files: string[]
): Promise<void> => {
	logger.info('running:gitaddFilesToStagedArea with' + JSON.stringify(files))
	if (!checkIfGitIgnoreExists()) {
		await executeGitCommand(['add', ...files])
		process.exit(1)
	}
	/**Ancak, asenkron bir işlem içeriyorsa, map,filter fonksiyonu tamamlanmadan önce işlemleri beklemek için Promise.all kullanman gerekebilir. */
	const trackingFiles = await Promise.all(
		files.filter(async file => {
			const isIgnored = await checkIfFileIsIgnored(file)
			return isIgnored
		})
	)

	logger.info('filesToAdd ' + JSON.stringify(trackingFiles))

	if (trackingFiles.length > 0) {
		await executeGitCommand(['add', ...trackingFiles])
	} else {
		logger.info('No files to add to the staged area.')
	}
}

/**
 * Retrieves the root directory of the current Git repository.
 * @returns {Promise<string>} A promise that resolves to the root directory path.
 */
export const gitDir = async (): Promise<string> => {
	const { stdout } = await executeGitCommand(['rev-parse', '--show-toplevel'])
	return stdout
}

/**
 * Lists all local branches in the current Git repository.
 * @returns {Promise<string>} A promise that resolves to the list of local branches.
 */
export const gitGetLocalBranches = async (): Promise<string> => {
	const { stdout } = await executeGitCommand(['branch', '-r'])
	return stdout
}
/**
 * Retrieves the remote URL for a given remote name.
 * @param {string} [origin='origin'] - The name of the remote to get the URL for.
 * @returns {Promise<string>} A promise that resolves to the remote URL.
 */
export const gitGetRemoteUrl = async (origin = 'origin'): Promise<string> => {
	const { stdout } = await execa('git', ['remote', 'get-url', origin])
	return stdout
}

/**
 * Commits changes to the Git repository with a given commit message.
 * @param {string} message - The commit message.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git commit' command.
 */
export const gitCommit = async (message: string): Promise<string> => {
	const { stdout } = await executeGitCommand(['commit', '-m', message])
	return stdout
}

/**
 * Pushes changes to a remote repository.
 * @param {string} origin - The name of the remote repository to push to.
 * @param {string} branch - The name of the branch to push.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git push' command.
 */
export const gitPush = async (
	origin: string,
	branch: string
): Promise<string> => {
	logger.info('branch' + branch)
	logger.warning('origin' + origin)
	const { stdout } = await executeGitCommand([
		'push',
		'--verbose',
		origin,
		branch,
	])
	return stdout
}

/**
 * Shows the differences between the staged and the last commit.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git diff' command.
 */
export const gitDiffStaged = async (): Promise<string> => {
	const { stdout } = await executeGitCommand(['diff', '--staged'])
	return stdout
}

/**
 * Retrieves the name of the current Git branch.
 * @returns {Promise<string>} A promise that resolves to the name of the current branch.
 */
export const gitGetCurrentBranch = async (): Promise<string> => {
	const { stdout } = await executeGitCommand([
		'rev-parse',
		'--abbrev-ref',
		'HEAD',
	])
	return stdout
}

/**
 * Shows the differences between the working directory and the last commit.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git diff' command.
 */
export const gitDiff = async (): Promise<string> => {
	const { stdout } = await executeGitCommand(['diff'])
	return stdout
}

/**
 * Retrieves a list of modified files in the Git repository.
 * @returns {Promise<string[]>} A promise that resolves to an array of modified file paths.
 */
export const gitGetModifiedFiles = async (): Promise<string[]> => {
	const { stdout: modified } = await executeGitCommand([
		'ls-files',
		'--modified',
		'--others',
		'--exclude-standard',
	])
	if (!modified) return []
	return [...modified.split('\n').sort()]
}

/**
 * Executes a Git command with the provided arguments.
 * @param {string[]} commands - An array of command arguments to pass to Git.
 * @returns {Promise<ExecaChildProcess<string>>} An Execa child process instance.
 * @throws Will throw an GitError if the Git command execution fails.
 */
const executeGitCommand = async (
	commands: string[]
): Promise<ExecaChildProcess<string>> => {
	try {
		return await execa('git', [...commands])
	} catch (error) {
		logger.error('Git command execution failed:' + error)
		throw new GitError(`Git command execution failed: ${error}`)
	}
}

/**
 * Checks if a file is ignored by the .gitignore file.
 * @param {string} filePath - The path of the file to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the file is ignored, false otherwise.
 */
const checkIfFileIsIgnored = async (filePath: string): Promise<boolean> => {
	try {
		const { stdout } = await executeGitCommand([
			'ls-files',
			'--exclude-from',
			'.gitignore',
		])
		const ignoredFiles = stdout.split('\n')

		return ignoredFiles.includes(filePath)
	} catch (error) {
		console.error('Error checking file poll status:', error)
		return false
	}
}

const checkIfGitIgnoreExists = (): boolean => {
	const gitIgnorePath = `${resolve(dirname(''))}/.gitignore`

	try {
		return fs.existsSync(gitIgnorePath)
	} catch (error) {
		console.error('Error checking .gitignore file:', error)
		return false
	}
}

export const gitInit = async (): Promise<void> => {
	await execa('git', ['init', '.'], { cwd: process.cwd() })
}
