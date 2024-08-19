export const setDashBoardOption =(state,action)=>{
    switch(action.type){
        case "dashboard/change":
            return action.payload;
        default:
            return state;
    }
}