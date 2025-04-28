/**
 * Unit tests for the hello-handler module
 * Tests the /hello endpoint handler to ensure it returns 'Hello world' for GET requests 
 * and 405 Method Not Allowed for other HTTP methods
 * 
 * @jest-environment node
 */

import helloHandler from '../../handlers/hello-handler';
import logger from '../../utils/logger';

describe('Hello Handler Tests', () => {
  // Mock objects for request and response
  let req;
  let res;
  
  // Setup before each test
  beforeEach(() => {
    // Create mock request object
    req = {
      method: '',
      url: '/hello'
    };
    
    // Create mock response object with jest mock functions
    res = {
      statusCode: 0,
      setHeader: jest.fn(),
      end: jest.fn()
    };
    
    // Mock logger functions
    jest.spyOn(logger, 'request').mockImplementation(() => {});
    jest.spyOn(logger, 'response').mockImplementation(() => {});
  });
  
  // Cleanup after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  test('should return Hello world with 200 status for GET requests', () => {
    // Setup request with GET method
    req.method = 'GET';
    
    // Call the handler
    helloHandler(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(200);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Hello world');
    expect(logger.request).toHaveBeenCalledWith(req);
    expect(logger.response).toHaveBeenCalledWith(req, res, expect.any(Number));
  });
  
  test('should return Method Not Allowed with 405 status for POST requests', () => {
    // Setup request with POST method
    req.method = 'POST';
    
    // Call the handler
    helloHandler(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(405);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Method Not Allowed');
    expect(logger.request).toHaveBeenCalledWith(req);
    expect(logger.response).toHaveBeenCalledWith(req, res, expect.any(Number));
  });
  
  test('should return Method Not Allowed with 405 status for PUT requests', () => {
    // Setup request with PUT method
    req.method = 'PUT';
    
    // Call the handler
    helloHandler(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(405);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Method Not Allowed');
    expect(logger.request).toHaveBeenCalledWith(req);
    expect(logger.response).toHaveBeenCalledWith(req, res, expect.any(Number));
  });
  
  test('should return Method Not Allowed with 405 status for DELETE requests', () => {
    // Setup request with DELETE method
    req.method = 'DELETE';
    
    // Call the handler
    helloHandler(req, res);
    
    // Assertions
    expect(res.statusCode).toBe(405);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Method Not Allowed');
    expect(logger.request).toHaveBeenCalledWith(req);
    expect(logger.response).toHaveBeenCalledWith(req, res, expect.any(Number));
  });
  
  test('should log request and response information', () => {
    // Setup request with GET method
    req.method = 'GET';
    
    // Call the handler
    helloHandler(req, res);
    
    // Assertions for logger calls
    expect(logger.request).toHaveBeenCalledTimes(1);
    expect(logger.request).toHaveBeenCalledWith(req);
    expect(logger.response).toHaveBeenCalledTimes(1);
    expect(logger.response).toHaveBeenCalledWith(req, res, expect.any(Number));
  });
});