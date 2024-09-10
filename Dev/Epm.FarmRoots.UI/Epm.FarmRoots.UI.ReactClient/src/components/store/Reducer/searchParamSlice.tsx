import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchParamState {
    param : string;
}

const initialState: SearchParamState = {
    param: "",
};


const searchParamSlice = createSlice({
    name : "search param",
    initialState, 
    reducers : {
        setSearchParam: (state, action: PayloadAction<string>) => {
            state.param = action.payload;
        },
        clearSearchParam: (state) => {
            state.param = "";
        }, 
    },
});

export default searchParamSlice.reducer;
export const {setSearchParam, clearSearchParam} = searchParamSlice.actions;