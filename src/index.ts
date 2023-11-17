/**
 * Main application module that configures and starts an Express.js server.
 *
 * @remarks
 * - The module establishes a connection to the PostgreSQL database by importing './db'.
 * - Express.js is used to create a web server.
 * - Two routers, 'personRouter' and 'listRouter', are attached to handle specific API endpoints.
 * - The server listens on the specified port from the 'config' module.
 * - Logs server startup information using the 'Logger' utility.
 *
 * @see {@link https://expressjs.com/}
 *
 * @example
 * ```typescript
 * import { app } from './main';
 * app.listen(3000, () => {
 *   console.log('Server is running on port 3000');
 * });
 * ```
 */
import './db';
import express from 'express';
import { listRouter, personRouter } from './routes';
import * as config from './config';
import { Logger } from './helpers';

// Logger instance for main application logs
const logger = new Logger('MAIN');

// Create an Express.js application
const app = express();

// Enable JSON parsing for incoming requests
app.use(express.json());

// Attach routers to handle specific API endpoints
app.use(personRouter);
app.use(listRouter);

// Start the server and listen on the specified port
app.listen(config.port, () => {
  logger.log(`Server is running at http://localhost:${config.port}`);
});

// Export the app for potential reuse in other modules
export { app };
