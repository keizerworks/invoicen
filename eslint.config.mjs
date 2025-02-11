import globals from 'globals';
import jsPlugin from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
  },

  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parser: tsParser,
    },
  },

  jsPlugin.configs.recommended,
  ...tsPlugin.configs.recommended,
  prettierPlugin.configs.recommended,

  {
    rules: {
      'no-console': 'error',
    },
  },
];
