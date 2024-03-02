import { isCancel } from 'axios'
import { customCliSelect, isConfirm } from '../utils/commons'
import {
	gitGetCurrentBranch,
	gitGetLocalBranches,
	gitGetRemoteUrl,
	gitPush,
} from '../utils/git'
import { outro, spinner } from '@clack/prompts'
import chalk from 'chalk'
import { logger } from '../utils/logger'

export const push = async () => {
	const isPushConfirmed = await isConfirm('Do you want to run `git push`🚀?')

	if (isCancel(isPushConfirmed)) process.exit(1)

	const shouldPushToBranch = await isConfirm(
		'Is there a branch you want to `push specifically`?'
	)

	try {
		let selectedBranch: string = ''
		if (shouldPushToBranch && !isCancel(shouldPushToBranch)) {
			selectedBranch = await getBranchMenuInCli()
		} else if (shouldPushToBranch && isCancel(shouldPushToBranch)) {
			const currentBranch = await gitGetCurrentBranch()
			await processPush(currentBranch)
		}
		if (!isCancel(isPushConfirmed)) {
			processPush(selectedBranch)
		} else {
			outro(`${chalk.red('✖')} push  canceled`)
		}
	} catch (error) {
		logger.error(`✖ push error: ${error}`)
		process.exit(1)
	}
}

const processPush = async (branch: string) => {
	const pushProgress = spinner()
	try {
		logger.info(branch)
		pushProgress.start('⏰ Push operation is taking place')

		const origin = await gitGetRemoteUrl()
		const stdout = await gitPush(origin, branch)

		pushProgress.stop(
			`${chalk.green('✔')} successfully pushed all commits to ${origin}`
		)

		if (stdout) outro(stdout)
	} catch (error) {
		logger.error(error)
	}
}

const getBranchMenuInCli = async () => {
	const branches = (await gitGetLocalBranches()).split('\n').map(branch => {
		return branch.split('/')[1]
	})
	logger.info(JSON.stringify(branches))
	return await customCliSelect(branches)
}
