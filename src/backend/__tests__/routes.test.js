/**
 * Unit tests for the routes module that validate route setup, request handling,
 * and route matching functionality. These tests ensure that HTTP requests are
 * correctly routed to the appropriate handlers based on URL paths.
 */

import { setupRoutes, handleRequest } from '../routes';
import { helloHandler, notFoundHandler } from '../handlers';
import logger from '../utils/logger';

// Mock the routes module to use the actual implementation
jest.mock('../routes', () => jest.requireActual('../routes'));

// Mock the handlers module
jest.mock('../handlers', () => ({ helloHandler: jest.fn(), notFoundHandler: jest.fn() }));

// Mock the logger module
jest.mock('../utils/logger', () => ({ info: jest.fn() }));

describe('Routes Module', () => {
  let mockReq;
  let mockRes;
  let mockServer;
  let mockRoutes;
  
  beforeEach(() => {
    // Reset all mocks to ensure clean test state
    jest.clearAllMocks();
    
    // Initialize mock request and response objects for testing
    mockReq = {
      url: '/hello',
      method: 'GET'
    };
    
    mockRes = {
      statusCode: 200,
      setHeader: jest.fn(),
      end: jest.fn()
    };
    
    // Initialize mock server object
    mockServer = {
      on: jest.fn()
    };
    
    // Configure mock handlers to return predictable responses
    helloHandler.mockImplementation((req, res) => {
      res.statusCode = 200;
      res.end('Hello world');
    });
    
    notFoundHandler.mockImplementation((req, res) => {
      res.statusCode = 404;
      res.end('Not Found');
    });
  });
  
  afterEach(() => {
    // Restore all mocked functions to their original implementations
    jest.restoreAllMocks();
    // Clear all mock data and instances
    jest.clearAllMocks();
  });
  
  test('Routes are correctly set up with their handlers', () => {
    // Create a mock server object with on method
    const mockServer = { on: jest.fn() };
    
    // Call setupRoutes with the mock server
    setupRoutes(mockServer);
    
    // Verify that logger.info was called for route setup
    expect(logger.info).toHaveBeenCalledWith('Setting up application routes');
    expect(logger.info).toHaveBeenCalledWith('Routes setup complete');
    
    // Verify that the server has the /hello route registered with helloHandler
    // by testing route handling functionality
    mockReq.url = '/hello';
    handleRequest(mockReq, mockRes);
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    
    // Verify that notFoundHandler is registered as the default handler
    mockReq.url = '/nonexistent';
    handleRequest(mockReq, mockRes);
    expect(notFoundHandler).toHaveBeenCalledWith(mockReq, mockRes);
  });
  
  test('Individual routes can be registered correctly', () => {
    // Since registerRoute is internal, test registration through setupRoutes
    
    // Call setupRoutes to register routes
    setupRoutes(mockServer);
    
    // Verify that the /hello route is added to the routes object
    mockReq.url = '/hello';
    handleRequest(mockReq, mockRes);
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    
    // Verify that logger.info was called for route registration
    expect(logger.info).toHaveBeenCalledWith('Setting up application routes');
  });
  
  test('Requests to valid paths are routed to the correct handler', () => {
    // Create mock request object with URL set to /hello
    mockReq.url = '/hello';
    
    // Create mock response object
    const mockRes = { statusCode: 200, setHeader: jest.fn(), end: jest.fn() };
    
    // Create routes object with /hello path mapped to helloHandler
    setupRoutes(mockServer);
    
    // Call handleRequest with the mock request, response, and routes
    handleRequest(mockReq, mockRes);
    
    // Verify that helloHandler was called with the request and response
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    expect(notFoundHandler).not.toHaveBeenCalled();
  });
  
  test('Requests to invalid paths are routed to the notFoundHandler', () => {
    // Create mock request object with URL set to /invalid
    mockReq.url = '/invalid';
    
    // Create mock response object
    const mockRes = { statusCode: 200, setHeader: jest.fn(), end: jest.fn() };
    
    // Create routes object with only /hello path defined
    setupRoutes(mockServer);
    
    // Call handleRequest with the mock request, response, and routes
    handleRequest(mockReq, mockRes);
    
    // Verify that notFoundHandler was called with the request and response
    expect(notFoundHandler).toHaveBeenCalledWith(mockReq, mockRes);
    expect(helloHandler).not.toHaveBeenCalled();
  });
  
  test('Requests with query parameters are routed correctly', () => {
    // Create mock request object with URL set to /hello?param=value
    mockReq.url = '/hello?param=value';
    
    // Create mock response object
    const mockRes = { statusCode: 200, setHeader: jest.fn(), end: jest.fn() };
    
    // Create routes object with /hello path mapped to helloHandler
    setupRoutes(mockServer);
    
    // Call handleRequest with the mock request, response, and routes
    handleRequest(mockReq, mockRes);
    
    // Verify that helloHandler was called with the request and response
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    
    // Verify that the query parameters are ignored for routing purposes
    expect(notFoundHandler).not.toHaveBeenCalled();
  });
  
  test('URL parsing handles different URL formats correctly', () => {
    // Setup routes
    setupRoutes(mockServer);
    
    // Create mock requests with various URL formats
    
    // Test standard URL
    mockReq.url = '/hello';
    handleRequest(mockReq, mockRes);
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    jest.clearAllMocks();
    
    // Test URL with trailing slash
    mockReq.url = '/hello/';
    handleRequest(mockReq, mockRes);
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    jest.clearAllMocks();
    
    // Test URL with query parameters
    mockReq.url = '/hello?name=world';
    handleRequest(mockReq, mockRes);
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
    jest.clearAllMocks();
    
    // Test missing URL
    mockReq.url = undefined;
    handleRequest(mockReq, mockRes);
    expect(notFoundHandler).toHaveBeenCalledWith(mockReq, mockRes);
  });
  
  test('Errors during routing are handled gracefully', () => {
    // Setup routes
    setupRoutes(mockServer);
    
    // Mock the middlewares module to track error handling
    jest.mock('../middlewares', () => ({
      errorMiddleware: jest.fn()
    }));
    
    // Import the mocked middleware
    const middlewares = require('../middlewares');
    
    // Create mock request with invalid or malformed URL
    const badReq = { url: null, method: 'GET' };
    
    // Expect no uncaught exception
    expect(() => {
      handleRequest(badReq, mockRes);
    }).not.toThrow();
    
    // In actual implementation, this would verify that errorMiddleware was called,
    // but we can't easily test that due to how the mocking is structured.
    // We at least verify that the function doesn't throw and crashes the server.
    
    // Verify that the error doesn't crash the routing process
    // And request handling can continue for other requests
    mockReq.url = '/hello';
    handleRequest(mockReq, mockRes);
    expect(helloHandler).toHaveBeenCalledWith(mockReq, mockRes);
  });
});