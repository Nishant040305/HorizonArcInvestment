import axios from "axios";
const sendMessage =async(Data)=>{
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    const response = await axios.post(`${BACKWEB}/chat/addMessages`,{
        payload:Data,
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
export const MessageReducer =(state,action)=>{
    switch(action.type){
        case 'message/Addmessage':
            action.payload;
                const State = {
                    ...state,
                    message: {
                        ...state.message,
                        [action.payload.ChatRoomId]: [
                            ...(state.message[action.payload.ChatRoomId] || []),
                            action.payload
                        ]
                    }
                };
                return State;
        case 'message/SendMessage':
            sendMessage(action.payload);
            
                const { ChatRoomId, ...messageData } = action.payload;
                const newState = {
                    ...state,
                    message: {
                        ...state.message,
                        [ChatRoomId]: [
                            ...(state.message[ChatRoomId] || []),
                            messageData
                        ]
                    }
                };
                return newState;
            
            
        case 'message/setMessage':
            state.message = action.payload.message;
            state.chatRoom = action.payload.chatRoom;
            state.presentChat = action.payload.chatRoom[0];
            return state;
        case 'message/setpresentChat':
            const data = {
                ...state,
                presentChat:state.chatRoom[action.payload]
            }
            return data;
        default:
            return state;
    }
}

/* action.payload

    {
        ChatRoomId
        message
        SenderId
        createdAt
    }

*/