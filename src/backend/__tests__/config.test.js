/**
 * Unit tests for the configuration module.
 * Tests loading of environment variables, port validation, and default value application.
 * 
 * @jest-environment node
 */

import config from '../config';
import logger from '../utils/logger';

// Mock the logger module to prevent console output and verify calls
jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  debug: jest.fn(),
  request: jest.fn(),
  response: jest.fn()
}));

describe('Configuration Module', () => {
  // Store original environment variables
  const originalEnv = { ...process.env };
  
  beforeEach(() => {
    // Reset logger mock calls before each test
    jest.clearAllMocks();
  });
  
  afterEach(() => {
    // Restore original environment variables after each test
    process.env = { ...originalEnv };
    
    // Reset any modules that have been cached
    jest.resetModules();
  });
  
  test('should load default port when PORT is not set', () => {
    // Ensure PORT is not set
    delete process.env.PORT;
    
    // Load configuration
    config.load();
    
    // Verify port is set to default (3000)
    expect(config.getPort()).toBe(3000);
    
    // Verify logger.info was called
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Server port set to 3000'));
  });
  
  test('should use PORT from environment when valid', () => {
    // Set valid PORT
    process.env.PORT = '4000';
    
    // Load configuration
    config.load();
    
    // Verify port is set to environment value
    expect(config.getPort()).toBe(4000);
    
    // Verify logger.info was called
    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining('Server port set to 4000'));
  });
  
  test('should use default port when PORT is invalid', () => {
    // Set invalid PORT (non-numeric)
    process.env.PORT = 'abc';
    
    // Load configuration
    config.load();
    
    // Verify port is set to default (3000)
    expect(config.getPort()).toBe(3000);
    
    // Verify logger.warn was called
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Invalid port value'));
  });
  
  test('should validate port number is within allowed range', () => {
    // Test below minimum allowed port
    process.env.PORT = '1023';
    config.load();
    expect(config.getPort()).toBe(3000);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('outside allowed range'));
    
    // Reset mock calls
    jest.clearAllMocks();
    
    // Test minimum allowed port
    process.env.PORT = '1024';
    config.load();
    expect(config.getPort()).toBe(1024);
    expect(logger.warn).not.toHaveBeenCalled();
    
    // Reset mock calls
    jest.clearAllMocks();
    
    // Test maximum allowed port
    process.env.PORT = '65535';
    config.load();
    expect(config.getPort()).toBe(65535);
    expect(logger.warn).not.toHaveBeenCalled();
    
    // Reset mock calls
    jest.clearAllMocks();
    
    // Test above maximum allowed port
    process.env.PORT = '65536';
    config.load();
    expect(config.getPort()).toBe(3000);
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('outside allowed range'));
  });
});