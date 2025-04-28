/**
 * Integration tests for the /hello endpoint.
 * 
 * These tests verify the complete request-response cycle by making actual HTTP requests
 * to the server. They ensure that the endpoint correctly returns 'Hello world' for GET
 * requests and appropriate error responses for other HTTP methods and invalid paths.
 * 
 * @module hello-endpoint.test
 */

import request from 'supertest'; // v6.3.3
import { createServer, startServer, stopServer } from '../../server';
import { setupRoutes } from '../../routes';
import { load as loadConfig } from '../../config';

// Server instance to be used across tests
let server;

/**
 * Setup function that runs once before all tests to create and start the HTTP server
 */
beforeAll(async () => {
  // Load configuration
  loadConfig();
  
  // Create HTTP server instance
  server = createServer();
  
  // Set up routes
  setupRoutes(server);
  
  // Start the server
  await startServer(server);
});

/**
 * Cleanup function that runs once after all tests to stop the HTTP server
 */
afterAll(async () => {
  // Stop the server
  await stopServer(server);
});

describe('Hello Endpoint Integration Tests', () => {
  
  /**
   * Tests that the /hello endpoint correctly responds to GET requests
   */
  test('should return Hello world with 200 status for GET requests', async () => {
    const response = await request(server)
      .get('/hello')
      .expect('Content-Type', 'text/plain')
      .expect(200);
    
    expect(response.text).toBe('Hello world');
  });
  
  /**
   * Tests that the /hello endpoint correctly rejects POST requests
   */
  test('should return Method Not Allowed with 405 status for POST requests', async () => {
    const response = await request(server)
      .post('/hello')
      .expect('Content-Type', 'text/plain')
      .expect(405);
    
    expect(response.text).toBe('Method Not Allowed');
  });
  
  /**
   * Tests that the /hello endpoint correctly rejects PUT requests
   */
  test('should return Method Not Allowed with 405 status for PUT requests', async () => {
    const response = await request(server)
      .put('/hello')
      .expect('Content-Type', 'text/plain')
      .expect(405);
    
    expect(response.text).toBe('Method Not Allowed');
  });
  
  /**
   * Tests that the /hello endpoint correctly rejects DELETE requests
   */
  test('should return Method Not Allowed with 405 status for DELETE requests', async () => {
    const response = await request(server)
      .delete('/hello')
      .expect('Content-Type', 'text/plain')
      .expect(405);
    
    expect(response.text).toBe('Method Not Allowed');
  });
  
  /**
   * Tests that requests to invalid paths return 404 Not Found
   */
  test('should return Not Found with 404 status for invalid paths', async () => {
    const response = await request(server)
      .get('/invalid')
      .expect('Content-Type', 'text/plain')
      .expect(404);
    
    expect(response.text).toBe('Not Found');
  });
});