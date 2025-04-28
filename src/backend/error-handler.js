/**
 * Central error handling module for the application.
 * Provides functions for handling different types of errors including
 * server startup errors, request processing errors, and uncaught exceptions.
 * 
 * @module error-handler
 */

import logger from './utils/logger';

/**
 * Handles errors that occur during server startup or operation
 * @param {Error} error - The error that occurred
 * @returns {void} - No return value, but may exit the process
 */
export const handleServerError = (error) => {
  logger.error('Server error occurred', error);
  
  // Check if the error is related to port binding
  if (error.code === 'EADDRINUSE' || error.code === 'EACCES') {
    logger.error('The port is already in use or requires elevated permissions. Please choose a different port or free up the current one.');
  }
  
  // Exit the process with error code 1 to indicate failure
  process.exit(1);
};

/**
 * Handles 404 Not Found errors for undefined routes
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @returns {void} - No return value, but sends error response to client
 */
export const handleRouteNotFound = (req, res) => {
  // Set response status and headers
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not Found');
  
  // Log the 404 error
  logger.error(`Route not found: ${req.method} ${req.url}`);
};

/**
 * Handles 405 Method Not Allowed errors for unsupported HTTP methods
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @returns {void} - No return value, but sends error response to client
 */
export const handleMethodNotAllowed = (req, res) => {
  // Set response status and headers
  res.statusCode = 405;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Method Not Allowed');
  
  // Log the 405 error
  logger.error(`Method not allowed: ${req.method} ${req.url}`);
};

/**
 * Handles uncaught exceptions in the application
 * @param {Error} error - The uncaught exception
 * @returns {void} - No return value, but exits the process
 */
export const handleUncaughtException = (error) => {
  logger.error('Uncaught exception detected', error);
  logger.info('Server is shutting down due to an uncaught exception');
  
  // Exit the process with error code 1 to indicate failure
  process.exit(1);
};

/**
 * Sets up a global handler for uncaught exceptions and unhandled promise rejections
 * @param {import('http').Server} server - The HTTP server instance
 * @returns {void} - No return value
 */
export const setupUncaughtExceptionHandler = (server) => {
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    handleUncaughtException(error);
  });
  
  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled promise rejection detected', reason);
    handleUncaughtException(reason instanceof Error ? reason : new Error('Unhandled Promise rejection'));
  });
};

// Default export containing all error handling functions
export default {
  handleServerError,
  handleRouteNotFound,
  handleMethodNotAllowed,
  handleUncaughtException,
  setupUncaughtExceptionHandler
};