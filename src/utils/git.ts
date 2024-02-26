import { ExecaChildProcess, execa } from 'execa'

/**
 * Executes the 'git status' command and returns the output.
 * @returns {string} The output of the 'git status' command.
 */
export const gitStatus = () => {
	const { stdout } = baseExeca(['status', '--porcelain'])
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
	await baseExeca(['add', ...files])
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
export const getLocalBranches = async (): Promise<string> => {
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
 * @returns {Promise<string>} A promise that resolves to the output of the 'git push' command.
 */
export const gitPush = async (origin: string) => {
	const { stdout } = await baseExeca(['push', '--verbose', origin])
	return stdout
}

/**
 * Shows the differences between the staged and the last commit.
 * @returns {Promise<string>} A promise that resolves to the output of the 'git diff' command.
 */
export const gitDiffStaged = async (): Promise<string> => {
	const { stdout } = await baseExeca(['diff', '--', 'staged'])
	return stdout
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
