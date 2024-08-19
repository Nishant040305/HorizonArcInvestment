import { createSlice } from "@reduxjs/toolkit";
import { setSeenView } from "../Reducer/loginSeenReducer";
const loginSeenSlice = createSlice({
    name:"loginSeen",
    initialState:{
        seen:0,
        seenlog:1,
    },
    reducers:{
        setSeen:setSeenView,
        setSeenlog:setSeenView,
    }
})
export const {setSeen,setSeenlog} = loginSeenSlice.actions;
export default loginSeenSlice.reducer;