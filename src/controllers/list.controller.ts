import { Request, Response } from 'express';
import { Person } from '../models';
import * as queueService from '../services/queue.service';
import * as config from '../config';
import { Logger, generatePDF } from '../helpers';

const logger = new Logger('addPersonController');

export const getQueueList = async (request: Request, response: Response) => {
  try {
    const list: Person[] = await queueService.getSortedQueue();
    // Тут можно сделать оптимизацию, добавив проверку, было ли обноыление очереди, и только в этом случае генерировать новый файл
    await generatePDF(list, config.queueFilepath);
    response.download(config.queueFilepath);
  } catch (e) {
    logger.error(e);
    response.status(500).json({ error: (e as Error).message });
  }
};
