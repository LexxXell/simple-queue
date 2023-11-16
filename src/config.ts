import './helpers/init-env.helper';

export const port: number = Number(process.env.PORT || 3000);

export const queueFilepath = 'tmp/queue.pdf';

export const dbConfig = {
  user: 'test',
  password: 'test',
  database: 'test',
  host: 'db',
  port: 5432,
};
