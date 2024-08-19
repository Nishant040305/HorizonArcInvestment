export const setLocationReducer =(state,action)=>{
    switch (action.type) {
        case 'geoLocation/setLocation':
            return action.payload;
            break;
        
        default:
            return state;
            break;
    }
}