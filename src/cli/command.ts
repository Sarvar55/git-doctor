import { Command } from 'commander'
import { GitManager } from '../git-manager'

const gitManager = new GitManager()

export const program = new Command()
	.version('0.0.1', '-v, --vers', 'current version')
	.name('git-doc')
	.description(
		'GitDoc, a TypeScript-powered CLI tool for streamlined Git workflows.'
	)

program
	.option('-s, --source-lang <string>', 'set source language')
	.option('-t, --target-lang <string>', 'set target language')
	.option('-a, --auto-trans', 'enable auto-translate')
	.option('-k, --api-key <string>', 'set API key')
	.action(options => {
		if (options.sourceLang) {
			console.log('')
		}

		if (options.targetLang) {
			console.log(`Target language set to: ${options.targetLang}`)
		}

		if (options.autoTrans) {
			// Burada otomatik çeviri özelliğini kullanabilirsin.
		}

		if (options.apiKey) {
			// Burada API anahtarını kullanabilirsin.
		}
	})

program
	.command('commit')
	.alias('cm')
	.description('Manual commit')
	.action(async () => {
		await gitManager.manualCommit()
	})
