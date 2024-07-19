import { createSlice } from "@reduxjs/toolkit";
import { setBuyDataLand } from "../Reducer/BuyDataReducer";
const BuyDataSlice = createSlice({
    name:"buyData",
    initialState:[],
    reducers:{
        setBuyData: setBuyDataLand,
    }
})
export const {setBuyData} = BuyDataSlice.actions;
export default BuyDataSlice.reducer;