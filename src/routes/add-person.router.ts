import express from 'express';
import { addPersonController } from '../controllers';

export const personRouter = express.Router();

personRouter.post('/person', addPersonController);
