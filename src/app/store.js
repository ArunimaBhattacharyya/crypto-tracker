import { configureStore } from '@reduxjs/toolkit';
import assetsReducer from '../assets/assetsSlice';

export const store = configureStore({
    reducer: {
        assets: assetsReducer,
    },
});