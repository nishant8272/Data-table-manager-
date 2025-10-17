'use client';

import React from 'react';
import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setSortConfig } from '@/store/slices/filterSlice';
import { SortConfig, TableColumn } from '@/types/table.types';

interface TableHeaderProps {
  columns: TableColumn[];
  sortConfig: SortConfig;
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns, sortConfig }) => {
  const dispatch = useAppDispatch();

  const handleSortRequest = (propertyId: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === propertyId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    dispatch(setSortConfig({ key: propertyId, direction }));
  };

  return (
    <TableHead>
      <TableRow>
        {columns.filter(col => col.visible).map((column) => (
          <TableCell
            key={column.id}
            //@ts-ignore
            sortDirection={sortConfig.key === column.id ? sortConfig.direction : false}
            sx={{ whiteSpace: 'nowrap' }}
          >
            {column.sortable ? (
              <TableSortLabel
                active={sortConfig.key === column.id}
                direction={sortConfig.key === column.id ? (sortConfig.direction || 'asc') : 'asc'}
                onClick={() => handleSortRequest(column.id)}
              >
                {column.label}
              </TableSortLabel>
            ) : (
              column.label
            )}
          </TableCell>
        ))}
        {/* Actions column header */}
        <TableCell sx={{ whiteSpace: 'nowrap', fontWeight: 700 }}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;