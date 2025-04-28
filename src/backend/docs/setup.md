# Node.js Hello World Server - Setup Guide

This document provides detailed instructions for setting up, configuring, and deploying the Node.js Hello World server application.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

| Prerequisite | Version | Description | Installation Link |
|--------------|---------|-------------|------------------|
| Node.js | 18.x LTS or newer | JavaScript runtime environment | [Download Node.js](https://nodejs.org/en/download/) |
| npm | 9.x or newer (included with Node.js) | Node.js package manager | [npm Documentation](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) |
| Git | 2.x or newer | Version control system (optional, for cloning the repository) | [Download Git](https://git-scm.com/downloads) |

You can verify your installed versions by running:
```bash
node --version
npm --version
git --version
```

## Installation

Follow these steps to install the application:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   ```
   Replace `<repository-url>` with the actual URL of the Git repository.

2. **Navigate to the backend directory**
   ```bash
   cd src/backend
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   This will install all required dependencies defined in package.json.

## Configuration

The server can be configured using environment variables:

### Environment Variables

| Variable | Description | Default | Valid Values | Example |
|----------|-------------|---------|-------------|---------|
| PORT | The port number on which the server will listen | 3000 | Integer between 1024-65535 | `export PORT=8080` |
| NODE_ENV | The environment in which the server is running | development | development, production, test | `export NODE_ENV=production` |

### Configuration Methods

#### Environment Variables
Set environment variables before starting the server:
```bash
PORT=8080 npm start
```

#### .env File (Optional)
If you want to use a .env file for configuration:

1. Install the dotenv package:
   ```bash
   npm install dotenv
   ```

2. Create a `.env` file in the root directory:
   ```
   PORT=8080
   NODE_ENV=production
   ```

## Running the Server

### Starting the Server

| Environment | Command | Description |
|-------------|---------|-------------|
| Development | `npm run dev` | Starts the server with nodemon for automatic restart on file changes |
| Production | `npm start` | Starts the server in production mode |
| Custom Port | `PORT=8080 npm start` | Starts the server on a custom port (8080 in this example) |

### Verifying the Server

To verify that the server is running correctly:

1. Using curl:
   ```bash
   curl http://localhost:3000/hello
   ```
   Expected output: `Hello world`

2. Using a web browser:
   Open http://localhost:3000/hello in any web browser.

## Development Workflow

Follow this recommended workflow for development:

1. **Start the server in development mode**
   ```bash
   npm run dev
   ```
   The server will automatically restart when files are changed.

2. **Make code changes**
   Edit the source files as needed.

3. **Run tests**
   ```bash
   npm test
   ```
   Run the test suite to ensure functionality.

4. **Check code quality**
   ```bash
   npm run lint
   ```
   Run ESLint to check code quality and style.

5. **Fix linting issues**
   ```bash
   npm run lint:fix
   ```
   Automatically fix linting issues where possible.

## Testing

The application includes a test suite to verify functionality:

| Test Type | Command | Description |
|-----------|---------|-------------|
| All tests | `npm test` | Run all unit and integration tests |
| Code coverage | `npm run test:coverage` | Run tests with coverage report |
| Specific test file | `npm test -- __tests__/server.test.js` | Run tests in a specific file |

## Deployment

Several deployment options are available:

### Local Deployment

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the backend directory: `cd src/backend`
3. Install dependencies: `npm install`
4. Start the server: `npm start`

### Process Manager (PM2)

For improved reliability in production:

1. Install PM2:
   ```bash
   npm install -g pm2
   ```

2. Start the server with PM2:
   ```bash
   pm2 start index.js --name hello-world
   ```

3. Configure PM2 to start on system boot:
   ```bash
   pm2 startup
   ```

4. Save the PM2 configuration:
   ```bash
   pm2 save
   ```

### Docker Deployment

Using the provided Dockerfile:

1. Navigate to the docker directory:
   ```bash
   cd infrastructure/docker
   ```

2. Build the Docker image:
   ```bash
   docker build -t nodejs-hello-world .
   ```

3. Run the container:
   ```bash
   docker run -p 3000:3000 nodejs-hello-world
   ```

### Docker Compose

Using Docker Compose for simplified deployment:

1. Navigate to the docker directory:
   ```bash
   cd infrastructure/docker
   ```

2. Start with Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. Stop the service:
   ```bash
   docker-compose down
   ```

## Troubleshooting

Here are solutions to common issues:

| Issue | Possible Cause | Solution |
|-------|---------------|----------|
| Server won't start | Port already in use | Change the port using the PORT environment variable: `PORT=8080 npm start` |
| EACCES error | Insufficient permissions | Use a port number greater than 1024 or run with elevated privileges |
| Connection refused | Server not running | Check that the server process is active |
| 404 response | Incorrect URL path | Ensure the path is exactly '/hello' |
| Module not found errors | Dependencies not installed | Run `npm install` to install all required dependencies |

## Additional Resources

| Resource | Link | Description |
|----------|------|-------------|
| API Documentation | [./api.md](./api.md) | Detailed documentation of the API endpoints |
| Node.js Documentation | [https://nodejs.org/en/docs/](https://nodejs.org/en/docs/) | Official Node.js documentation |
| npm Documentation | [https://docs.npmjs.com/](https://docs.npmjs.com/) | Official npm documentation |