import { createSlice } from "@reduxjs/toolkit";
import { setDashBoardOption } from "../Reducer/DashBoardOptionReducer";
const DashBoardOptionSlice = createSlice({
    name:"dashboard",
    initialState:"profile",
    reducers:{
        change:setDashBoardOption,
    }
})

export const { change } = DashBoardOptionSlice.actions;

export default DashBoardOptionSlice.reducer;