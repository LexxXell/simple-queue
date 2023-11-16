import fs from 'fs';
import pdf from 'pdfkit';
import { Person } from '../models';

// Ранее не было задач с генерацией pdf, потому не удалось быстро сделать решение в формате таблицы.

export const generatePDF = async (list: Person[], filePath: string): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const doc = new pdf();
    const stream = doc.pipe(fs.createWriteStream(filePath));

    doc.font('Helvetica-Bold');

    doc.text('Name', { width: 200 });
    doc.text('Surname', { width: 200 });
    doc.text('Date', { width: 200 });
    doc.moveDown();

    doc.font('Helvetica');

    list.forEach((person) => {
      doc.text(person.name, { width: 200 });
      doc.text(person.surname, { width: 200 });
      doc.text(new Date(person.timestamp).toLocaleString(), { width: 200 });
      doc.moveDown();
    });

    doc.end();

    stream.on('finish', () => {
      resolve();
    });

    stream.on('error', (err) => {
      reject(err);
    });
  });
};
