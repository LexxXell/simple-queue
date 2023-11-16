import express from 'express';
import { getQueueList } from '../controllers';

export const listRouter = express.Router();

listRouter.get('/list', getQueueList);
