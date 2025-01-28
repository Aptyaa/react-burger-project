import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import cypress from 'eslint-plugin-cypress';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default [
	{
		ignores: [
			'**/node_modules',
			'**/public',
			'**/.eslintrc.js',
			'**/storybook-static',
			'**/build',
			'**/dist',
			'webpack/*.js',
			'**/package*.json',
			'**/coverage',
			'**/cypress',
			'**/cypress.config.ts',
		],
	},
	...fixupConfigRules(
		compat.extends(
			'plugin:@typescript-eslint/recommended',
			'plugin:prettier/recommended',
			'prettier',
			'plugin:react/recommended',
			'plugin:react-hooks/recommended',
			'plugin:import/errors',
			'plugin:import/warnings',
			'plugin:import/typescript',
			'plugin:jsx-a11y/recommended',
			'plugin:eslint-comments/recommended',
			'plugin:cypress/recommended'
		)
	),
	{
		plugins: {
			cypress: fixupPluginRules(cypress),
		},

		languageOptions: {
			parser: tsParser,
			ecmaVersion: 2020,
			sourceType: 'module',
			parserOptions: {
				warnOnUnsupportedTypeScriptVersion: false,
			},
		},

		settings: {
			react: {
				version: 'detect',
			},
		},

		rules: {
			semi: [2, 'always'],

			quotes: [
				2,
				'single',
				{
					avoidEscape: true,
				},
			],

			'no-unused-vars': 'off',
			'import/namespace': 'off',
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/no-unused-expressions': 'off',
			'@typescript-eslint/no-empty-function': 'off',
			'@typescript-eslint/no-var-requires': 'off',
			'react/prop-types': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'jsx-a11y/click-events-have-key-events': 'off',
			'jsx-a11y/no-static-element-interactions': 'off',
			'@typescript-eslint/no-explicit-any': ['error'],
		},
	},
];
