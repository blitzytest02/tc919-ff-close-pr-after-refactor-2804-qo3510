/**
 * Logger utility module for consistent logging throughout the application.
 * Provides methods for different log levels (info, error, warn, debug) and 
 * specialized logging for HTTP requests and responses.
 * 
 * @module logger
 */

/**
 * Generates a formatted timestamp string for log messages
 * @returns {string} Formatted timestamp in ISO format
 */
const getTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Logs an informational message to the console
 * @param {string} message - The message to log
 * @returns {void}
 */
export const info = (message) => {
  const timestamp = getTimestamp();
  console.log(`[${timestamp}] INFO: ${message}`);
};

/**
 * Logs an error message to the console
 * @param {string} message - The error message to log
 * @param {Error} [error] - Optional error object to log stack trace
 * @returns {void}
 */
export const error = (message, error) => {
  const timestamp = getTimestamp();
  console.error(`[${timestamp}] ERROR: ${message}`);
  if (error && error.stack) {
    console.error(error.stack);
  }
};

/**
 * Logs a warning message to the console
 * @param {string} message - The warning message to log
 * @returns {void}
 */
export const warn = (message) => {
  const timestamp = getTimestamp();
  console.warn(`[${timestamp}] WARNING: ${message}`);
};

/**
 * Logs a debug message to the console only in development environment
 * @param {string} message - The debug message to log
 * @returns {void}
 */
export const debug = (message) => {
  if (process.env.NODE_ENV === 'development') {
    const timestamp = getTimestamp();
    console.debug(`[${timestamp}] DEBUG: ${message}`);
  }
};

/**
 * Logs information about an incoming HTTP request
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @returns {void}
 */
export const request = (req) => {
  const timestamp = getTimestamp();
  const { method, url } = req;
  console.log(`[${timestamp}] REQUEST: ${method} ${url}`);
};

/**
 * Logs information about an outgoing HTTP response
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @param {number} responseTime - The time taken to process the request in ms
 * @returns {void}
 */
export const response = (req, res, responseTime) => {
  const timestamp = getTimestamp();
  const { method, url } = req;
  const statusCode = res.statusCode;
  console.log(`[${timestamp}] RESPONSE: ${method} ${url} ${statusCode} ${responseTime}ms`);
};

// Default export containing all logging functions
export default {
  info,
  error,
  warn,
  debug,
  request,
  response
};