import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload; // Update user information
            state.isAuthenticated = true; // Mark user as authenticated
            state.isLoading = false;
        },
    },
});

export const {setUser} = authSlice.actions;
export default authSlice.reducer;