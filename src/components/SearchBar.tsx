'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch, useAppSelector } from '@/store/hook';
import { setSearchQuery } from '@/store/slices/filterSlice';

const SearchBar: React.FC = () => {
  const dispatch = useAppDispatch();
  //@ts-ignore
  const initialQuery = useAppSelector((state) => state.filter.searchQuery);
  const [localQuery, setLocalQuery] = useState(initialQuery);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      // Only dispatch if the query has actually changed from the store's current value
      if (localQuery !== initialQuery) {
          dispatch(setSearchQuery(localQuery));
      }
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, dispatch, initialQuery]);

  return (
    <TextField
      label="Global Search"
      variant="outlined"
      size="small"
      value={localQuery}
      onChange={(e) => setLocalQuery(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ minWidth: 250 }}
    />
  );
};

export default SearchBar;