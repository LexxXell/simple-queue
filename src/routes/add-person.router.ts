/**
 * Router module for handling person-related API endpoints.
 *
 * @remarks
 * - This module defines a router using Express.js's `Router` class.
 * - The router is specific to person-related routes.
 * - The only defined route is a POST request to '/person', which is handled by the 'addPersonController'.
 *
 * @see {@link https://expressjs.com/en/guide/routing.html}
 *
 * @example
 * ```typescript
 * import { personRouter } from './routes';
 * import { app } from './';
 *
 * // Attach the 'personRouter' to the main application
 * app.use(personRouter);
 * ```
 */
import express from 'express';
import { addPersonController } from '../controllers';

// Create a router for person-related routes
export const personRouter = express.Router();

// Define a POST route for adding a person, handled by the 'addPersonController'
personRouter.post('/person', addPersonController);
