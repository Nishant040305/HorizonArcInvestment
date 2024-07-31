import { PriceFilter,AreaFilter } from "../Lib/Filter";
import { useSelector } from "react-redux";
export const FilterReducer =(state,action)=>{

    switch (action.type) {
        case 'filterData/setBuyStockData':
            return action.payload;
            break;
        case 'filterData/setPriceFilterStocks':
            let data_ ={
                ...state,
                stock:PriceFilter(action.payload.filter,action.payload.data)
            }
            return data_;
        case 'filterData/setPriceFilterBuy':
            let data ={
                ...state,
                buy:PriceFilter(action.payload.filter,action.payload.data)
            }
            return data;
        case 'filterData/setAreaFilterStock':
            let data__ ={
                ...state,
                stock:AreaFilter(action.payload.filter,action.payload.data)
            }
            return data__;
        case 'filterData/setAreaFilterBuy':
            let data___ ={
                ...state,
                buy:AreaFilter(action.payload.filter,action.payload.data)
            }
            return data___;
        case 'filterData/setLocationFilterBuy':
            return state;
        case 'filterData/setLocationFilterStock':
            return state;
        case 'filterData/searchGlobalUser':
            state['globalUser'] = action.payload;
            return state;
        default:
            return state;
            break;
    }
}