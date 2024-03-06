import { Command } from 'commander'
import { manuelCommit } from '../commands/commit'

export const program = new Command()
	.version('0.0.1')
	.name('git-doctor')
	.description(
		'GitDoctor, a TypeScript-powered command-line marvel, revolutionizes your Git experience with a range of unique features tailored for efficient version control.'
	)

program
	.option('--sclang, --sl <string>', 'determine source language')
	.description('Translate için hangi dili kullanıcağını belli ediyor')
	.action((sclang, options) => {})
program.option('--commit,--cm', 'Manuel commit').action(async () => {
	await manuelCommit()
})

program.parse()
