'use client';

import React from 'react';
import { TablePagination as MuiTablePagination } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setPage, setRowsPerPage } from '@/store/slices/filterSlice';

interface TablePaginationProps {
  count: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({ count }) => {
  const dispatch = useAppDispatch();
  const { currentPage, rowsPerPage } = useAppSelector((state) => state.filter);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
  };

  return (
    <MuiTablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={currentPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};

export default TablePagination;