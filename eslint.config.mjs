import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import sortPlugin from 'eslint-plugin-sort';
import storybookPlugin from 'eslint-plugin-storybook';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      '.storybook/**',
      'storybook-static/**',
      'coverage/**',
      'postcss.config.mjs',
      'out/**',
      'build/**',
    ],
  },

  ...nextVitals,
  ...nextTypescript,

  // Storybook ESLint config - add back when story files are created
  {
    files: ['**/*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
    plugins: {
      storybook: storybookPlugin,
    },
    rules: {
      'storybook/...': 'error',
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
    plugins: {
      '@typescript-eslint': typescriptEslint,
      sort: sortPlugin,
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      // Import/Export Sorting
      'sort/exports': [
        'error',
        {
          order: [
            { type: 'default', order: 'asc' },
            { type: 'named', order: 'asc' },
          ],
        },
      ],

      // TypeScript Rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      // Custom Consistency Rules
      'import/no-unused-modules': 'error',
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      'csstools/value-no-property-ignored': 'off',

      // NO BARREL EXPORTS
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportAllDeclaration',
          message:
            "Barrel exports (export * from '...') are forbidden. Import and export specifically to keep the dependency graph clean and optimize build performance.",
        },
      ],

      // PREVENT COMMITTING .ONLY
      'no-restricted-properties': [
        'error',
        {
          object: 'describe',
          property: 'only',
          message: 'describe.only should not be committed',
        },
        {
          object: 'it',
          property: 'only',
          message: 'it.only should not be committed',
        },
        {
          object: 'test',
          property: 'only',
          message: 'test.only should not be committed',
        },
        {
          object: 'context',
          property: 'only',
          message: 'context.only should not be committed',
        },
      ],
    },
  },
];

export default eslintConfig;
