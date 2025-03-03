//auth slice


import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: { user: null, role: null, isLoggedIn: false, isAuthLoading: true },
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
            state.isLoggedIn = true;
            state.isAuthLoading = false;

        },

        logout: (state, action) => {
            state.user = null;
            state.role = null;
            state.isLoggedIn = false;
            state.isAuthLoading = false;
        },
        setLoading: (state) => {
            state.isAuthLoading = true; // Set loading to true
        },

        unsetLoading: (state) => {
            state.isAuthLoading = false; // Set loading to false
        }
    }
})


export const { setLoading, unsetLoading, login, logout } = authSlice.actions
export default authSlice.reducer;