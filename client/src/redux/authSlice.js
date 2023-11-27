import { createSlice } from "@reduxjs/toolkit";

const userData = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
console.log(userData);

const initialState = {
  user: userData || null,
  token: token || "",
};
console.log(initialState);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;

// extraReducers:(builder)=>{
//     // login
//     builder.addCase(userLogin.pending, (state)=>{
//         state.loading = true;
//         state.error = null;
//     });
//     builder.addCase(userLogin.fulfilled, (state, {payload})=>{
//         state.loading = false;
//         state.user = payload.user;
//         state.token = payload.token;
//     });
//     builder.addCase(userLogin.rejected, (state, {payload})=>{
//         state.loading = false;
//         state.error = payload;
//     })
//   }
