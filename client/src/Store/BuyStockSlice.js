import { createSlice } from "@reduxjs/toolkit";

import {setLandReducer} from '../Reducer/BuyStockReducer';

const BuyStockSlice = createSlice({
    name:"stock",
    initialState:[],
    reducers:{
        setStock:setLandReducer,
        configDatastock:setLandReducer,
    }
})

export const {configDatastock, setStock } = BuyStockSlice.actions;
export default BuyStockSlice.reducer;