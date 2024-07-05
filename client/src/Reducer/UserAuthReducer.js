export const setUser =(state,action)=>{
    switch (action.type) {
        case "user/register":
            return action.payload
            break;
        case "user/setImage":
            state.image=action.payload
            return state
        default:
            return state
            break;
    }
}

