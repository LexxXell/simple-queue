import { pool } from './db';
import { Logger } from './helpers';

const logger = new Logger('Migration DB');

const createQueueTable = async () => {
  const client = await pool.connect();
  try {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS queue (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await client.query(createTableQuery);
    logger.log('Table "queue" created successfully');
  } catch (error) {
    logger.error('Error creating table "queue":', error);
  } finally {
    client.release();
  }
};

createQueueTable();
