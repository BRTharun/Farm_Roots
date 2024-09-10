import { createSlice } from "@reduxjs/toolkit";

interface HeaderState {
    loginComponent: boolean;
};


const initialState: HeaderState = {
    loginComponent: false,
};

// create a slice with typed state

const headerSlice = createSlice({
    name: "hold the state to open login card",
    initialState,
    reducers: {
        setLoginComponent : (state) => {
            state.loginComponent = true;
        },
        hideLoginComponent : (state) => {
            state.loginComponent = false;
        },
    },
});

export default headerSlice.reducer;

export const {setLoginComponent, hideLoginComponent} = headerSlice.actions;