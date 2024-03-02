const types = [
	{ value: 'build', label: 'Build' },
	{ value: 'chore', label: 'Chore' },
	{ value: 'ci', label: 'CI' },
	{ value: 'docs', label: 'Docs' },
	{ value: 'feat', label: 'Feat' },
	{ value: 'fix', label: 'Fix' },
	{ value: 'refactor', label: 'Refactor' },
	{ value: 'style', label: 'Style' },
	{ value: 'test', label: 'Test' },
	{ value: 'security', label: 'Security' },
]

export const emojis = {
	build: '🔨',
	chore: '🔧',
	ci: '🔬',
	docs: '📝',
	feat: '✨',
	fix: '🐞',
	refactor: '🔨',
	style: '💅',
	test: '🔬',
	security: '🔒',
}

export const commitTypes = types.map(commitType => {
	return commitType.value
})
export const commitTypesWithEmoji = types.map(commitType => {
	return `${emojis[commitType.value as keyof typeof emojis]} ${commitType.value}`
})

export const commitTypesWithDesc = () =>
	types.map(commitType => {
		return `\n	- For example , if this is the commit type ${commitType?.label?.toLowerCase()} then use this emoji ${emojis[commitType.value as keyof typeof emojis]}.\n`
	})
