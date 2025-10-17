'use client';
import React from 'react';
import { Button, Box } from '@mui/material';
import { Add, Upload, Download, Settings } from '@mui/icons-material';
import { useAppDispatch } from '@/store/hook';
import { setImportModalOpen, setColumnsModalOpen } from '@/store/slices/uiSlice';
import { addRow } from '@/store/slices/tableSlice';
import { TableRow } from '@/types/table.types';
import { exportToCSV } from '@/utils/csvExporter';
import { useAppSelector } from '@/store/hook';
import { filterAndSortData } from '@/utils/dataProcessor';

const ActionButtons: React.FC = () => {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.table.rows);
  const columns = useAppSelector((state) => state.table.columns);
  const { searchQuery, sortConfig } = useAppSelector((state) => state.filter);

  // Data to be exported (filtered and sorted view)
  const processedRows = filterAndSortData(rows, searchQuery, sortConfig);

  const handleAddRow = () => {
    const newRow: TableRow = {
      id: `row-${Date.now()}`,
      name: 'New User',
      email: '',
      age: 0,
      role: 'Guest',
      // Ensure all custom columns are initialized
      ...columns.reduce((acc, col) => ({ ...acc, [col.id]: '' }), {}),
    };
    dispatch(addRow(newRow));
  };

  const handleExport = () => {
    exportToCSV(processedRows, columns);
  };

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={handleAddRow}
        size="small"
      >
        Add Row
      </Button>
      <Button
        variant="outlined"
        startIcon={<Upload />}
        onClick={() => dispatch(setImportModalOpen(true))}
        size="small"
      >
        Import CSV
      </Button>
      <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={handleExport}
        size="small"
      >
        Export View
      </Button>
      <Button
        variant="outlined"
        startIcon={<Settings />}
        onClick={() => dispatch(setColumnsModalOpen(true))}
        size="small"
      >
        Manage Columns
      </Button>
    </Box>
  );
};

export default ActionButtons;