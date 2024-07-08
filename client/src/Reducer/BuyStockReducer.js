export const setLandReducer=(state,action)=>{
    console.log(action);
    switch (action.type) {
        case 'land/setLand':
            return action.payload;
            break;
    
        default:
            return state;
            break;
    }
}