let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
import axios from "axios";
const AddItemBackend =async(shortListID,_id)=>{
    try{
        console.log(`${BACKWEB}/buyTab/addItemShortlist`);
        const response = await axios.post(`${BACKWEB}/buyTab/addItemShortlist`,{
          shortListID:shortListID,_id:_id,
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
      if(response.status ===200){
        console.log("yess")
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
            console.log(response.data.message);
          }
        })
        }
        catch(e){
            console.log(e)
    
        }}
    
export const setShortlistReducer = (state,action)=>{
    switch (action.type) {
        case 'shortList/setShortlist':
            console.log("yes");
            const data = {data:action.payload,dataLength:(action.payload).length};
            return data;
            break;
        case 'shortList/addShortlist':
            const index  = state.data.findIndex(x=>x._id = action.payload.land._id);
            if(index===-1){
                state.data.push(action.payload.land);
                state.dataLength++;
                console.log(action.payload.user,action.payload.land._id);
                AddItemBackend(action.payload.user,action.payload.land._id);
            }

            return state;
        case 'shortList/removeShortlist':
            const index_  = state.data.findIndex(x=>x._id = action.payload._id);
            if(index_!=-1){
                state.data.splice(index_,1);
                state.dataLength--;
            }
            removeItemBackend(action.payload.user,action.payload._id);
            return state;
        default:
            break;
    }
}