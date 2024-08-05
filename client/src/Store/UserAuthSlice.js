import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "../Reducer/UserAuthReducer";
const userSlice = createSlice({
    name:"user",
    initialState:null,
    reducers:{
        register:setUser,
    }
})
export const {register} = userSlice.actions;
export default userSlice.reducer;