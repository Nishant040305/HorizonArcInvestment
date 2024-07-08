import { createSlice } from "@reduxjs/toolkit";

import {setLandReducer} from '../Reducer/BuyStockReducer';

const BuyStockSlice = createSlice({
    name:"land",
    initialState:{
        Area:{amount:1250,unit:"sqft"},
        Location:"Lehra, Prayagraj",
        Price:4000000,
        Category:"Residential/Plot"
    },
    reducers:{
        setLand:setLandReducer
    }
})

export const { setLand } = BuyStockSlice.actions;
export default BuyStockSlice.reducer;