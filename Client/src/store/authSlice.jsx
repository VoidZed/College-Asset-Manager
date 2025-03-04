//auth slice


import { createSlice } from "@reduxjs/toolkit";
import { validateSession } from './validateSession'; // Import the validateSession function


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

        logout: (state) => {
            state.user = null;
            state.role = null;
            state.isLoggedIn = false;
            state.isAuthLoading = false;
        },

        validateSession: (state, action) => {
            if (!action.payload.isValid) {
                state.user = null;
                state.role = null;
                state.isLoggedIn = false;
            }

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
