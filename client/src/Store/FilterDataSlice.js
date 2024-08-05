import {createSlice} from "@reduxjs/toolkit";
import { FilterReducer } from "../Reducer/FilterDataReducer";
const FilterDataSlice = createSlice({
    name:"filterData",
    initialState:{stock:[],buy:[],globalUser:[]},
    reducers:{
        setBuyStockData:FilterReducer,
        setPriceFilterStocks:FilterReducer,
        setPriceFilterBuy:FilterReducer,
        searchGlobalUser:FilterReducer,
        setAreaFilterStock:FilterReducer,
        setAreaFilterBuy:FilterReducer
    }
})

export const {setAreaFilterStock,setAreaFilterBuy,setBuyStockData,searchGlobalUser,setPriceFilterBuy,setPriceFilterStocks} = FilterDataSlice.actions;

export default FilterDataSlice.reducer;