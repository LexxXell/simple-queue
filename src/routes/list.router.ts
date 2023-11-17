/**
 * Router module for handling queue-related API endpoints.
 *
 * @remarks
 * - This module defines a router using Express.js's `Router` class.
 * - The router is specific to queue-related routes.
 * - The only defined route is a GET request to '/list', which is handled by the 'getQueueList' controller.
 *
 * @see {@link https://expressjs.com/en/guide/routing.html}
 *
 * @example
 * ```typescript
 * import { listRouter } from './routes';
 * import { app } from './';
 *
 * // Attach the 'listRouter' to the main application
 * app.use(listRouter);
 * ```
 */
import express from 'express';
import { getQueueList } from '../controllers';

// Create a router for queue-related routes
export const listRouter = express.Router();

// Define a GET route for retrieving the queue list, handled by the 'getQueueList' controller
listRouter.get('/list', getQueueList);
