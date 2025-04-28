/**
 * Error handling middleware for the HTTP server.
 * Provides consistent error response formatting, sets appropriate HTTP status codes,
 * and logs error details.
 * 
 * @module error-middleware
 */

import { error as logError } from '../utils/logger';

/**
 * Express-style middleware function that handles errors during request processing.
 * It logs the error, sets the appropriate status code, and returns a consistent
 * error response to the client.
 * 
 * @param {Error} err - The error object thrown during request processing
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @param {Function} next - The next middleware function in the pipeline
 * @returns {void} No return value, but sends error response to client
 */
const errorMiddleware = (err, req, res, next) => {
  // Log the error with details
  logError(`Error processing request ${req.method} ${req.url}`, err);
  
  // Determine the appropriate HTTP status code
  // Use err.status or err.statusCode if available, otherwise default to 500
  const statusCode = err.status || err.statusCode || 500;
  
  // Set the response status code
  res.statusCode = statusCode;
  
  // Set the Content-Type header to text/plain
  res.setHeader('Content-Type', 'text/plain');
  
  // Determine the error message
  // Use err.message if available, otherwise default to 'Internal Server Error'
  const errorMessage = err.message || 'Internal Server Error';
  
  // Send the error message as the response body and end the response
  res.end(errorMessage);
};

// Export the error middleware function as the default export
export default errorMiddleware;