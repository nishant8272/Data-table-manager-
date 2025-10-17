'use client';

import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, Box } from '@mui/material';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { toggleTheme } from '@/store/slices/uiSlice';

const ThemeToggle: React.FC = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.ui.themeMode);

  return (
    <IconButton onClick={() => dispatch(toggleTheme())} color="inherit" size="large">
      {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};


const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static" color="transparent">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
          📊 Data Table Manager
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <ThemeToggle />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;