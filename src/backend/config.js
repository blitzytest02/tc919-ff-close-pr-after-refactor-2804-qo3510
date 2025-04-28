/**
 * Configuration module for managing server settings.
 * Loads and validates configuration from environment variables.
 * 
 * @module config
 */

import logger from './utils/logger';

// Default configuration values
const DEFAULT_PORT = 3000;
const MIN_PORT = 1024;
const MAX_PORT = 65535;

// Module state to store validated configuration
let config = {
  port: DEFAULT_PORT
};

/**
 * Loads raw configuration values from environment variables
 * @returns {Object} Object containing raw configuration values
 */
function loadFromEnvironment() {
  const environmentConfig = {};
  
  if (process.env.PORT) {
    environmentConfig.port = process.env.PORT;
  }
  
  return environmentConfig;
}

/**
 * Validates that a port number is within the allowed range (1024-65535)
 * @param {any} portValue - The port value to validate
 * @returns {number} Valid port number or default port (3000)
 */
function validatePort(portValue) {
  const port = parseInt(portValue, 10);
  
  if (isNaN(port)) {
    logger.warn(`Invalid port value: "${portValue}". Using default port ${DEFAULT_PORT}.`);
    return DEFAULT_PORT;
  }
  
  if (port < MIN_PORT || port > MAX_PORT) {
    logger.warn(`Port ${port} is outside allowed range (${MIN_PORT}-${MAX_PORT}). Using default port ${DEFAULT_PORT}.`);
    return DEFAULT_PORT;
  }
  
  return port;
}

/**
 * Loads configuration from environment variables and applies validation
 * @returns {void}
 */
function load() {
  const envConfig = loadFromEnvironment();
  
  // Validate and store port configuration
  config.port = validatePort(envConfig.port || DEFAULT_PORT);
  
  logger.info(`Configuration loaded: Server port set to ${config.port}`);
}

/**
 * Returns the configured port number
 * @returns {number} The validated port number (default: 3000)
 */
function getPort() {
  return config.port;
}

// Export named functions
export { load, getPort };

// Default export containing all configuration functions
export default {
  load,
  getPort
};