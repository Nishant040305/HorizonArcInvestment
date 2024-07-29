import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "../Reducer/UserAuthReducer";
const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        register:setUser,
        setFriend:setUser,
    }
})
export const {register,setFriend} = userSlice.actions;
export default userSlice.reducer;