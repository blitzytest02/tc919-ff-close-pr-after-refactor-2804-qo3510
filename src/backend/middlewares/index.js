/**
 * Middleware index module.
 * 
 * This module centralizes all middleware functions used in the application's
 * request processing pipeline, providing a single import point for middleware
 * integration. It simplifies importing and applying middleware functions
 * across the application.
 * 
 * @module middlewares
 */

// Import middleware functions
import errorMiddleware from './error-middleware';

// Re-export middleware functions individually for selective importing
export { errorMiddleware };

// Default export containing all middleware functions
export default {
  errorMiddleware
};