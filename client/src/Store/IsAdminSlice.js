import { createSlice } from "@reduxjs/toolkit";

const IsAdminSlice = createSlice({
    name: 'admin',
    initialState: false,
    reducers: {
        setAdmin: (state, action) => {
            return action.payload;
        }
    }
});

export default IsAdminSlice.reducer;
export const { setAdmin } = IsAdminSlice.actions;
