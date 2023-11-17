import './helpers/init-env.helper';

// Port configuration: Use the value from the environment variable PORT or default to 3000
export const port: number = Number(process.env.PORT || 3000);

// Filepath for the generated queue PDF
export const queueFilepath = 'tmp/queue.pdf';

// Database configuration:
export const dbConfig = {
  // Database username, default to 'test' if not provided in the environment
  user: process.env.POSTGRES_USER || 'test',

  // Database password, default to 'test' if not provided in the environment
  password: process.env.POSTGRES_PASSWORD || 'test',

  // Database name, default to 'test' if not provided in the environment
  database: process.env.POSTGRES_DB || 'test',

  // Database host, default to 'db' if not provided in the environment
  host: process.env.POSTGRES_HOST || 'db',

  // Database port, default to 5432 if not provided in the environment
  port: Number(process.env.POSTGRES_PORT || 5432),
};
