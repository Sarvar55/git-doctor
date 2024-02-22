import { translateCommit } from './utils/translate-commit'

async function de() {
	const commit = await translateCommit('yeni bir dosya eklendi')
	console.log(commit)
}

de()
