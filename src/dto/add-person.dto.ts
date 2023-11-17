/**
 * Data Transfer Object (DTO) interface for adding a person to the queue.
 *
 * @remarks
 * - This interface extends the 'Person' model and specifies additional properties for adding a person.
 * - The 'name' and 'surname' properties are required for creating a new person entry.
 *
 * @see {@link ../models/Person.ts}
 *
 * @example
 * ```typescript
 * import { AddPersonDto } from '../dto';
 *
 * // Example usage of the 'AddPersonDto' interface
 * const newPerson: AddPersonDto = {
 *   name: 'John',
 *   surname: 'Doe',
 *   // Additional optional properties from the 'Person' model can be included here
 * };
 * ```
 */
import { Person } from '../models';

// Define the AddPersonDto interface, extending the 'Person' model
export interface AddPersonDto extends Partial<Person> {
  // Required property: the name of the person
  name: string;

  // Required property: the surname of the person
  surname: string;
}
