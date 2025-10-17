'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { store, persistor } from '@/store';
import { useAppSelector } from '@/store/hook';
import { getTheme } from '@/theme/muiTheme';
import { Fragment } from 'react';

// Theme provider wrapper to access Redux theme state
const ThemeSelector = ({ children }: { children: React.ReactNode }) => {
  const mode = useAppSelector((state) => state.ui.themeMode);
  const theme = getTheme(mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/* ThemeSelector is rendered inside PersistGate to ensure themeMode is loaded */}
        <ThemeSelector>
          {children}
        </ThemeSelector>
      </PersistGate>
    </Provider>
  );
}