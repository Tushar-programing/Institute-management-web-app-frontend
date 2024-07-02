import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    branchId: null,
}

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        branchData: (state, action) => {
            state.branchId = action.payload;
        }
    }
})

export const {branchData} = branchSlice.actions;

export default branchSlice.reducer;
