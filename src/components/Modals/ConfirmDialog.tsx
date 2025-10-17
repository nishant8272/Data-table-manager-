'use client';

import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { closeConfirmModal } from '@/store/slices/uiSlice';

const ConfirmDialog: React.FC = () => {
  const dispatch = useAppDispatch();
  const { confirmModalOpen, confirmMessage, confirmAction } = useAppSelector((state) => state.ui);

  const handleConfirm = () => {
    if (confirmAction) {
      confirmAction();
    }
    dispatch(closeConfirmModal());
  };

  const handleClose = () => {
    dispatch(closeConfirmModal());
  };

  return (
    <Dialog open={confirmModalOpen} onClose={handleClose}>
      <DialogTitle>Confirm Action</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{confirmMessage}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;