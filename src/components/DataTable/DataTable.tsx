'use client';
import React, { useMemo } from 'react';
import { Paper, TableContainer, Table, TableBody, Box, Typography } from '@mui/material';
import { useAppSelector } from '@/store/hook';
import { filterAndSortData } from '@/utils/dataProcessor';
import TableHeader from './TableHeader';
import DataTableBodyRow from './TableRow';
import TablePagination from './TablePagination';
import { TableRow as MuiTableRow, TableCell } from '@mui/material';

const DataTable: React.FC = () => {
  const { rows, columns } = useAppSelector((state) => state.table);
  const { searchQuery, sortConfig, currentPage, rowsPerPage } = useAppSelector((state) => state.filter);

  // 1. Process Data (Filter & Sort)
  const processedRows = useMemo(() => {
    return filterAndSortData(rows, searchQuery, sortConfig);
  }, [rows, searchQuery, sortConfig]);

  const totalRowCount = processedRows.length;

  // 2. Pagination
  const paginatedRows = useMemo(() => {
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    return processedRows.slice(start, end);
  }, [processedRows, currentPage, rowsPerPage]);

  const visibleColumns = useMemo(() => columns.filter(col => col.visible), [columns]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="dynamic data table">
          <TableHeader columns={columns} sortConfig={sortConfig} />
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <DataTableBodyRow key={row.id} row={row} columns={columns} />
              ))
            ) : (
              <DataTableEmptyState colSpan={visibleColumns.length + 1} searchQuery={searchQuery} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination count={totalRowCount} />
    </Paper>
  );
};

// Helper component for empty/no search results state
const DataTableEmptyState: React.FC<{ colSpan: number, searchQuery: string }> = ({ colSpan, searchQuery }) => (
    <TableBody>
        <MuiTableRow>
            <TableCell colSpan={colSpan} sx={{ textAlign: 'center', py: 5 }}>
                <Box>
                    <Typography variant="h6" color="textSecondary">
                        {searchQuery ? 'No results found.' : 'The table is currently empty.'}
                    </Typography>
                    {searchQuery && (
                        <Typography variant="body2" color="textSecondary">
                            Try adjusting your search or clearing the filter.
                        </Typography>
                    )}
                </Box>
            </TableCell>
        </MuiTableRow>
    </TableBody>
);

export default DataTable;