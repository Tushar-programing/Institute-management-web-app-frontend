import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authslice'
import branchSlice from "./branchSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        branch: branchSlice,
    }
})

export default store;
