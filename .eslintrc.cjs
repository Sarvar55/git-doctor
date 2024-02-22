/* eslint-env node */
module.exports = {
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	parserOptions: {
		project: './tsconfig.json',
		tsconfigRootDir: __dirname,
	},
	rules: {
		// Note: you must disable the base rule as it can report incorrect errors
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'warn',
		'@typescript-eslint/no-namespace': 'off',
	},
}
