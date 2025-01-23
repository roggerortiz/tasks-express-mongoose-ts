import js from '@eslint/js'
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettierConfig from 'eslint-config-prettier'

export default [
  {
    ignores: ['.vscode', 'build', 'node_modules'], // Archivos y carpetas ignorados
    files: ['src/**/*.{ts,js}'], // Archivos a lint
    languageOptions: {
      ecmaVersion: 'latest', // Versión de ECMAScript más reciente
      sourceType: 'module', // Módulos ES
      parser: tsParser // Parser para TypeScript
    },
    linterOptions: {
      reportUnusedDisableDirectives: true // Detecta directivas deshabilitadas no usadas
    },
    plugins: {
      '@typescript-eslint': tsEslint // Plugin para TypeScript
    },
    rules: {
      ...js.configs.recommended.rules, // Reglas recomendadas de JavaScript
      ...tsEslint.configs.recommended.rules, // Reglas recomendadas de TypeScript
      'no-undef': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  },
  prettierConfig // Configuración de Prettier añadida directamente
]
