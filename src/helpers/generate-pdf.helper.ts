/**
 * Generates a PDF document containing a table with information about people in the queue.
 *
 * @remarks
 * - This function uses the 'pdfkit' library to create a PDF document.
 * - The document includes a table with columns: 'Name', 'Surname', and 'Date'.
 * - The data for the table is provided through the 'list' parameter, which contains an array of 'Person' objects.
 * - The generated PDF is saved to the specified file path.
 *
 * @see {@link https://www.npmjs.com/package/pdfkit}
 *
 * @param list - An array of 'Person' objects representing people in the queue.
 * @param filePath - The file path where the generated PDF will be saved.
 * @returns A Promise<void> indicating the success or failure of the PDF generation.
 *
 * @example
 * ```typescript
 * import { generatePDF } from './helpers/pdf-generator.helper';
 * import { Person } from './models';
 *
 * const peopleList: Person[] = [
 *   { name: 'John', surname: 'Doe', timestamp: 1637032856000 },
 *   // ... other person objects
 * ];
 *
 * const pdfFilePath = 'path/to/generated-file.pdf';
 *
 * // Generate the PDF and handle the result
 * generatePDF(peopleList, pdfFilePath)
 *   .then(() => console.log('PDF generated successfully'))
 *   .catch((error) => console.error('Error generating PDF:', error));
 * ```
 */
import fs from 'fs';
import pdf from 'pdfkit';
import { Person } from '../models';

// Define the generatePDF function
export const generatePDF = async (list: Person[], filePath: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    // Create a new PDF document using pdfkit
    const doc = new pdf();

    // Create a write stream to save the PDF to the specified file path
    const stream = doc.pipe(fs.createWriteStream(filePath));

    // Set the font to Helvetica-Bold for table headers
    doc.font('Helvetica-Bold');

    // Add table headers to the PDF
    doc.text('Name', { width: 200 });
    doc.text('Surname', { width: 200 });
    doc.text('Date', { width: 200 });
    doc.moveDown();

    // Set the font to Helvetica for table data
    doc.font('Helvetica');

    // Iterate through the list of people and add their information to the PDF table
    list.forEach((person) => {
      doc.text(person.name, { width: 200 });
      doc.text(person.surname, { width: 200 });
      doc.text(new Date(person.timestamp).toLocaleString(), { width: 200 });
      doc.moveDown();
    });

    // End the PDF document
    doc.end();

    // Listen for the 'finish' event to resolve the Promise when the stream is finished
    stream.on('finish', () => {
      resolve();
    });

    // Listen for the 'error' event to reject the Promise if an error occurs during stream operations
    stream.on('error', (err) => {
      reject(err);
    });
  });
};
