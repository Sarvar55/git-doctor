import { outro } from '@clack/prompts'
import chalk from 'chalk'

export const logger = {
	info: (message: string) => outro(chalk.blue(message)),
	success: (message: string) => outro(chalk.green(message)),
	warining: (message: string) => outro(chalk.yellow(message)),
	error: (message: string) => outro(chalk.red(message)),
}
