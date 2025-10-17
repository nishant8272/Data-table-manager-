import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ThemeMode = 'light' | 'dark';

interface UIState {
  themeMode: ThemeMode;
  importModalOpen: boolean;
  columnsModalOpen: boolean;
  confirmModalOpen: boolean;
  confirmAction: (() => void) | null;
  confirmMessage: string;
}

const initialState: UIState = {
  themeMode: 'light',
  importModalOpen: false,
  columnsModalOpen: false,
  confirmModalOpen: false,
  confirmAction: null,
  confirmMessage: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    },
    setImportModalOpen: (state, action: PayloadAction<boolean>) => {
      state.importModalOpen = action.payload;
    },
    setColumnsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.columnsModalOpen = action.payload;
    },
    openConfirmModal: (state, action: PayloadAction<{ message: string, action: () => void }>) => {
      state.confirmModalOpen = true;
      state.confirmMessage = action.payload.message;
      state.confirmAction = action.payload.action;
    },
    closeConfirmModal: (state) => {
      state.confirmModalOpen = false;
      state.confirmAction = null;
      state.confirmMessage = '';
    }
  },
});

export const {
  toggleTheme, setImportModalOpen, setColumnsModalOpen, openConfirmModal, closeConfirmModal
} = uiSlice.actions;

export default uiSlice.reducer;