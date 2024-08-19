export const globalUsers = (state,action)=>{
    switch(action.type){
        case 'globalUsers/setglobalUser':
            const data_={
                ...state,
                global:action.payload,
            }
            return data_;
        case "globalUsers/setFriends":
            const data={
                ...state,
                friends:action.payload
            }
                return data;
        default:
            return state;
    }
}