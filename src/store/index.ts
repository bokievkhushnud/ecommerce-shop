import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userProfileReducer from './userProfileSlice';
import cartReduces from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    cart: cartReduces,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
