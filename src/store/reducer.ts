import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import ILogin from '../interfaces/ILogin.ts';
import {enterUserCredentials} from './actions.ts';
import {usernamePasswordPairs} from '../data/username-password-pairs.ts';

export const fetchLogin = createAsyncThunk(
    'user/fetchLogin',
    async (
        loginData: {username: string; password: string},
        {rejectWithValue},
    ) => {
        try {
            return await login(loginData);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    },
);

const login = async (loginData: {username: string; password: string}) => {
    return new Promise((resolve, reject) => {
        const user = usernamePasswordPairs.find(
            pair =>
                pair.username === loginData.username &&
                pair.password === loginData.password,
        );

        setTimeout(() => {
            if (user) {
                resolve({isLoggedIn: true});
            } else {
                reject(new Error('Username or password is incorrect'));
            }
        }, 2000);
    });
};

export const fetchLogout = createAsyncThunk(
    'logout',
    async (): Promise<void> => {
        return new Promise(resolve => {
            setTimeout(async () => {
                resolve();
            }, 2000);
        });
    },
);

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
        });
        builder.addCase(fetchLogin.fulfilled, (state) => {
            state.isLoggedIn = true;
            state.loading = false;
            state.loginError = '';
            state.username = '';
            state.password = '';
        });
        builder.addCase(fetchLogin.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.loading = false;
            state.loginError = action?.payload || action?.error?.message || '';
            state.username = '';
            state.password = '';
        });
        builder.addCase(fetchLogout.pending, state => {
            state.isLoggedIn = true;
            state.loading = true;
        });
        builder.addCase(fetchLogout.fulfilled, (state) => {
            state.isLoggedIn = false;
            state.loading = false;
        });
    },
});

export const {enterUserCredentialsAction} = loginSlice.actions;

export default loginSlice.reducer;
