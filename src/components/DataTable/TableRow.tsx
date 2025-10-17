'use client';
import React, { useEffect } from 'react';
import { TableRow as MuiTableRow, TableCell, TextField, IconButton } from '@mui/material';
import { Save, Cancel, Delete, Edit } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { TableRow, TableColumn } from '@/types/table.types';
import { updateRow, setEditingRowId, deleteRow } from '@/store/slices/tableSlice';
import { openConfirmModal } from '@/store/slices/uiSlice';

interface TableRowProps {
  row: TableRow;
  columns: TableColumn[];
}

const DataTableBodyRow: React.FC<TableRowProps> = ({ row, columns }) => {
  const dispatch = useAppDispatch();
  const editingRowId = useAppSelector((state) => state.table.editingRowId);
  const isEditing = editingRowId === row.id;

  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<TableRow>({
    defaultValues: row,
  });

  useEffect(() => {
    reset(row);
  }, [row, reset]);

  const onSubmit = (data: TableRow) => {
    if (isDirty) {
      dispatch(updateRow(data));
    }
    dispatch(setEditingRowId(null));
  };

  const handleEditClick = () => {
    dispatch(setEditingRowId(row.id));
  };

  const handleCancelClick = () => {
    reset(row); 
    dispatch(setEditingRowId(null));
  };

  const handleDeleteClick = () => {
    dispatch(openConfirmModal({
      message: `Are you sure you want to delete the row for ${row.name}?`,
      action: () => dispatch(deleteRow(row.id)),
    }));
  };

  return (
    <MuiTableRow hover role="checkbox" tabIndex={-1} key={row.id} onDoubleClick={handleEditClick}>
      {columns.filter(col => col.visible).map((column) => (
        <TableCell key={column.id}>
          {isEditing && column.editable ? (
            <TextField
            //@ts-expect-error - react-hook-form register type issue with dynamic column keys
              {...register(column.id as keyof TableRow, {
                valueAsNumber: column.type === 'number',
                required: column.id === 'name',
                min: column.type === 'number' ? 0 : undefined,
                pattern: column.type === 'email' ? /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ : undefined,
              })}
              type={column.type}
              size="small"
              fullWidth
            />
          ) : (
            row[column.id]
          )}
        </TableCell>
      ))}

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {isEditing ? (
          <>
            <IconButton onClick={handleSubmit(onSubmit)} color="primary" size="small">
              <Save fontSize="inherit" />
            </IconButton>
            <IconButton onClick={handleCancelClick} color="warning" size="small">
              <Cancel fontSize="inherit" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={handleEditClick} color="info" size="small">
              <Edit fontSize="inherit" />
            </IconButton>
            <IconButton onClick={handleDeleteClick} color="error" size="small">
              <Delete fontSize="inherit" />
            </IconButton>
          </>
        )}
      </TableCell>
    </MuiTableRow>
  );
};

export default DataTableBodyRow;