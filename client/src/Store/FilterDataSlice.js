import {createSlice} from "@reduxjs/toolkit";
import { FilterReducer } from "../Reducer/FilterDataReducer";
const FilterDataSlice = createSlice({
    name:"filterData",
    initialState:{stock:[],buy:[],globalUser:''},
    reducers:{
        setBuyStockData:FilterReducer,
        searchGlobalUser:FilterReducer
    }
})

export const {setBuyStockData,searchGlobalUser} = FilterDataSlice.actions;

export default FilterDataSlice.reducer;