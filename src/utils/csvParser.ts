import Papa from 'papaparse';
import { TableRow } from '@/types/table.types';

export const parseCSV = (file: File): Promise<TableRow[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase().replace(/ /g, '_'),
      complete: (results) => {
        const rows = (results.data as Record<string, string>[])
          .filter(row => Object.values(row).some(val => val !== '')) // Remove fully empty rows
          .map((row: Record<string, string>, index: number) => ({
            id: `row-${Date.now()}-${index}`,
            // Ensure fields like 'age' are converted to number if possible
            age: row.age ? parseInt(row.age, 10) : undefined,
            ...row,
          }));
        resolve(rows as TableRow[]);
      },
      error: (error: Error) => reject(error),
    });
  });
};