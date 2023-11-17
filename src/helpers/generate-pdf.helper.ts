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

    // Set up the table headers
    doc.font('Helvetica-Bold').fontSize(12);
    doc.text('No', 50, 50);
    doc.text('Name', 100, 50);
    doc.text('Surname', 250, 50);
    doc.text('Date', 400, 50);

    // Draw a thick horizontal line below the headers
    doc.lineWidth(2);
    doc.moveTo(50, 65).lineTo(500, 65).stroke();
    doc.lineWidth(1); // Reset line width for the rest of the document

    // Set up the table rows
    doc.font('Helvetica').fontSize(10);
    let y = 70;
    // Iterate through the list of people and add their information to the PDF table
    list.forEach((person, index) => {
      const rowNumber = index + 1;

      // Draw a thin horizontal line between rows
      doc.moveTo(50, y).lineTo(500, y).stroke();
      y += 5; // Add a 5-pixel gap

      doc.text(rowNumber.toString(), 50, y);
      doc.text(person.name, 100, y);
      doc.text(person.surname, 250, y);
      doc.text(new Date(person.timestamp).toLocaleString(), 380, y);

      y += 20; // Increase the y position for the next row
    });

    // Draw a thick horizontal line below the headers
    doc.lineWidth(2);
    doc.moveTo(50, y).lineTo(500, y).stroke();
    doc.lineWidth(1); // Reset line width for the rest of the document

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
