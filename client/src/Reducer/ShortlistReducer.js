let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
import axios from "axios";
const AddItemBackend =async(shortListID,_id)=>{
    try{
        const response = await axios.post(`${BACKWEB}/buyTab/addItemShortlist`,{
          shortListID:shortListID,_id:_id,
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
      if(response.status ===200){
      }
    })
    }
    catch(e){
        console.log(e);

    }}
const removeItemBackend =async(shortListID,_id)=>{
        try{
            const response = await axios.post(`${BACKWEB}/buyTab/removeItemShortlist`,{
              shortListID:shortListID,_id:_id,
                headers: {
                'Accept': 'application/json',
                
            },
            mode:"cors",
            withCredentials:true
    
        }).then(response=>{
          if(response.status ===200){
          }
        })
        }
        catch(e){
            console.log(e)
    
        }}
    
export const setShortlistReducer = (state,action)=>{
    switch (action.type) {
        case 'shortList/setShortlist':
            const data = action.payload;
            return data;
            break;
        case 'shortList/addShortlist':
            const index  = state.findIndex(x=>x == action.payload.land);
            if(index===-1){
                state.push(action.payload.land);
                AddItemBackend(action.payload.user,action.payload.land);
            }

            return state;
        case 'shortList/removeShortlist':
            const index_  = state.findIndex(x=>x== action.payload._id);
            if(index_!=-1){
                state.splice(index_,1);
            }
            removeItemBackend(action.payload.user,action.payload._id);
            return state;
        default:
            break;
    }
}