/**
 * Controller function for handling the POST request to add a person to the queue.
 *
 * @remarks
 * - This controller function extracts the 'name' and 'surname' from the request body to create a new 'Person' object.
 * - The 'queueService' is then used to add the person to the queue.
 * - Successful addition results in a log message and a 201 status response.
 * - If an error occurs during the process, an error response is sent with a status code of 500.
 *
 * @see {@link ../services/queue.service.ts}
 * @see {@link ../dto/AddPersonDto.ts}
 * @see {@link ../helpers/logger.helper.ts}
 *
 * @param request - The Express request object containing the person's information in the request body.
 * @param response - The Express response object.
 *
 * @example
 * ```typescript
 * import { addPersonController } from './controllers/person.controller';
 *
 * // Define a route to handle the POST request for adding a person to the queue
 * app.post('/person', addPersonController);
 * ```
 */
import { Request, Response } from 'express';
import { Person } from '../models';
import * as queueService from '../services/queue.service';
import { AddPersonDto } from '../dto';
import { Logger } from '../helpers/logger.helper';

// Logger instance for the 'addPersonController' controller
const logger = new Logger('addPersonController');

// Controller function for handling the POST request to add a person to the queue
export const addPersonController = async (request: Request, response: Response) => {
  try {
    // Extract 'name' and 'surname' from the request body
    const { name, surname } = request.body as AddPersonDto;

    // Generate a timestamp for the person
    const timestamp = Date.now();

    // Create a 'Person' object with the extracted information
    const person: Person = { name, surname, timestamp };

    // Add the person to the queue using the 'queueService'
    await queueService.addToQueue(person);

    // Log a success message
    logger.log('Person added to the queue.', name, surname);

    // Send a 201 status response indicating successful addition
    response.status(201).json({ message: 'Person added to the queue successfully' });
  } catch (error) {
    // Log the error using the 'logger' instance
    logger.error(error);

    // Send an error response with a status code of 500 and the error message
    response.status(500).json({ error: (error as Error).message });
  }
};
