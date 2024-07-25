import { createSlice } from "@reduxjs/toolkit";

import {setShortlistReducer} from '../Reducer/ShortlistReducer';

const ShortlistSlice = createSlice({
    name:"shortList",
    initialState:[],
    reducers:{
        setShortlist:setShortlistReducer,
        addShortlist:setShortlistReducer,
        removeShortlist:setShortlistReducer
    }
})

export const {setShortlist,removeShortlist,addShortlist} = ShortlistSlice.actions;
export default ShortlistSlice.reducer;