'use client';

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setColumnsModalOpen, closeConfirmModal } from '@/store/slices/uiSlice';
import { toggleColumnVisibility, addColumn, setColumns } from '@/store/slices/tableSlice';
import { TableColumn } from '@/types/table.types';
import { useForm } from 'react-hook-form';

// Separate component for adding a new column
const AddColumnForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<{ label: string }>();

  const onSubmit = (data: { label: string }) => {
    const newColumn: TableColumn = {
      id: data.label.toLowerCase().replace(/\s/g, '_'),
      label: data.label,
      visible: true,
      sortable: true,
      editable: true,
      type: 'text', // Default to text
    };
    dispatch(addColumn(newColumn));
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', gap: 1, mt: 2, alignItems: 'flex-start' }}>
      <TextField
        label="New Column Label"
        size="small"
        fullWidth
        {...register('label', { required: 'Label is required' })}
        error={!!errors.label}
        helperText={errors.label ? errors.label.message : 'e.g., Department, Location'}
      />
      <Button type="submit" variant="contained" sx={{ whiteSpace: 'nowrap', height: 40 }}>
        Add Field
      </Button>
    </Box>
  );
};

const ManageColumnsModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.columnsModalOpen);
  const columns = useAppSelector((state) => state.table.columns);

  const handleClose = () => {
    dispatch(setColumnsModalOpen(false));
  };

  const handleToggle = (id: string) => {
    dispatch(toggleColumnVisibility(id));
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Manage Table Columns</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>
          Column Visibility
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {columns.map((column) => (
            <FormControlLabel
              key={column.id}
              control={
                <Checkbox
                  checked={column.visible}
                  onChange={() => handleToggle(column.id)}
                />
              }
              label={column.label}
            />
          ))}
        </Box>

        <Typography variant="h6" gutterBottom>
          Add Custom Column
        </Typography>
        <AddColumnForm />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageColumnsModal;