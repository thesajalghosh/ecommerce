import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem("cart"));
const initialState = {
  storeCart: cart || [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setStoreCart: (state, { payload }) => {
      console.log("payload", payload);
      state.storeCart = payload;
      let temp = state.storeCart;
      localStorage.setItem("cart", JSON.stringify(temp));
    },
    setRemoveCart: (state, { payload }) => {
      state.storeCart = payload;
      let temp = state.storeCart;
      localStorage.setItem("cart", JSON.stringify(temp));
    },
  },
});

export const { setStoreCart, setRemoveCart, updateStoreCart } =
  cartSlice.actions;

export default cartSlice.reducer;
