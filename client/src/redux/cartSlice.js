import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
