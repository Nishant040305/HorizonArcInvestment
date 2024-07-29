export const setUser =(state,action)=>{
    switch (action.type) {
        case "user/register":
            return action.payload
            break;
        case "user/setFriend":
            const data={
                ...state,
                friends:action.payload
            }
            return data
        default:
            return state
            break;
    }
}

