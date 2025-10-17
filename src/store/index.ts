import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import tableReducer from './slices/tableSlice';
import filterReducer from './slices/filterSlice';
import uiReducer from './slices/uiSlice';

const tablePersistConfig = {
  key: 'table',
  storage,
  whitelist: ['columns'], 
};

const uiPersistConfig = {
  key: 'ui',
  storage,
  whitelist: ['themeMode'],
};

export const store = configureStore({
  reducer: {
    //@ts-expect-error - persistReducer type issue with Redux Toolkit
    table: persistReducer(tablePersistConfig, tableReducer),
    filter: filterReducer,
    //@ts-expect-error - persistReducer type issue with Redux Toolkit
    ui: persistReducer(uiPersistConfig, uiReducer), 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
        ignoredPaths: ['ui.confirmAction'], // Ignore function in state
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;