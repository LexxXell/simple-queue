/**
 * Model interface representing a person in the queue.
 *
 * @remarks
 * - This interface defines the properties of a person, including their 'name', 'surname', and 'timestamp'.
 * - The 'name' property represents the first name of the person.
 * - The 'surname' property represents the last name or surname of the person.
 * - The 'timestamp' property represents the date and time when the person was added to the queue.
 *
 * @example
 * ```typescript
 * import { Person } from '../models';
 *
 * // Example usage of the 'Person' interface
 * const person: Person = {
 *   name: 'John',
 *   surname: 'Doe',
 *   timestamp: 1637032856000, // Example timestamp in milliseconds
 * };
 * ```
 */
export interface Person {
  // Property representing the first name of the person
  name: string;

  // Property representing the last name or surname of the person
  surname: string;

  // Property representing the date and time when the person was added to the queue (in milliseconds)
  timestamp: number;
}
