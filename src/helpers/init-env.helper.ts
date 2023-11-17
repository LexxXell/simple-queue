/**
 * Configuration module for loading environment variables using the 'dotenv' library.
 *
 * @remarks
 * - This module uses the 'dotenv' library to load environment variables from a specified '.env' file.
 * - The file path is determined based on the 'NODE_ENV' environment variable. If 'NODE_ENV' is set,
 *   the corresponding '.{NODE_ENV}.env' file is loaded; otherwise, the default '.env' file is used.
 *
 * @see {@link https://www.npmjs.com/package/dotenv}
 *
 * @example
 * ```typescript
 * import './helpers/init-env.helper';
 *
 * // Environment variables are now accessible throughout the application
 * const port = process.env.PORT || 3000;
 * const databaseConfig = {
 *   user: process.env.POSTGRES_USER || 'test',
 *   password: process.env.POSTGRES_PASSWORD || 'test',
 *   // ... other database configuration properties
 * };
 * ```
 */
import { config } from 'dotenv';

// Determine the '.env' file path based on the 'NODE_ENV' environment variable
const NODE_ENV = process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env';

// Load environment variables from the specified '.env' file
config({ path: NODE_ENV });
