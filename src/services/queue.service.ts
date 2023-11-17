import { pool } from '../db';
import { AddPersonDto } from '../dto';
import { Person } from '../models';

/**
 * Adds a person to the queue in the database.
 *
 * @param person - The person information to be added to the queue.
 * @returns A Promise<void> indicating the success of the operation.
 */
export const addToQueue = async (person: AddPersonDto): Promise<void> => {
  const client = await pool.connect();
  try {
    // SQL query to insert the person into the 'queue' table
    const query = 'INSERT INTO queue (name, surname) VALUES ($1, $2)';
    const values = [person.name, person.surname];

    // Execute the query using the connected client
    await client.query(query, values);
  } finally {
    // Release the client back to the pool to avoid resource leaks
    client.release();
  }
};

/**
 * Retrieves the list of people in the queue from the database, sorted by timestamp in ascending order.
 *
 * @returns A Promise<Person[]> representing the list of people in the queue.
 */
export const getSortedQueue = async (): Promise<Person[]> => {
  const client = await pool.connect();
  try {
    // SQL query to select all entries from the 'queue' table, ordered by timestamp in ascending order
    const query = 'SELECT * FROM queue ORDER BY timestamp ASC';

    // Execute the query using the connected client
    const result = await client.query(query);

    // Return the rows as an array of Person objects
    return result.rows as Person[];
  } finally {
    // Release the client back to the pool to avoid resource leaks
    client.release();
  }
};
