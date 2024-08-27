import {createSlice} from '@reduxjs/toolkit';
import { MessageReducer } from '../Reducer/MessageReducer';
const MessageSlice = createSlice({
    name:'message',
    initialState:{message:null,chatRoom:null,presentChat:0},
    reducers:{
        setMessage:MessageReducer,
        SendMessage:MessageReducer,
        Addmessage:MessageReducer,
        setpresentChat:MessageReducer,
        addUserChat:MessageReducer,
        updateSeenStatus:MessageReducer,
        deleteMessageIndex:MessageReducer,
        deleteMessageId:MessageReducer,
        deleteAllMessage:MessageReducer,
        deleteAllMessageIO:MessageReducer,
        deleteChatRoom:MessageReducer
    }
})

export const {deleteChatRoom,deleteAllMessage,deleteAllMessageIO,deleteMessageIndex,deleteMessageId,updateSeenStatus,addUserChat,setMessage,SendMessage,Addmessage,setpresentChat} = MessageSlice.actions;

export default MessageSlice.reducer;
