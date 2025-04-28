/**
 * Prettier configuration for the Node.js Hello World server application
 * This file defines the code formatting rules to ensure consistent style across the codebase.
 * Works alongside ESLint for comprehensive code quality enforcement.
 * 
 * @version 1.0.0
 */

module.exports = {
  // Use single quotes instead of double quotes
  singleQuote: true,
  
  // Add trailing commas wherever possible for cleaner git diffs
  trailingComma: 'all',
  
  // Line length that Prettier will wrap on
  printWidth: 100,
  
  // Number of spaces per indentation level
  tabWidth: 2,
  
  // Add semicolons at the end of statements
  semi: true,
  
  // Print spaces between brackets in object literals
  bracketSpacing: true,
  
  // Avoid wrapping single parameter arrow function parameters in parentheses
  arrowParens: 'avoid',
  
  // Line Feed only line endings
  endOfLine: 'lf',
};