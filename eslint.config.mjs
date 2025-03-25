import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import globals from 'globals'
import pluginJs from '@eslint/js'
import tsEslint from 'typescript-eslint'

const globalsConfig = {
  ...globals.node,
  ...globals.browser,
  ...globals.jest,
  ...globals.es2021
}

const rules = {
  'space-before-function-parent': 0,
  'no-empty': 'off',
  'comma-dangle': ['error', 'only-multiline'],
  'no-throw-literal': 'error',
  '@typescript-eslint/semi': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  '@typescript-eslint/no-extraneous-class': 'off',
  '@typescript-eslint/method-signature-style': ['error', 'method'],
  '@typescript-eslint/consistent-type-imports': 'off',
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-var-requires': 'off',
  '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
  '@typescript-eslint/ban-ts-comment': 1,
  'promise/catch-or-return': 'off',
  'promise/no-callback-in-promise': 'off',
  'promise/always-return': 'off',
  '@typescript-eslint/no-require-imports': 'off',
  '@typescript-eslint/no-empty-object-type': 'off'
  // TODO: enable
}

export default [
  { languageOptions: { globals: globalsConfig } },
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintPluginPrettierRecommended,
  { rules },
  {
    ignores: [
      'node_modules',
      'dist/**/*',
      '**/__mocks__/**/*',
      '**/coverage/**/*',
      '.eslintrc.js',
      'commitlint.config.js',
      'jest.config.ts',
      '.lintstagedrc'
    ],
    settings: {
      typescript: {},
      'import/resolver': {
        typescript: {
          typescript: {
            project: './tsconfig.json'
          }
        }
      }
    }
  }
]
