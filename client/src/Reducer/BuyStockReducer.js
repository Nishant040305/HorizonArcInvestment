import { locationFilter } from "../Lib/Filter";
export const setLandReducer=(state,action)=>{
    switch (action.type) {
        case 'stock/setStock':
            return action.payload;
            break;
        case "stock/configDatastock":
                const plainBuyArray = state.map(item => ({ ...item }));
                const data = locationFilter(action.payload, plainBuyArray)
                return data;
        case "stock/addShares":
            return [action.payload,...state];
        default:
            return state;
            break;
    }
}