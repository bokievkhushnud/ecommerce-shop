import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemsQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    updateCartQuantity: (state, action) => {
      state.itemsQuantity = action.payload;
    },
  },
});

export const { updateCartQuantity } = cartSlice.actions;

export default cartSlice.reducer;
