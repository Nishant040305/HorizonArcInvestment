export const FilterReducer =(state,action)=>{
    console.log(action.type);
    switch (action.type) {
        case 'filter/setBuyStockData':
            return state;
            break;
        case 'filter/setPriceFilterStocks':
            return state;
        case 'filter/setPriceFilterBuy':
            return state;
        case 'filter/setAreaFilterStock':
            return state;
        case 'filter/setAreaFilterBuy':
            return state;
        case 'filter/setLocationFilterBuy':
            return state;
        case 'filter/setLocationFilterStock':
            return state;
        case 'filterData/searchGlobalUser':
            state.globalUser = action.payload;
            return state;
        default:
            return state;
            break;
    }
}