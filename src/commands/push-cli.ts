import { isCancel } from 'axios'
import { customCliSelect, isConfirm } from '../utils/commons'
import { gitGetLocalBranches, gitGetRemoteUrl, gitPush } from '../utils/git'
import { outro, spinner } from '@clack/prompts'
import chalk from 'chalk'
import { logger } from '../utils/logger'

export const push = async () => {
	const isPushConfirmed = await isConfirm('Do you want to run `git push`🚀?')

	if (!isPushConfirmed && !isCancel(isPushConfirmed)) process.exit(1)

	const shouldPushToBranch = await isConfirm(
		'Is there a branch you want to `push specifically`?'
	)

	try {
		let selectedBranch: string = ''
		if (shouldPushToBranch && !isCancel(shouldPushToBranch)) {
			const branches = (await gitGetLocalBranches())
				.split('\n')
				.map(branch => {
					return branch.split('/')[1]
				})
			logger.info(JSON.stringify(branches))
			selectedBranch = await customCliSelect(branches)
		}
		if (isPushConfirmed && !isCancel(isPushConfirmed)) {
			const pushProgress = spinner()

			pushProgress.start('⏰ Push operation is taking place')

			logger.info(selectedBranch)
			const origin = await gitGetRemoteUrl()
			const stdout = await gitPush(origin, selectedBranch)

			pushProgress.stop(
				`${chalk.green('✔')} successfully pushed all commits to ${origin}`
			)

			if (stdout) outro(stdout)
		} else {
			outro(`${chalk.red('✖')} push  canceled`)
		}
	} catch (error) {
		logger.error(`✖ push error: ${error}`)
		process.exit(1)
	}
}
