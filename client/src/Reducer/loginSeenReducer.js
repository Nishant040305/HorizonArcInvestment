export const setSeenView = (state,action)=>{
    switch (action.type) {
        case "loginSeen/setSeen":
            return {...state,seen:action.payload};
            break;
        case "loginSeen/setSeenlog":
            return {...state,seenlog:action.payload};
            break;
        default:
            return state;
            break;
    }
}