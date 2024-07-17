import globals from 'globals';
import pluginJs from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser,
        module: 'readonly', // module 전역 변수 추가
      },
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 12,
        sourceType: 'module',
      },
    },
    plugins: {
      react: pluginReact,
      prettier: prettierPlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['*.ts', '*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    files: ['*.js', '*.jsx'],
    rules: {
      ...pluginJs.configs.recommended.rules,
    },
  },
  {
    files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    rules: {
      ...prettierConfig.rules,
    },
  },
];
