module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-tsdoc', 'import'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:import/recommended',
		'plugin:import/typescript',
	],
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
				selector: ['variableLike', 'memberLike'],
				modifiers: ['static', 'readonly'],
				format: ['UPPER_CASE'],
			},
			{
				selector: 'enumMember',
				format: ['UPPER_CASE'],
			},
		],
		'@typescript-eslint/explicit-function-return-type': 'error',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/member-ordering': [
			'warn',
			{
				default: {
					memberTypes: [
						// FIELDS

						// PRIVATE
						'private-static-readonly-field',
						'private-static-field',
						'private-readonly-field',
						'private-field',

						// PROTECTED
						'protected-static-readonly-field',
						'protected-static-field',
						'protected-readonly-field',
						'protected-field',

						// PUBLIC
						'public-static-readonly-field',
						'public-static-field',
						'public-readonly-field',
						'public-field',

						// CONSTRUCTORS
						'private-constructor',
						'protected-constructor',
						'public-constructor',

						// METHODS

						// PRIVATE
						'private-static-method',
						'private-method',

						// PROTECTED
						'protected-static-method',
						'protected-method',

						// PUBLIC
						'public-static-method',
						'public-method',
					],
					order: 'alphabetically',
				},
			},
		],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/no-inferrable-types': 'off',
		'tsdoc/syntax': 'warn',
		'sort-imports': [
			'warn',
			{
				ignoreCase: true,
				ignoreDeclarationSort: true,
				ignoreMemberSort: false,
				memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
				allowSeparatedGroups: false,
			},
		],
		'import/order': [
			'warn',
			{
				groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always-and-inside-groups',
			},
		],
	},
};
