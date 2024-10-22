import axios from "axios";
import {socket} from '../Lib/socket'
let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

const sendMessage =async(Data)=>{
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
const DeleteMessage =async(Data)=>{
    console.log("yep")
    const response = await axios.post(`${BACKWEB}/chat/deleteMessage`,{
        _id:Data,
        headers: {
            'Accept': 'application/json',
        },
        mode:"cors",
        withCredentials:true
  
    }).then(response=>{
        if(response===200){
            return 1;
        }
        else{
            return 0;
        }
    })
}
const DeleteAllMessage = async(Data)=>{
    const response = await axios.post(`${BACKWEB}/chat/deleteAllChats`,{
        ChatRoomId:Data,
        headers: {
            'Accept': 'application/json',
        },
        mode:"cors",
        withCredentials:true
  
    }).then(response=>{
        if(response===200){
            return 1;
        }
        else{
            return 0;
        }
    })
}
export const MessageReducer =(state,action)=>{
    switch(action.type){
        case 'message/Addmessage':
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
            const chatRoomId = action.payload;
            const presentChat = state.chatRoom.find(chat => chat._id === chatRoomId);      
            const data = {
                ...state,
                presentChat:presentChat,
            }
            return data;
        case 'message/addUserChat':
            const data_={
                ...state,
                chatRoom:[
                    ...state.chatRoom,
                    action.payload,
                ],
                message:{
                    ...state.message,
                    [action.payload._id]:[]
                }
            }
            return data_;
        case 'message/markAsSeen':
            const { messageId, userId } = action.payload;
            return {
                ...state,
                message: {
                    ...state.message,
                    [action.payload.ChatRoomId]: state.message[action.payload.ChatRoomId].map(msg => 
                        msg._id === messageId ? 
                        { ...msg, isSeen: [...msg.isSeen, userId] } : 
                        msg
                    )
                }
            };
            case 'message/updateSeenStatus':

            // Create a new state object to hold the updated messages
                    const updatedMessages = { ...state.message };
                    // Iterate over each message in the payload
                    action.payload.forEach(msg => {
                        // Get the current messages for the chat room
                        const chatRoomMessages = updatedMessages[msg.ChatRoomId] || [];
                
                        // Update the specific message's `isSeen` status
                        updatedMessages[msg.ChatRoomId] = chatRoomMessages.map(message =>
                            message._id === msg._id ?
                                { ...message, isSeen: msg.isSeen } :
                                message
                        );
                    });
                
                    return {
                        ...state,
                        message: updatedMessages
                    };
            case "message/deleteMessageIndex":                
                    DeleteMessage(action.payload._id);
                    
                    // Create a copy of the current state's messages for the specific ChatRoomId
                    const newMessages = [...state.message[action.payload.ChatRoomId]];
                
                    // Remove the message at the specified index
                    newMessages.splice(action.payload.index, 1);
                    socket.emit('message-delete',{ChatRoomId:action.payload.ChatRoomId,_id:action.payload._id})
                    // Return a new state object with the updated messages array
                    return {
                        ...state,
                        message: {
                            ...state.message,
                            [action.payload.ChatRoomId]: newMessages
                        }
                    };
        case "message/deleteMessageId":
                        return {
                            ...state,
                            message: {
                                ...state.message,
                                [action.payload.ChatRoomId]: state.message[action.payload.ChatRoomId].filter(x => x._id !== action.payload._id)
                            }
                        };
        case "message/deleteAllMessage":
            DeleteAllMessage(action.payload);
            return {
                ...state,
                message:{
                    ...state.message,
                    [action.payload]:[]
                }
            }
        case "message/deleteAllMessageIO":
            return {
                ...state,
                message:{
                    ...state.message,
                    [action.payload]:[]
                }
            }
            case "message/deleteChatRoom":
                let presentChat_ = state.presentChat;
                if (presentChat_._id == action.payload.ChatRoomId) {
                    if (state.chatRoom.length == 1) {
                        presentChat_ = 0;
                    } else {
                        presentChat_ = state.chatRoom[0]._id == action.payload.ChatRoomId
                            ? state.chatRoom[1]
                            : state.chatRoom[0];
                    }
                }
                const newChatRooms = state.chatRoom.filter((item) => item._id !== action.payload.ChatRoomId);
                const newMessages_ = { ...state.message };
                delete newMessages_[action.payload.ChatRoomId];
            
                return {
                    ...state,
                    presentChat: presentChat_,
                    chatRoom: newChatRooms,
                    message: newMessages_
                };
            
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