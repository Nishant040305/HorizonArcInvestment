export const setLandReducer=(state,action)=>{
    switch (action.type) {
        case 'stock/setStock':
            return action.payload;
            break;
    
        default:
            return state;
            break;
    }
}