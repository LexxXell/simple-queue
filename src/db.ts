import { Pool } from 'pg';
import { dbConfig } from './config';
import { Logger } from './helpers';

const logger = new Logger('DataBase');

export const pool = new Pool(dbConfig);

pool.on('connect', () => logger.log('Connected to the database'));
pool.on('error', (err: Error) => logger.error('Error connecting to the database:', err));

// Проверка подключения при инициализации
pool.connect((err, client, done) => {
  if (err) {
    logger.error('Error connecting to the database during initialization:', err);
    process.exit(1);
  } else {
    done();
  }
});
