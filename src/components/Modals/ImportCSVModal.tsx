'use client';

import React, { useState, useRef } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Alert, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setImportModalOpen } from '@/store/slices/uiSlice';
import { parseCSV } from '@/utils/csvParser';
import { setRows } from '@/store/slices/tableSlice';

const ImportCSVModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.importModalOpen);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClose = () => {
    dispatch(setImportModalOpen(false));
    setFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile);
    } else {
      setError('Please select a valid CSV file.');
      setFile(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('No file selected.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const newRows = await parseCSV(file);
      if (newRows.length === 0) {
        throw new Error('CSV file contains no valid data rows.');
      }
      dispatch(setRows(newRows));
      handleClose();
    } catch (e: unknown) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'Invalid file format.';
      setError(`Import failed. Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Import Data from CSV</DialogTitle>
      <DialogContent dividers>
        {loading && <LinearProgress sx={{ mb: 2 }} />}
        <Box sx={{ mb: 2 }}>
          <Button
            variant="contained"
            component="label"
            disabled={loading}
          >
            Choose CSV File
            <input
              type="file"
              accept=".csv"
              hidden
              onChange={handleFileChange}
              ref={fileInputRef}
            />
          </Button>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            {file ? `File selected: ${file.name}` : 'No file chosen (.csv only)'}
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          Note: Importing a new CSV will **replace** all existing table data.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={handleImport} color="primary" variant="contained" disabled={!file || loading}>
          Replace Data
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImportCSVModal;