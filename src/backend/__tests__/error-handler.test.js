/**
 * Unit tests for the error-handler module.
 * Tests error handling functionality including server error handling,
 * uncaught exception handling, and process-level exception handler setup.
 */

import errorHandler from '../error-handler';
import logger from '../utils/logger';

const { 
  handleServerError, 
  handleUncaughtException, 
  setupUncaughtExceptionHandler 
} = errorHandler;

describe('Error Handler', () => {
  // Mock dependencies
  let mockServer;
  
  beforeEach(() => {
    // Mock logger.error
    jest.spyOn(logger, 'error').mockImplementation(() => {});
    // Mock logger.info
    jest.spyOn(logger, 'info').mockImplementation(() => {});
    // Mock process.exit
    jest.spyOn(process, 'exit').mockImplementation(() => {});
    // Create a mock server object for testing
    mockServer = {
      close: jest.fn(() => Promise.resolve())
    };
    // Mock process.on
    jest.spyOn(process, 'on').mockImplementation(() => process);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should log error and exit process with code 1', () => {
    const testError = new Error('Test server error');
    handleServerError(testError);
    
    expect(logger.error).toHaveBeenCalledWith('Server error occurred', testError);
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test('should log specific message for EADDRINUSE errors', () => {
    const testError = new Error('Address in use');
    testError.code = 'EADDRINUSE';
    handleServerError(testError);
    
    expect(logger.error).toHaveBeenCalledWith('Server error occurred', testError);
    expect(logger.error).toHaveBeenCalledWith(
      'The port is already in use or requires elevated permissions. Please choose a different port or free up the current one.'
    );
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test('should log uncaught exception and exit process', () => {
    const testError = new Error('Uncaught exception');
    handleUncaughtException(testError);
    
    expect(logger.error).toHaveBeenCalledWith('Uncaught exception detected', testError);
    expect(logger.info).toHaveBeenCalledWith('Server is shutting down due to an uncaught exception');
    expect(process.exit).toHaveBeenCalledWith(1);
  });

  test('should register handlers for uncaught exceptions and unhandled rejections', () => {
    setupUncaughtExceptionHandler(mockServer);
    
    // Verify that process.on was called for both event types
    expect(process.on).toHaveBeenCalledTimes(2);
    expect(process.on.mock.calls[0][0]).toBe('uncaughtException');
    expect(process.on.mock.calls[1][0]).toBe('unhandledRejection');
  });
});