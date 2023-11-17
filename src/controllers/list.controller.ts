/**
 * Controller function for handling the GET request to retrieve the sorted list of people in the queue.
 *
 * @remarks
 * - This controller function utilizes the 'queueService' to fetch the sorted queue list.
 * - The 'generatePDF' helper function is used to generate a PDF file containing the queue list.
 * - The generated PDF is then sent as a downloadable file in the response.
 * - If an error occurs during the process, an error response is sent with a status code of 500.
 *
 * @see {@link ../services/queue.service.ts}
 * @see {@link ../helpers/generatePDF.helper.ts}
 *
 * @param request - The Express request object.
 * @param response - The Express response object.
 *
 * @example
 * ```typescript
 * import { getQueueList } from './controllers/queue.controller';
 *
 * // Define a route to handle the GET request for the queue list
 * app.get('/queue/list', getQueueList);
 * ```
 */
import { Request, Response } from 'express';
import { Person } from '../models';
import * as queueService from '../services/queue.service';
import * as config from '../config';
import { Logger, generatePDF } from '../helpers';

// Logger instance for the 'addPersonController' controller
const logger = new Logger('addPersonController');

// Controller function for handling the GET request to retrieve the sorted list of people in the queue
export const getQueueList = async (request: Request, response: Response) => {
  try {
    // Fetch the sorted list of people in the queue from the 'queueService'
    const list: Person[] = await queueService.getSortedQueue();

    /*  Here optimization can be done by adding a check if the queue has been updated, and only then generate a new file. */

    // Generate a PDF file containing the queue list
    await generatePDF(list, config.queueFilepath);

    // Send the generated PDF as a downloadable file in the response
    response.download(config.queueFilepath);
  } catch (error) {
    // Log the error using the 'logger' instance
    logger.error(error);

    // Send an error response with a status code of 500 and the error message
    response.status(500).json({ error: (error as Error).message });
  }
};
