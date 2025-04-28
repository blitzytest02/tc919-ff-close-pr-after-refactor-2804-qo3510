/**
 * Handler for the /hello endpoint that returns 'Hello world' as a plain text response
 * Implements F-002: Hello Endpoint from the technical specifications
 * @module hello-handler
 */

import logger from '../utils/logger';

/**
 * Handles HTTP requests to the /hello endpoint, returning 'Hello world' for GET requests
 * and 405 Method Not Allowed for other methods
 * 
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @returns {void} No return value, but sends HTTP response to client
 */
const helloHandler = (req, res) => {
  // Log the incoming request
  logger.request(req);

  // Capture start time for response timing
  const startTime = Date.now();

  // Check if the request method is GET
  if (req.method === 'GET') {
    // Set status code to 200 (OK)
    res.statusCode = 200;
    // Set Content-Type header to 'text/plain'
    res.setHeader('Content-Type', 'text/plain');
    // Send 'Hello world' as the response body
    res.end('Hello world');
  } else {
    // Set status code to 405 (Method Not Allowed) for non-GET methods
    res.statusCode = 405;
    // Set Content-Type header to 'text/plain'
    res.setHeader('Content-Type', 'text/plain');
    // Send 'Method Not Allowed' as the response body
    res.end('Method Not Allowed');
  }

  // Calculate response time
  const responseTime = Date.now() - startTime;
  
  // Log the outgoing response
  logger.response(req, res, responseTime);
};

export default helloHandler;