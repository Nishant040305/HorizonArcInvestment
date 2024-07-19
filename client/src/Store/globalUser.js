import { createSlice } from "@reduxjs/toolkit";

import { globalUsers } from "../Reducer/AllUserReducer";

const globalUserSlice = createSlice(
    {
        name:'globalUsers',
        initialState:[],
        reducers:{
            setglobalUser:globalUsers,
        }
    }
)

export const {setglobalUser} = globalUserSlice.actions;

export default globalUserSlice.reducer;