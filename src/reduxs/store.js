import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import languageSlice from './languageSlice';

export const store = configureStore({
  reducer: {
    user:userReducer,
    language:languageSlice,
  },
});