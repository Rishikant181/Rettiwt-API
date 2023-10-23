module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc'],
	extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/naming-convention': [
			'warn',
			{
				selector: ['class'],
				format: ['PascalCase'],
			},
			{
				selector: 'interface',
				format: ['PascalCase'],
				prefix: ['I'],
			},
			{
				selector: 'enum',
				format: ['PascalCase'],
				prefix: ['E'],
			},
			{
				selector: ['variableLike', 'memberLike'],
				format: ['camelCase'],
			},
			{
				selector: 'enumMember',
				format: ['UPPER_CASE'],
			},
		],
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-extraneous-class': [
			'warn',
			{
				allowEmpty: true,
			},
		],
		'@typescript-eslint/no-inferrable-types': 'off',
		'tsdoc/syntax': 'warn',
	},
};
