import { Request, Response } from 'express';
import { Person } from '../models';
import * as queueService from '../services/queue.service';
import { AddPersonDto } from '../dto';
import { Logger } from '../helpers/logger.helper';

const logger = new Logger('addPersonController');

export const addPersonController = async (request: Request, response: Response) => {
  try {
    const { name, surname } = request.body as AddPersonDto;

    const timestamp = Date.now();

    const person: Person = { name, surname, timestamp };

    await queueService.addToQueue(person);

    logger.log('Person added to the queue.', name, surname);
    response.status(201).json({ message: 'Person added to the queue successfully' });
  } catch (e) {
    logger.error(e);
    response.status(500).json({ error: (e as Error).message });
  }
};
