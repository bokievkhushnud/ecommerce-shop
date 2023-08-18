import { createSlice } from '@reduxjs/toolkit';
import { checkUserAuthentication } from '../../utils/auth';
import { AuthState } from '../../types';

const initialState: AuthState = {
  isLoggedIn: checkUserAuthentication(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = undefined;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
