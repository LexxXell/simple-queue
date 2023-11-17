/**
 * Database configuration module utilizing the 'pg' library to create and manage a PostgreSQL connection pool.
 *
 * @remarks
 * - The `pool` variable is a PostgreSQL connection pool created using the configuration from 'dbConfig'.
 * - Event listeners are set up to log connection and error messages.
 * - A connection is established during initialization, and the process exits with an error code if the connection fails.
 *
 * @see {@link https://node-postgres.com/features/connecting}
 *
 * @example
 * ```typescript
 * import { pool } from './db';
 * pool.query('SELECT NOW()', (err, res) => {
 *   console.log(err ? err.stack : res.rows[0]); // Print the result or error
 *   pool.end(); // Close the pool
 * });
 * ```
 */
import { Pool } from 'pg';
import { dbConfig } from './config';
import { Logger } from './helpers';

// Logger instance for database-related logs
const logger = new Logger('DataBase');

// Create a PostgreSQL connection pool using the provided configuration
export const pool = new Pool(dbConfig);

// Log when a new connection to the database is established
pool.on('connect', () => logger.log('Connected to the database'));

// Log database connection errors
pool.on('error', (err: Error) => logger.error('Error connecting to the database:', err));

// Connect to the database during initialization and exit the process with an error code if the connection fails
pool.connect((err, client, done) => {
  if (err) {
    logger.error('Error connecting to the database during initialization:', err);
    process.exit(1);
  } else {
    done();
  }
});
