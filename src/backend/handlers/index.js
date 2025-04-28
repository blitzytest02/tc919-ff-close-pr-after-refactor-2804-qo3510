/**
 * Index module that exports all request handlers for the Node.js HTTP server application.
 * This file centralizes the import and export of handler functions to simplify their usage 
 * in the routing configuration.
 * 
 * @module handlers/index
 */

import helloHandler from './hello-handler';
import notFoundHandler from './not-found-handler';

/**
 * Collection of all handler functions used by the application
 */
const handlers = {
  /**
   * Handler for the /hello endpoint that returns 'Hello world' for GET requests
   */
  helloHandler,
  
  /**
   * Handler for undefined routes that returns 404 Not Found responses
   */
  notFoundHandler
};

// Named exports for individual handlers
export { helloHandler, notFoundHandler };

// Default export containing all handlers for convenient destructuring
export default handlers;