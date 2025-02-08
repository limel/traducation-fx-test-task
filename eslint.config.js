import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

const eslintConfig = [
  ...compat.extends('eslint:recommended', 'plugin:react/recommended', 'plugin:prettier/recommended'),
  {
    plugins: {
      prettier,
      import: importPlugin,
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    ignores: ['**/node_modules', '**/node_modules/', 'public/', 'node_modules', 'node_modules/', 'tsconfig.json'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module'
    },

    settings: {
      react: {
        version: 'detect'
      }
    },
    files: ['**/*.ts', '**/*.tsx', 'src/**/*.ts', 'src/**/*.tsx'],
    rules: {
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index'], 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before'
            },
            {
              pattern: '{*,@nextui-org/*,next/*,react-responsive}',
              group: 'external',
              position: 'after'
            },
            {
              pattern: 'components/**',
              group: 'internal',
              position: 'after'
            },
            {
              pattern: '{*.d.ts,**/*.d.ts}',
              group: 'type',
              position: 'after'
            }
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true }
        }
      ],
      'function-paren-newline': ['off'],
      'prettier/prettier': [
        'error',
        {
          useTabs: false,
          singleQuote: true,
          semi: false,
          tabWidth: 2,
          printWidth: 120,
          trailingComma: 'none',
          htmlWhitespaceSensitivity: 'strict',
          bracketSameLine: true,
          jsxSingleQuote: false,
          jsxBracketSameLine: false,
          bracketSpacing: true,
          arrowParens: 'always'
        }
      ],
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['warn'],
      'no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/strict-boolean-expressions': 'off',
      '@typescript-eslint/consistent-type-imports': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off'
    }
  }
]

export default eslintConfig
