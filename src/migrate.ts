import { pool } from './db';
import { Logger } from './helpers';

const logger = new Logger('Migration DB');

/**
 * Asynchronous function to create the 'queue' table in the PostgreSQL database.
 *
 * This function ensures that the 'queue' table is created if it does not already exist.
 * The table has columns: 'id', 'name', 'surname', and 'timestamp'.
 *
 * @remarks
 * - The 'id' column is of type SERIAL and serves as the primary key.
 * - The 'name' and 'surname' columns are of type VARCHAR(255) and are not nullable.
 * - The 'timestamp' column is of type TIMESTAMP with a default value of the current timestamp.
 *
 * @throws An error if there is an issue creating the table.
 *
 * @example
 * ```typescript
 * await createQueueTable();
 * ```
 */
const createQueueTable = async (): Promise<void> => {
  const client = await pool.connect();
  try {
    // SQL query to create the 'queue' table if it does not exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS queue (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Execute the query using the connected client
    await client.query(createTableQuery);

    // Log a success message if the table creation is successful
    logger.log('Table "queue" created successfully');
  } catch (error) {
    // Log an error message if there is an issue creating the table
    logger.error('Error creating table "queue":', error);

    // Rethrow the error to propagate it to the calling code
    throw error;
  } finally {
    // Release the client back to the pool to avoid resource leaks
    client.release();
  }
};

// Immediately invoke the createQueueTable function when this module is imported
if (require.main === module) createQueueTable();
