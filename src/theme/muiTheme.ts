import { createTheme} from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') => createTheme({
  palette: {
    mode,
    primary: { main: mode === 'light' ? '#1976d2' : '#90caf9' },
    background: {
      default: mode === 'light' ? '#f4f6f8' : '#121212',
      paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          backgroundColor: mode === 'light' ? '#e0e0e0' : '#2c2c2c',
          color: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : '#fff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: `1px solid ${mode === 'light' ? '#e0e0e0' : '#333'}`,
        }
      }
    }
  },
});