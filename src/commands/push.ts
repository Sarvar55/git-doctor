import { customCliSelect, has, isConfirm } from '../utils/commons'
import {
	gitGetCurrentBranch,
	gitGetLocalBranches,
	gitGetRemoteUrl,
	gitPush,
} from '../utils/git'
import { outro, spinner, isCancel } from '@clack/prompts'
import chalk from 'chalk'
import { logger } from '../utils/logger'

export const push = async () => {
	const isPushConfirmed = await isConfirm('Do you want to run `git push`🚀?')

	if (!isPushConfirmed && !isCancel(isPushConfirmed)) {
		logger.warning('✖ push  canceled')
		process.exit(0)
	}

	const shouldPushToBranch = await isConfirm(
		'Is there a branch you want to `push specifically`?'
	)
	try {
		if (shouldPushToBranch && !isCancel(shouldPushToBranch)) {
			const selectedBranch = await getBranchMenuInCli()
			if (!isCancel(isPushConfirmed) && has(selectedBranch))
				await processPush(selectedBranch)
		} else {
			const currentBranch = await gitGetCurrentBranch()
			await processPush(currentBranch)
		}
	} catch (error) {
		logger.error(`✖ Push error: ${error}`)
		process.exit(1)
	}
}

const processPush = async (branch: string) => {
	const pushProgress = spinner()
	try {
		logger.info('branch:' + branch)
		pushProgress.start('⏰ Push operation is taking place')

		const origin = await gitGetRemoteUrl()
		await gitPush(origin, branch)

		pushProgress.stop(
			`${chalk.green('✔')} successfully pushed all commits to ${origin}`
		)
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
