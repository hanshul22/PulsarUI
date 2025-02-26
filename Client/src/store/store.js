import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import codesReducer from './slices/codesSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    codes: codesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});