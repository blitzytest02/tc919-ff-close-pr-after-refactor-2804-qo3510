/**
 * Handler function for undefined routes that returns a 404 Not Found response.
 * Implements error handling for requests to paths that don't match any defined routes.
 * 
 * @module not-found-handler
 */

import logger from '../utils/logger';

/**
 * Handles HTTP requests to undefined routes, returning a 404 Not Found response.
 * Logs the request and response for monitoring purposes.
 * 
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @returns {void} No return value, but sends HTTP response to client
 */
const notFoundHandler = (req, res) => {
  // Log the incoming request
  logger.request(req);
  
  // Calculate start time for response timing
  const startTime = Date.now();
  
  // Set status code to 404 (Not Found)
  res.statusCode = 404;
  
  // Set Content-Type header to 'text/plain'
  res.setHeader('Content-Type', 'text/plain');
  
  // Send 'Not Found' as the response body and end the response
  res.end('Not Found');
  
  // Calculate response time in milliseconds
  const responseTime = Date.now() - startTime;
  
  // Log the response with timing information
  logger.response(req, res, responseTime);
};

export default notFoundHandler;