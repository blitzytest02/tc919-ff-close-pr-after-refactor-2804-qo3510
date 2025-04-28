/**
 * Unit tests for error middleware
 * Tests the handling of errors during HTTP request processing to ensure
 * proper status codes, formatting, and logging
 */

import errorMiddleware from '../../../middlewares/error-middleware';
import * as logger from '../../../utils/logger';

// Mock objects for testing
let req;
let res;
let next;

// Setup before each test
beforeEach(() => {
  // Mock logger.error function
  jest.spyOn(logger, 'error').mockImplementation(() => {});
  
  // Mock request object
  req = {
    method: 'GET',
    url: '/test'
  };
  
  // Mock response object
  res = {
    statusCode: 200, // Initial value
    setHeader: jest.fn(),
    end: jest.fn()
  };
  
  // Mock next function
  next = jest.fn();
});

// Cleanup after each test
afterEach(() => {
  // Restore all mocks
  jest.restoreAllMocks();
});

describe('Error Middleware', () => {
  test('should use status code from error object', () => {
    // Create error object with status
    const error = {
      status: 400,
      message: 'Bad Request'
    };
    
    // Call middleware
    errorMiddleware(error, req, res, next);
    
    // Verify logger was called
    expect(logger.error).toHaveBeenCalledWith(`Error processing request ${req.method} ${req.url}`, error);
    
    // Verify response was set correctly
    expect(res.statusCode).toBe(400);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Bad Request');
  });
  
  test('should use statusCode property from error object', () => {
    // Create error object with statusCode
    const error = {
      statusCode: 404,
      message: 'Not Found'
    };
    
    // Call middleware
    errorMiddleware(error, req, res, next);
    
    // Verify logger was called
    expect(logger.error).toHaveBeenCalledWith(`Error processing request ${req.method} ${req.url}`, error);
    
    // Verify response was set correctly
    expect(res.statusCode).toBe(404);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Not Found');
  });
  
  test('should default to status code 500 when no status is provided', () => {
    // Create error object without status
    const error = {
      message: 'Some error occurred'
    };
    
    // Call middleware
    errorMiddleware(error, req, res, next);
    
    // Verify logger was called
    expect(logger.error).toHaveBeenCalledWith(`Error processing request ${req.method} ${req.url}`, error);
    
    // Verify response was set correctly
    expect(res.statusCode).toBe(500);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Some error occurred');
  });
  
  test('should use default message when error has no message', () => {
    // Create error object without message
    const error = {};
    
    // Call middleware
    errorMiddleware(error, req, res, next);
    
    // Verify logger was called
    expect(logger.error).toHaveBeenCalledWith(`Error processing request ${req.method} ${req.url}`, error);
    
    // Verify response was set correctly
    expect(res.statusCode).toBe(500);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Internal Server Error');
  });
  
  test('should correctly handle Error objects with stack traces', () => {
    // Create standard Error object
    const error = new Error('Something went wrong');
    
    // Call middleware
    errorMiddleware(error, req, res, next);
    
    // Verify logger was called
    expect(logger.error).toHaveBeenCalledWith(`Error processing request ${req.method} ${req.url}`, error);
    
    // Verify response was set correctly
    expect(res.statusCode).toBe(500);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'text/plain');
    expect(res.end).toHaveBeenCalledWith('Something went wrong');
  });
});