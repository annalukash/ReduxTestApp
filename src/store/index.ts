import { configureStore } from '@reduxjs/toolkit'
import loginSliceReducer from './reducer';

const store = configureStore({
    reducer: {
        login: loginSliceReducer,
    },
});

export default store;
