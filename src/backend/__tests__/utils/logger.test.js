/**
 * Unit tests for the logger utility module
 * @jest-environment node
 */

import logger from '../../../utils/logger';

describe('Logger utility', () => {
  // Store original console methods and environment variables
  let originalConsoleLog;
  let originalConsoleError;
  let originalConsoleWarn;
  let originalConsoleDebug;
  let originalNodeEnv;

  beforeEach(() => {
    // Store original methods and environment variables before each test
    originalConsoleLog = console.log;
    originalConsoleError = console.error;
    originalConsoleWarn = console.warn;
    originalConsoleDebug = console.debug;
    originalNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    // Restore original methods and environment variables after each test
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
    console.warn = originalConsoleWarn;
    console.debug = originalConsoleDebug;
    process.env.NODE_ENV = originalNodeEnv;
  });

  test('info method should log messages with correct format', () => {
    // Mock console.log
    const mockLog = jest.spyOn(console, 'log').mockImplementation();

    // Test the info method
    const testMessage = 'This is an info message';
    logger.info(testMessage);

    // Verify console.log was called with correct format
    expect(mockLog).toHaveBeenCalledTimes(1);
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('INFO: ' + testMessage));
    expect(mockLog).toHaveBeenCalledWith(expect.stringMatching(/\[.*\] INFO: This is an info message/));

    // Clean up
    mockLog.mockRestore();
  });

  test('error method should log error messages with correct format', () => {
    // Mock console.error
    const mockError = jest.spyOn(console, 'error').mockImplementation();

    // Test the error method
    const testMessage = 'This is an error message';
    logger.error(testMessage);

    // Verify console.error was called with correct format
    expect(mockError).toHaveBeenCalledTimes(1);
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('ERROR: ' + testMessage));
    expect(mockError).toHaveBeenCalledWith(expect.stringMatching(/\[.*\] ERROR: This is an error message/));

    // Clean up
    mockError.mockRestore();
  });

  test('error method should log error object with stack trace', () => {
    // Mock console.error
    const mockError = jest.spyOn(console, 'error').mockImplementation();

    // Create an error object
    const testMessage = 'This is an error message';
    const errorObj = new Error('Test error');
    
    // Test the error method with error object
    logger.error(testMessage, errorObj);

    // Verify console.error was called twice (once for the message, once for the stack)
    expect(mockError).toHaveBeenCalledTimes(2);
    expect(mockError).toHaveBeenCalledWith(expect.stringContaining('ERROR: ' + testMessage));
    expect(mockError).toHaveBeenCalledWith(errorObj.stack);

    // Clean up
    mockError.mockRestore();
  });

  test('warn method should log warning messages with correct format', () => {
    // Mock console.warn
    const mockWarn = jest.spyOn(console, 'warn').mockImplementation();

    // Test the warn method
    const testMessage = 'This is a warning message';
    logger.warn(testMessage);

    // Verify console.warn was called with correct format
    expect(mockWarn).toHaveBeenCalledTimes(1);
    expect(mockWarn).toHaveBeenCalledWith(expect.stringContaining('WARNING: ' + testMessage));
    expect(mockWarn).toHaveBeenCalledWith(expect.stringMatching(/\[.*\] WARNING: This is a warning message/));

    // Clean up
    mockWarn.mockRestore();
  });

  test('debug method should log debug messages in development environment', () => {
    // Set NODE_ENV to development
    process.env.NODE_ENV = 'development';
    
    // Mock console.debug
    const mockDebug = jest.spyOn(console, 'debug').mockImplementation();

    // Test the debug method
    const testMessage = 'This is a debug message';
    logger.debug(testMessage);

    // Verify console.debug was called with correct format
    expect(mockDebug).toHaveBeenCalledTimes(1);
    expect(mockDebug).toHaveBeenCalledWith(expect.stringContaining('DEBUG: ' + testMessage));
    expect(mockDebug).toHaveBeenCalledWith(expect.stringMatching(/\[.*\] DEBUG: This is a debug message/));

    // Clean up
    mockDebug.mockRestore();
  });

  test('debug method should not log in production environment', () => {
    // Set NODE_ENV to production
    process.env.NODE_ENV = 'production';
    
    // Mock console.debug
    const mockDebug = jest.spyOn(console, 'debug').mockImplementation();

    // Test the debug method
    const testMessage = 'This is a debug message';
    logger.debug(testMessage);

    // Verify console.debug was not called
    expect(mockDebug).not.toHaveBeenCalled();

    // Clean up
    mockDebug.mockRestore();
  });

  test('request method should log HTTP request information correctly', () => {
    // Mock console.log
    const mockLog = jest.spyOn(console, 'log').mockImplementation();

    // Create mock request object
    const mockReq = {
      method: 'GET',
      url: '/hello'
    };
    
    // Test the request method
    logger.request(mockReq);

    // Verify console.log was called with correct format
    expect(mockLog).toHaveBeenCalledTimes(1);
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('REQUEST: GET /hello'));
    expect(mockLog).toHaveBeenCalledWith(expect.stringMatching(/\[.*\] REQUEST: GET \/hello/));

    // Clean up
    mockLog.mockRestore();
  });

  test('response method should log HTTP response information correctly', () => {
    // Mock console.log
    const mockLog = jest.spyOn(console, 'log').mockImplementation();

    // Create mock request and response objects
    const mockReq = {
      method: 'GET',
      url: '/hello'
    };
    const mockRes = {
      statusCode: 200
    };
    const responseTime = 42; // ms
    
    // Test the response method
    logger.response(mockReq, mockRes, responseTime);

    // Verify console.log was called with correct format
    expect(mockLog).toHaveBeenCalledTimes(1);
    expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('RESPONSE: GET /hello 200 42ms'));
    expect(mockLog).toHaveBeenCalledWith(expect.stringMatching(/\[.*\] RESPONSE: GET \/hello 200 42ms/));

    // Clean up
    mockLog.mockRestore();
  });
});