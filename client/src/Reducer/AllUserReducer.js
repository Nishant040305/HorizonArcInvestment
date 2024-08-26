export const globalUsers = (state,action)=>{
    switch(action.type){
        case 'globalUsers/setglobalUser':
            let data_={
                ...state,
                global:action.payload,
            }
            let dataUser = {};
            for(let i=0;i<data_.global.length;i++){
                dataUser[data_.global[i]._id] = data_.global[i];
            }
            data_={
                ...data_,
                Users:dataUser,
            }
            return data_;
        case "globalUsers/setFriends":
            const data={
                ...state,
                friends:action.payload
            }
                return data;
        case "globalUsers/addFriend":
            state.friends.push(action.payload)
            return state;
        default:
            return state;
    }
}