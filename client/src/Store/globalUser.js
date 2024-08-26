import { createSlice } from "@reduxjs/toolkit";

import { globalUsers } from "../Reducer/AllUserReducer";

const globalUserSlice = createSlice(
    {
        name:'globalUsers',
        initialState:{global:[],friends:[],Users:{}},
        reducers:{
            setglobalUser:globalUsers,
            setFriends:globalUsers,
            addFriend:globalUsers
        }
    }
)

export const {addFriend,setglobalUser,setFriends} = globalUserSlice.actions;

export default globalUserSlice.reducer;