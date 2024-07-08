import { createSlice } from "@reduxjs/toolkit";
import { setBuyData } from "../Reducer/BuyDataReducer";
const BuyDataSlice = createSlice({
    name:"buyData",
    initialState:[],
    reducers:{
        setBuyData: setBuyData,
    }
})

export default BuyDataSlice.reducer;