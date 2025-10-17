import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TableRow, TableColumn, SortConfig } from '@/types/table.types';

// Dummy data for initial state
const initialRows: TableRow[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', age: 30, role: 'Engineer', department: 'R&D' },
  { id: '2', name: 'Bob', email: 'bob@example.com', age: 24, role: 'Designer', location: 'Remote' },
  { id: '3', name: 'Charlie', email: 'charlie@example.com', age: 45, role: 'Manager', department: 'HR' },
];

interface TableState {
  rows: TableRow[];
  columns: TableColumn[];
  editingRowId: string | null; // For single-row inline editing
}

const initialState: TableState = {
  rows: initialRows,
  columns: [
    { id: 'name', label: 'Name', visible: true, sortable: true, editable: true, type: 'text' },
    { id: 'email', label: 'Email', visible: true, sortable: true, editable: true, type: 'email' },
    { id: 'age', label: 'Age', visible: true, sortable: true, editable: true, type: 'number' },
    { id: 'role', label: 'Role', visible: true, sortable: true, editable: true, type: 'text' },
    { id: 'department', label: 'Department', visible: false, sortable: true, editable: true, type: 'text' },
    { id: 'location', label: 'Location', visible: false, sortable: true, editable: true, type: 'text' },
  ],
  editingRowId: null,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setRows: (state, action: PayloadAction<TableRow[]>) => {
      state.rows = action.payload;
    },
    addRow: (state, action: PayloadAction<TableRow>) => {
      state.rows.push(action.payload);
    },
    updateRow: (state, action: PayloadAction<TableRow>) => {
      const index = state.rows.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.rows[index] = { ...state.rows[index], ...action.payload };
      }
    },
    deleteRow: (state, action: PayloadAction<string>) => {
      state.rows = state.rows.filter(r => r.id !== action.payload);
    },
    toggleColumnVisibility: (state, action: PayloadAction<string>) => {
      const column = state.columns.find(c => c.id === action.payload);
      if (column) column.visible = !column.visible;
    },
    addColumn: (state, action: PayloadAction<TableColumn>) => {
      state.columns.push(action.payload);
    },
    setColumns: (state, action: PayloadAction<TableColumn[]>) => {
      state.columns = action.payload;
    },
    setEditingRowId: (state, action: PayloadAction<string | null>) => {
      state.editingRowId = action.payload;
    }
  },
});

export const {
  setRows, addRow, updateRow, deleteRow, toggleColumnVisibility, addColumn, setColumns, setEditingRowId
} = tableSlice.actions;

export default tableSlice.reducer;