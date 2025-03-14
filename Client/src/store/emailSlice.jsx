//auth slice


import { createSlice } from "@reduxjs/toolkit";



const emailSlice = createSlice({
    name: "email",
    initialState: { email: null },
    reducers: {

        updateEmail: (state, action) => {
            state.email = action.payload;
         

        },

     

       
    }
})


export const { updateEmail} = emailSlice.actions
export default emailSlice.reducer;
