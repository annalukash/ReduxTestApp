import {createSlice, createAsyncThunk, AsyncThunk} from '@reduxjs/toolkit';
import ILogin from "../interfaces/ILogin.ts";
import { enterUserCredentials } from "./actions.ts";

export const fetchLogin= createAsyncThunk('toggleLogin', async (isLoggedIn: boolean): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            resolve(isLoggedIn);
        }, 2000);
    });
});

const initialState: ILogin = {
    username: '',
    password: '',
    isLoggedIn: false,
    loginError: '',
    loading: false,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        enterUserCredentialsAction: enterUserCredentials,
    },
    extraReducers: builder => {
        builder.addCase(fetchLogin.pending, state => {
            state.isLoggedIn = false;
            state.loading = true;
        })
        builder.addCase(fetchLogin.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload;
            state.loading = false;
        })
        builder.addCase(fetchLogin.rejected, state => {
            state.isLoggedIn = false;
            state.loading = false;
        })
    }
});

export const { enterUserCredentialsAction } = loginSlice.actions;

export default loginSlice.reducer;
