// userLogin.ts (or similar file)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await axios.post('https://localhost:7116/api/CustomerLogin/login', credentials);
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const loginVendor = createAsyncThunk(
    'user/loginVendor',
    async (credentials: { email: string, password: string }, thunkAPI) => {
        try {
            const response = await axios.post('https://localhost:7116/api/VendorLogin/login', credentials);
            return response.data;
        } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userLogin:null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userLogin = action.payload;
                console.log(action.payload);
                localStorage.setItem('role', action.payload.role); // Save role to localStorage
            })
            .addCase(loginUser.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(loginVendor.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginVendor.fulfilled, (state, action) => {
                state.loading = false;
                state.userLogin = action.payload;
                localStorage.setItem('role', action.payload.role); // Save role to localStorage
            })
            .addCase(loginVendor.rejected, (state:any, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;