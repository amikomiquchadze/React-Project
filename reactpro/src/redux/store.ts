// store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // ✅ Correct path

export const store = configureStore({
  reducer: {
    users: userReducer, // ✅ 'users' is the key for useSelector
  },
  devTools: true, // Optional: enables Redux DevTools explicitly
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
