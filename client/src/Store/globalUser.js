import { createSlice } from "@reduxjs/toolkit";

import { globalUsers } from "../Reducer/AllUserReducer";

const globalUserSlice = createSlice(
    {
        name:'globalUsers',
        initialState:{global:[],friends:[]},
        reducers:{
            setglobalUser:globalUsers,
            setFriends:globalUsers
        }
    }
)

export const {setglobalUser,setFriends} = globalUserSlice.actions;

export default globalUserSlice.reducer;