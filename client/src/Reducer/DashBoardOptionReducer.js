export const setDashBoardOption =(state,action)=>{
    console.log(action)
    switch(action.type){
        case "dashboard/change":
            return action.payload;
        default:
            return state;
    }
}