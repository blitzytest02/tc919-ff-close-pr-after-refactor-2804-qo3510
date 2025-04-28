# Node.js Hello World HTTP Server

A simple Node.js HTTP server application that exposes a single REST endpoint `/hello` which returns "Hello world" to clients.

## Overview

This project demonstrates a minimal, functional example of a Node.js web service that can serve as a learning tool or starter template. It implements a basic HTTP server using Node.js core modules without external dependencies.

## Features

- HTTP server implementation using Node.js core modules
- Single `/hello` endpoint returning "Hello world" text response
- Configurable server port via environment variables
- Basic error handling for server startup and request processing
- Proper HTTP status codes and headers
- Comprehensive test suite with Jest
- Docker support for containerized deployment

## Project Structure

- `src/backend/` - Backend application code
- `infrastructure/docker/` - Docker configuration files
- `.github/` - GitHub workflows and templates
- `docs/` - Additional documentation

## Prerequisites

- Node.js (18.x LTS or newer) - JavaScript runtime environment
- npm (9.x or newer, included with Node.js) - Node.js package manager
- Docker (20.10.0 or newer, optional) - For containerized deployment

## Installation

1. Clone the repository
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory
   ```
   cd src/backend
   ```
3. Install dependencies
   ```
   npm install
   ```

## Usage

### Running Locally

1. Start the server
   ```
   npm start
   ```
   Starts the server on the default port (3000)

2. Custom port
   ```
   PORT=8080 npm start
   ```
   Starts the server on port 8080

3. Development mode
   ```
   npm run dev
   ```
   Starts the server with nodemon for automatic restart on file changes

### Using Docker

1. Build and run with Docker Compose
   ```
   cd infrastructure/docker && docker-compose up
   ```
   Builds and starts the containerized application

2. Development mode with Docker
   ```
   cd infrastructure/docker && docker-compose up hello-world-dev
   ```
   Starts the development container with live code reloading

### Testing the Endpoint

1. Using curl
   ```
   curl http://localhost:3000/hello
   ```
   Expected output: `Hello world`

2. Using a web browser
   Navigate to http://localhost:3000/hello in your browser

## API Endpoints

| Path | Method | Description | Response |
|------|--------|-------------|----------|
| `/hello` | GET | Returns "Hello world" as plain text | 200 OK, Content-Type: text/plain, Body: Hello world |

## Configuration

| Name | Description | Default | Example |
|------|-------------|---------|---------|
| PORT | The port number on which the server will listen | 3000 | `PORT=8080 npm start` |
| NODE_ENV | The environment in which the server is running | development | `NODE_ENV=production npm start` |

## Development

### Running Tests

1. Run all tests
   ```
   npm test
   ```
   Runs the test suite using Jest

2. Test coverage
   ```
   npm run test:coverage
   ```
   Runs tests with coverage report

### Code Quality

1. Linting
   ```
   npm run lint
   ```
   Runs ESLint to check code quality

2. Fix linting issues
   ```
   npm run lint:fix
   ```
   Automatically fixes linting issues where possible

## Deployment

1. Local Node.js
   Run directly with Node.js
   ```
   npm start
   ```

2. Docker
   Use the provided Dockerfile
   ```
   docker build -f infrastructure/docker/Dockerfile -t nodejs-hello-world .
   ```

3. Docker Compose
   Use Docker Compose for easy deployment
   ```
   docker-compose -f infrastructure/docker/docker-compose.yml up
   ```

## Documentation

- [Backend Documentation](src/backend/README.md) - Detailed documentation for the backend application
- [API Documentation](src/backend/docs/api.md) - Detailed API endpoint documentation
- [Setup Guide](src/backend/docs/setup.md) - Detailed setup and deployment instructions

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.