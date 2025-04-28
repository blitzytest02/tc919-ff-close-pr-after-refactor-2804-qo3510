/**
 * Routes module that defines and manages the application's HTTP routes.
 * It provides functions for setting up routes, handling incoming HTTP requests,
 * and directing them to the appropriate handler functions based on the URL path.
 * 
 * @module routes
 */

import { parse } from 'url'; // Node.js core module
import { info, request } from './utils/logger';
import handlers from './handlers';
import errorHandler from './error-handler';
import middlewares from './middlewares';

// Map to store route definitions
const routes = new Map();

/**
 * Sets up the application routes and registers them with the server
 * @param {import('http').Server} server - The HTTP server instance
 * @returns {void}
 */
export const setupRoutes = (server) => {
  info('Setting up application routes');
  
  // Register the /hello endpoint with the helloHandler
  routes.set('/hello', handlers.helloHandler);
  
  info('Routes setup complete');
};

/**
 * Matches a request path to a registered route handler
 * @param {string} path - The URL path from the request
 * @returns {Function|null} The handler function for the matched route or null if no match
 */
const matchRoute = (path) => {
  // Normalize the path by removing trailing slashes
  const normalizedPath = path.endsWith('/') && path !== '/' 
    ? path.slice(0, -1) 
    : path;
  
  // Return the handler for the path, or null if not found
  return routes.get(normalizedPath) || null;
};

/**
 * Handles incoming HTTP requests by routing them to the appropriate handler
 * based on the URL path
 * @param {import('http').IncomingMessage} req - The HTTP request object
 * @param {import('http').ServerResponse} res - The HTTP response object
 * @returns {void}
 */
export const handleRequest = (req, res) => {
  try {
    // Parse the URL from the request
    const parsedUrl = parse(req.url || '', true);
    const { pathname } = parsedUrl;
    
    // Log the incoming request
    request(req);
    
    // Find a handler for the requested path
    const handler = matchRoute(pathname);
    
    if (handler) {
      // If a handler is found, call it with the request and response objects
      handler(req, res);
    } else {
      // If no handler is found, use the notFoundHandler
      handlers.notFoundHandler(req, res);
    }
  } catch (err) {
    // If an error occurs during request processing, handle it with the error middleware
    middlewares.errorMiddleware(err, req, res, null);
  }
};

// Default export containing all routing functions
export default {
  setupRoutes,
  handleRequest
};