import { ExecaChildProcess, execa } from 'execa'
import { readFileSync } from 'fs'
import { logger } from './logger'

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
export const gitStatus = async () => {
	const { stdout } = await baseExeca(['status', '--porcelain'])
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

	/**Ancak, asenkron bir işlem içeriyorsa, map fonksiyonu tamamlanmadan önce işlemleri beklemek için Promise.all kullanman gerekebilir. */
	const validFiles = await Promise.all(
		files.map(async file => {
			const isIgnored = await checkIfFileIsIgnored(file)
			return isIgnored ? null : file
		})
	)
	//base execa tarafı benden string [] istiyor ama ben ona string|null veriyorum o yuzden içinde olanların hepsi string turunde oldugunu garanti ettdim
	const filesToAdd = validFiles.filter(
		(file): file is string => file !== null
	)

	await baseExeca(['add', ...filesToAdd])
}

/**
 * Retrieves the root directory of the current Git repository.
 * @returns {Promise<string>} A promise that resolves to the root directory path.
 */
export const gitDir = async (): Promise<string> => {
	const { stdout } = await baseExeca(['rev-parse', '--show-toplevel'])
	return stdout
}

/**
 * Lists all local branches in the current Git repository.
 * @returns {Promise<string>} A promise that resolves to the list of local branches.
 */
export const gitGetLocalBranches = async (): Promise<string> => {
	const { stdout } = await baseExeca(['branch', '-r'])
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
	const { stdout } = await baseExeca(['commit', '-m', message])
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
	const { stdout } = await baseExeca(['push', '--verbose', origin, branch])
	return stdout
}

/**
 * Shows the differences between the staged and the last commit.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git diff' command.
 */
export const gitDiffStaged = async (): Promise<string> => {
	try {
		const { stdout } = await baseExeca(['diff', '--staged'])
		return stdout
	} catch (error) {
		logger.error('Error executing git diff --staged:' + error)
		return ''
	}
}

/**
 * Retrieves the name of the current Git branch.
 * @returns {Promise<string>} A promise that resolves to the name of the current branch.
 */
export const gitGetCurrentBranch = async (): Promise<string> => {
	try {
		const { stdout } = await execa('git', [
			'rev-parse',
			'--abbrev-ref',
			'HEAD',
		])
		return stdout.trim() // Trim to remove any leading/trailing whitespace
	} catch (error) {
		console.error('Error retrieving current branch:', error)
		throw error
	}
}

/**
 * Shows the differences between the working directory and the last commit.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git diff' command.
 */
export const gitDiff = async (): Promise<string> => {
	const { stdout } = await baseExeca(['diff', '.', ':!*.js'])
	return stdout
}

/**
 * Retrieves a list of modified files in the Git repository.
 * @returns {Promise<string[]>} A promise that resolves to an array of modified file paths.
 */
export const gitGetModifiedFiles = async (): Promise<string[]> => {
	const { stdout: modified } = await baseExeca([
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
 * @returns {ExecaChildProcess<string>} An Execa child process instance.
 */
const baseExeca = (commands: string[]): ExecaChildProcess<string> => {
	return execa('git', [...commands])
}

/**
 * Checks if a file is ignored by the .gitignore file.
 * @param {string} filePath - The path of the file to check.
 * @returns {Promise<boolean>} A promise that resolves to true if the file is ignored, false otherwise.
 */
const checkIfFileIsIgnored = async (filePath: string): Promise<boolean> => {
	try {
		// .gitignore dosyasını okur
		const gitignoreContent = readFileSync('.gitignore', 'utf8')

		const normalizedFilePath = filePath.replace(/\\/g, '/')
		const isIgnored = gitignoreContent.includes(normalizedFilePath)

		return isIgnored
	} catch (error) {
		console.error('Error reading .gitignore file:', error)
		return false
	}
}
