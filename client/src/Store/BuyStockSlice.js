import { createSlice } from "@reduxjs/toolkit";

import {setLandReducer} from '../Reducer/BuyStockReducer';

const BuyStockSlice = createSlice({
    name:"stock",
    initialState:[],
    reducers:{
        setStock:setLandReducer
    }
})

export const { setStock } = BuyStockSlice.actions;
export default BuyStockSlice.reducer;