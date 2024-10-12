import { configureStore } from '@reduxjs/toolkit';
import elevatorReducer from './elevator';

export const store = configureStore({
  reducer: {
    elevator: elevatorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;