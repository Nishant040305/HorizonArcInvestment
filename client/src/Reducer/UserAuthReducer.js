export const setUser =(state,action)=>{
    switch (action.type) {
        case "user/register":
            const data_ = {
                ...action.payload,
                friends:[]
            }
            return data_
            break;
      
        default:
            return state
            break;
    }
}

