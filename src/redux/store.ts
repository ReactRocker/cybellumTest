import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import inputSlice from './slices/inputReducer';
import authSlice from './slices/auth';
export const store = configureStore({
  reducer: {
    inputSlice,
    authSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
