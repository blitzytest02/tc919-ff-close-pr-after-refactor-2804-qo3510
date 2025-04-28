# Node.js Hello World API Documentation

## Introduction

This document describes the API endpoints provided by the Node.js Hello World server. The server exposes a minimal REST API designed for educational purposes to demonstrate basic HTTP server implementation in Node.js.

## Base URL

By default, the server runs on `http://localhost:3000`. This can be configured by setting the PORT environment variable.

## Endpoints

### GET /hello

Returns a simple 'Hello world' message.

**Request:**
- Method: GET
- Parameters: None
- Body: None required

**Response:**
- Status: 200 OK
- Content-Type: text/plain
- Body: Hello world

**Errors:**
- Status: 405 Method Not Allowed
  - Condition: When using HTTP methods other than GET
  - Content-Type: text/plain
  - Body: Method Not Allowed

**Example:**
```
# Request
curl http://localhost:3000/hello

# Response
Hello world
```

### Any undefined path

Returns a 404 Not Found response for any undefined routes.

**Request:**
- Method: Any
- Parameters: None
- Body: None

**Response:**
- Status: 404 Not Found
- Content-Type: text/plain
- Body: Not Found

**Example:**
```
# Request
curl http://localhost:3000/undefined-path

# Response
Not Found
```

## Status Codes

| Code | Description |
|------|-------------|
| 200 OK | The request was successful. |
| 404 Not Found | The requested resource does not exist. |
| 405 Method Not Allowed | The HTTP method used is not supported for the requested resource. |
| 500 Internal Server Error | An unexpected error occurred on the server. |

## Content Types

| Content Type | Description |
|--------------|-------------|
| text/plain | All responses are returned as plain text. |

## Usage Examples

### curl

Command line example using curl:

```
curl http://localhost:3000/hello
```

### JavaScript (Fetch API)

Example using JavaScript's Fetch API:

```javascript
fetch('http://localhost:3000/hello')
  .then(response => response.text())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### Node.js (http module)

Example using Node.js http module:

```javascript
const http = require('http');

http.get('http://localhost:3000/hello', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log(data);
  });
}).on('error', (err) => {
  console.error('Error: ' + err.message);
});
```

## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of requests. Error responses are returned as plain text with appropriate status codes.

## Rate Limiting

This API does not implement rate limiting.

## Authentication

This API does not require authentication.

## Versioning

This API does not implement versioning.