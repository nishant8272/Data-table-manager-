import { TableRow, TableColumn, SortConfig } from '@/types/table.types';

export const filterAndSortData = (
  rows: TableRow[],
  searchQuery: string,
  sortConfig: SortConfig
): TableRow[] => {
  let processedRows = [...rows];

  // 1. Filtering (Global Search)
  if (searchQuery) {
    const lowerCaseQuery = searchQuery.toLowerCase().trim();
    processedRows = processedRows.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  }

  // 2. Sorting
  if (sortConfig.key && sortConfig.direction) {
    const { key, direction } = sortConfig;
    processedRows.sort((a, b) => {
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';

      // Handle nulls and undefined
      if (aValue === '' && bValue !== '') return direction === 'asc' ? 1 : -1;
      if (bValue === '' && aValue !== '') return direction === 'asc' ? -1 : 1;
      if (aValue === '' && bValue === '') return 0;

      // Numerical sort
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // String sort
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const comparison = aValue.localeCompare(bValue);
        return direction === 'asc' ? comparison : -comparison;
      }

      return 0;
    });
  }

  return processedRows;
};