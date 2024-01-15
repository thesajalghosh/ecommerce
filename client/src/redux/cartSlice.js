import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  storeCart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setStoreCart: (state, { payload }) => {
      state.storeCart = payload;
    },
  },
});

export const { setStoreCart } = cartSlice.actions;

export default cartSlice.reducer;
