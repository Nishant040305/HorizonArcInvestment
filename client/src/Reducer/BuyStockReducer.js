export const setLandReducer=(state,action)=>{
    switch (action.type) {
        case 'land/setLand':
            return action.payload;
            break;
    
        default:
            return state;
            break;
    }
}