import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userProfileSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
