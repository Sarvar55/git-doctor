import { ExecaChildProcess, execa } from 'execa'

export const gitStatus = () => {
	const { stdout } = baseExeca(['status', '--porcelain'])
	return stdout
}

export const gitaddFilesToStagedArea = async (files: string[]) => {
	const { stdout } = await baseExeca(['add', ...files])
	return stdout
}

export const gitDir = async (): Promise<string> => {
	const { stdout } = await baseExeca(['rev-parse', '--show-toplevel'])
	return stdout
}

export const getLocalBranches = async (): Promise<string> => {
	const { stdout } = await baseExeca(['branch', '-r'])
	return stdout
}

export const gitGetRemoteUrl = async (origin = 'origin'): Promise<string> => {
	const { stdout } = await execa('git', ['remote', 'get-url', origin])
	return stdout
}
export const gitCommit = async (message: string): Promise<string> => {
	const { stdout } = await baseExeca(['commit', '-m', message])
	return stdout
}
export const gitPush = async (origin: string) => {
	const { stdout } = await baseExeca(['push', '--verbose', origin])
	return stdout
}

export const gitDiff = async (): Promise<string> => {
	const { stdout } = await baseExeca(['diff', '--', 'staged'])
	return stdout
}

const baseExeca = (commands: string[]): ExecaChildProcess<string> => {
	return execa('git', [...commands])
}

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
