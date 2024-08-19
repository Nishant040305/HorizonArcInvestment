export const setBuyDataLand=(state,action)=>{
    switch(action.type){
        case "buyData/setBuyData":
            return action.payload;

        case "buyStockPage/setOneBuyData":
            state.push(action.payload);
            return state;

        case "buyStockPage/delBuyData":
            const index = state.indexOf(action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
            return state;
        
        default:
            return state;
    }
}