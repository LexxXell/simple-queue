import './db';
import express from 'express';
import { listRouter, personRouter } from './routes';
import * as config from './config';
import { Logger } from './helpers';

const logger = new Logger('MAIN');

const app = express();

app.use(express.json());

app.use(personRouter);
app.use(listRouter);

app.listen(config.port, () => {
  logger.log(`Server is running at http://localhost:${config.port}`);
});
