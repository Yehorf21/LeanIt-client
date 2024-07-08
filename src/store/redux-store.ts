import { configureStore } from '@reduxjs/toolkit';
import userSlice from './reducers/userReducer';
import cardsSlice from './reducers/cardsReducer';

export const store = configureStore({
  reducer: {
    user: userSlice,
    cards: cardsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;