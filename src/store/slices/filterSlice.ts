import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortConfig } from '@/types/table.types';

interface FilterState {
  searchQuery: string;
  sortConfig: SortConfig;
  currentPage: number;
  rowsPerPage: number;
}

const initialState: FilterState = {
  searchQuery: '',
  sortConfig: { key: 'name', direction: 'asc' },
  currentPage: 0,
  rowsPerPage: 10,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 0; // Reset to first page
    },
    setSortConfig: (state, action: PayloadAction<SortConfig>) => {
      state.sortConfig = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
      state.currentPage = 0;
    }
  },
});

export const { setSearchQuery, setSortConfig, setPage, setRowsPerPage } = filterSlice.actions;
export default filterSlice.reducer;