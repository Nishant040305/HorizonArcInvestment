import {createSlice} from '@reduxjs/toolkit';
import { MessageReducer } from '../Reducer/MessageReducer';
const MessageSlice = createSlice({
    name:'message',
    initialState:{message:null,chatRoom:null,presentChat:0},
    reducers:{
        setMessage:MessageReducer,
        SendMessage:MessageReducer,
        Addmessage:MessageReducer,
        setpresentChat:MessageReducer
    }
})

export const {setMessage,SendMessage,Addmessage,setpresentChat} = MessageSlice.actions;

export default MessageSlice.reducer;