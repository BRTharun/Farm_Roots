import { createSlice } from "@reduxjs/toolkit";

const mainCategorySlice = createSlice({
  name: "mainCategory", // Simplified name to avoid spaces
  initialState: [], // Initial state as an empty array
  reducers: {
    setMainCategory: (state, action) => {
      console.log("Updating state with payload:", action.payload);
      return action.payload; // Directly set the state to the new payload
    },
  },
});

export default mainCategorySlice.reducer; // Exporting the reducer function directly
export const { setMainCategory } = mainCategorySlice.actions; // Exporting actions
