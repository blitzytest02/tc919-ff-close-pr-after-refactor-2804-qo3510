/**
 * Unit tests for the server module.
 * These tests validate server creation, startup, shutdown, and error handling functionality.
 */

import { createServer, startServer, stopServer, initializeServer as setupServer } from '../server';
import config from '../config';
import routes from '../routes';
import errorHandler from '../error-handler';
import logger from '../utils/logger';
import http from 'http';

// Mock all dependencies
jest.mock('../config');
jest.mock('../routes');
jest.mock('../error-handler');
jest.mock('../utils/logger');
jest.mock('http');

describe('Server Module', () => {
  let mockServer;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Set up mock server
    mockServer = {
      listen: jest.fn((port, callback) => {
        if (callback) callback();
        return mockServer;
      }),
      on: jest.fn((event, callback) => {
        return mockServer;
      }),
      close: jest.fn((callback) => {
        if (callback) callback();
        return mockServer;
      }),
      listening: true
    };
    
    // Mock createServer to return our mock server
    http.createServer.mockReturnValue(mockServer);
    
    // Mock config.getPort
    config.getPort.mockReturnValue(3000);
  });
  
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });
  
  test('should create an HTTP server with routes.handleRequest as request handler', () => {
    const server = createServer();
    
    expect(http.createServer).toHaveBeenCalledWith(routes.handleRequest);
    expect(server).toBe(mockServer);
    expect(logger.info).toHaveBeenCalledWith('Creating HTTP server instance');
  });
  
  test('should start the server on the configured port', async () => {
    await startServer(mockServer);
    
    expect(config.getPort).toHaveBeenCalled();
    expect(mockServer.listen).toHaveBeenCalledWith(3000, expect.any(Function));
    expect(mockServer.on).toHaveBeenCalledWith('error', expect.any(Function));
    expect(logger.info).toHaveBeenCalledWith('Server started and listening on port 3000');
  });
  
  test('should handle server startup errors', async () => {
    const testError = new Error('Test error');
    
    // Setup the error handler to simulate an error
    mockServer.on.mockImplementation((event, callback) => {
      if (event === 'error') {
        callback(testError);
      }
      return mockServer;
    });
    
    await expect(startServer(mockServer)).rejects.toThrow('Test error');
    expect(errorHandler.handleServerError).toHaveBeenCalledWith(testError);
  });
  
  test('should stop the server gracefully', async () => {
    await stopServer(mockServer);
    
    expect(mockServer.close).toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Shutting down server gracefully');
    expect(logger.info).toHaveBeenCalledWith('Server shutdown complete');
  });
  
  test('should handle server not listening', async () => {
    mockServer.listening = false;
    
    await stopServer(mockServer);
    
    expect(mockServer.close).not.toHaveBeenCalled();
    expect(logger.info).toHaveBeenCalledWith('Server is not running, nothing to stop');
  });
  
  test('should handle errors during server shutdown', async () => {
    const testError = new Error('Test close error');
    
    mockServer.close.mockImplementation((callback) => {
      if (callback) callback(testError);
      return mockServer;
    });
    
    await expect(stopServer(mockServer)).rejects.toThrow('Test close error');
    expect(logger.error).toHaveBeenCalledWith('Error occurred while closing server', testError);
  });
  
  test('should set up and start the complete server', async () => {
    const server = await setupServer();
    
    expect(config.load).toHaveBeenCalled();
    expect(routes.setupRoutes).toHaveBeenCalledWith(mockServer);
    expect(errorHandler.setupUncaughtExceptionHandler).toHaveBeenCalledWith(mockServer);
    expect(server).toBe(mockServer);
  });
});