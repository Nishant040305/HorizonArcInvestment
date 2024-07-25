export const setShortlistReducer = async(state,action)=>{
    switch (action.type) {
        case 'shortList/setShortlist':
            return action.payload;
            break;
        case 'shortList/addShortlist':
            const index  = state.findIndex(x=>_id = action.payload._id);
            if(index!=-1){
                state.push(action.payload);
                
            }
            return state;
        case 'shortList/removeShortlist':
            const index_  = state.findIndex(x=>_id = action.payload._id);
            if(index!=-1){
                state.splice(index_,1);
                
            }
            return state;
        default:
            break;
    }
}