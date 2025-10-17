import { saveAs } from 'file-saver';
import { TableRow, TableColumn } from '@/types/table.types';

export const exportToCSV = (rows: TableRow[], columns: TableColumn[]) => {
  // 1. Filter to only visible columns
  const visibleColumns = columns.filter(col => col.visible);

  // 2. Create the header row using column labels
  const headers = visibleColumns.map(col => col.label).join(',');

  // 3. Create the data rows
  const csvRows = rows.map(row =>
    visibleColumns
      .map(col => {
        // Handle null/undefined values by exporting an empty string
        const value = row[col.id] ?? '';
        // Wrap value in quotes if it contains commas, newlines, or double quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('\n') || value.includes('"'))) {
          // Escape double quotes by doubling them, then wrap the entire field in double quotes
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(',')
  );

  // 4. Combine headers and rows
  const csvContent = [headers, ...csvRows].join('\n');

  // 5. Create Blob and save file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, `data-export-${new Date().toISOString().slice(0, 10)}.csv`);
};