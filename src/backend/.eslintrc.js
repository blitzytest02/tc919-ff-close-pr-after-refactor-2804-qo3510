/**
 * ESLint configuration file for Node.js Hello World server application
 * This configuration enforces consistent code style and best practices
 * Version: 1.0.0
 */

module.exports = {
  // Environment configuration
  env: {
    node: true,     // Node.js global variables
    es2022: true,   // Enable ES2022 features
    jest: true,     // Jest testing global variables
  },

  // Extend recommended ESLint rules
  extends: [
    'eslint:recommended',
  ],

  // Parser options
  parserOptions: {
    ecmaVersion: 2022,  // Use ECMAScript 2022 syntax
    sourceType: 'module', // Treat files as ES modules
  },

  // No additional plugins required
  plugins: [],

  // ESLint rules configuration
  rules: {
    // Formatting and style
    'indent': ['error', 2],  // 2 space indentation
    'linebreak-style': ['error', 'unix'],  // LF line endings
    'quotes': ['error', 'single', { 'avoidEscape': true }],  // Single quotes, allow escaping
    'semi': ['error', 'always'],  // Require semicolons
    'brace-style': ['error', '1tbs'],  // One true brace style
    'curly': ['error', 'all'],  // Always require curly braces
    'comma-dangle': ['error', 'always-multiline'],  // Trailing commas in multiline
    'max-len': ['warn', { 'code': 100, 'ignoreUrls': true, 'ignoreStrings': true }],  // Line length
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],  // Limit empty lines

    // Best practices
    'no-console': ['warn', { 'allow': ['error', 'warn', 'info'] }],  // Limit console usage
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],  // Prevent unused variables
    'no-var': 'error',  // Disallow var keyword
    'prefer-const': 'error',  // Prefer const over let when possible
    'eqeqeq': ['error', 'always'],  // Require strict equality operators
  },

  // Specific overrides for test files
  overrides: [
    {
      files: [
        '**/__tests__/**/*.js',
        '**/*.test.js',
      ],
      env: {
        jest: true,  // Enable Jest globals
      },
      rules: {
        'no-unused-expressions': 'off',  // Allow unused expressions in tests
      },
    },
  ],
};