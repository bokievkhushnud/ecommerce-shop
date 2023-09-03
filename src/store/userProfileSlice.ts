import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isEditMode: false,
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    toggleEditMode: (state) => {
      state.isEditMode = !state.isEditMode;
    },
  },
});

export const { toggleEditMode } = userProfileSlice.actions;

export default userProfileSlice.reducer;
