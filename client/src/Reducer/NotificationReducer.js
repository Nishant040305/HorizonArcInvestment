export const NotificationReducer = (state,action)=>{
    switch(action.type){
        case 'notification/setNotification':
            return action.payload;
        case 'notification/addNotification':
            state.push(action.payload);
            return state;
        case 'notification/removeNotification':
            state.splice(action.payload,1);
        default:
            return state;
    }
}