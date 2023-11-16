import { pool } from '../db';
import { AddPersonDto } from '../dto';
import { Person } from '../models';

export const addToQueue = async (person: AddPersonDto): Promise<void> => {
  const client = await pool.connect();
  try {
    const query = 'INSERT INTO queue (name, surname) VALUES ($1, $2)';
    const values = [person.name, person.surname];

    await client.query(query, values);
  } finally {
    client.release();
  }
};

export const getSortedQueue = async (): Promise<Person[]> => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM queue ORDER BY timestamp ASC';
    const result = await client.query(query);

    return result.rows as Person[];
  } finally {
    client.release();
  }
};
