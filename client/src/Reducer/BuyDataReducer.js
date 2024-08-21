import { locationFilter } from "../Lib/Filter";

export const setBuyDataLand=(state,action)=>{
    switch(action.type){
        case "buyData/setBuyData":
            return action.payload;

        case "buyData/setOneBuyData":
            state.push(action.payload);
            return state;

        case "buyData/delBuyData":
            const index = state.indexOf(action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return state;
        case "buyData/configData":
            const plainBuyArray = state.map(item => ({ ...item }));
            const buy = locationFilter(action.payload, plainBuyArray)
            return buy;
        default:
            return state;
    }
}