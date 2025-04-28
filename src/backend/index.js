/**
 * Main entry point for the Node.js Hello World HTTP server application.
 * Initializes the server, sets up configuration, routes, and error handling,
 * and provides functions to start and stop the server.
 * 
 * @module index
 */

import server from './server';
import config from './config';
import logger from './utils/logger';

/**
 * Main function that initializes and starts the server.
 * This is the entry point for the application.
 * 
 * @returns {Promise<void>} Promise that resolves when the server has started successfully
 */
async function main() {
  try {
    logger.info('Starting Node.js Hello World HTTP server application');
    
    // Load configuration from environment variables
    config.load();
    
    // Create server instance
    const serverInstance = server.createServer();
    
    // Start the server
    await server.startServer(serverInstance);
    
    // Set up handlers for graceful shutdown
    setupShutdownHandlers(serverInstance);
    
    logger.info('Server initialization complete');
  } catch (error) {
    logger.error('Failed to start the application', error);
    process.exit(1);
  }
}

/**
 * Sets up handlers for process signals to enable graceful server shutdown
 * 
 * @param {http.Server} serverInstance - The HTTP server instance to shut down
 * @returns {void} No return value
 */
function setupShutdownHandlers(serverInstance) {
  // Handle SIGINT (Ctrl+C)
  process.on('SIGINT', async () => {
    logger.info('Received SIGINT signal, shutting down gracefully');
    await server.stopServer(serverInstance);
    logger.info('Graceful shutdown complete');
    process.exit(0);
  });
  
  // Handle SIGTERM (termination signal)
  process.on('SIGTERM', async () => {
    logger.info('Received SIGTERM signal, shutting down gracefully');
    await server.stopServer(serverInstance);
    logger.info('Graceful shutdown complete');
    process.exit(0);
  });
  
  logger.info('Shutdown handlers set up');
}

// Execute the main function
main().catch(error => {
  logger.error('Unhandled error in main function', error);
  process.exit(1);
});

// Export the main function as the default export
export default main;