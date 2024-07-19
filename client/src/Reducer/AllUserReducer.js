export const globalUsers = (state,action)=>{
    switch(action.type){
        case 'globalUsers/setglobalUser':
            return action.payload;
        default:
            return state;
    }
}