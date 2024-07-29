import React,{useRef, useState,useEffect} from 'react'
import './MessageData.css';
import { useDispatch, useSelector } from 'react-redux';
import { SendMessage } from '../../../Store/MessageSlice';
import { socket } from '../../../Lib/socket';
const MessageWrite=()=>{
  const dispatch = useDispatch();
  const chat = useSelector(state=>state.message)
  const user = useSelector(state=>state.user);
  const [text,setText] = useState('');
    const handleChange =(e)=>{
      setText(e.target.value);
    }
    const sendMessageFunc =(e)=>{
      if(text!=''){
        dispatch(SendMessage({ChatRoomId:chat.presentChat._id,message:text,SenderId:user._id,createdAt:Date.now()}))
        setText('')
        socket.emit('message',{ChatRoomId:chat.presentChat._id,message:text,SenderId:user._id,createdAt:Date.now()});
       
      }
    }
    return(
        <div className='MessageData-type bg-slate-200'>
            <input type="text" className='bg-white text-black' placeholder='Type a message' value={text} onChange ={(e)=>handleChange(e)} onKeyDown={(e) => {
    if (e.key === 'Enter') {
      sendMessageFunc(e);
    }
  }}></input>
        </div>
    )
}
const Message_Send =(props)=>{
  return(
    <div className='width-100'>
<div className={`Messages-send  text-black ${props.user-'0'?"float-right bg-green-200":"float-left bg-yellow-50"}`}>
      {props.text}
    </div>
    </div>
    
  )
}
const MessageData = () => {
    const chat = useSelector(state=>state.message);
    const user = useSelector(state=>state.user);
    const image = chat.presentChat.ChatIcon=='NULL'?(user._id==chat.presentChat.users[0]?chat.presentChat.usersImage[1]:chat.presentChat.usersImage[0]):chat.presentChat.ChatIcon;
    const name = chat.presentChat.ChatIcon=='NULL'?(user._id==chat.presentChat.users[0]?chat.presentChat.userUsername[1]:chat.presentChat.userUsername[0]):chat.presentChat.ChatIcon;
    const messageAreaRef = useRef(null);

  useEffect(() => {
    if (messageAreaRef.current) {
      messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight;
    }
  }, [chat.message[chat.presentChat._id]]);
  return (
     
    <div className='MessageData '>
      <div className='MessageData-head bg-slate-100'><img src={image} className='rounded-full w-16 h-16'/>{name}</div>
      <div className='MessageArea' ref={messageAreaRef}>
      {chat.message[chat.presentChat._id].map((info,index)=>(
     
        <Message_Send key={index} text={info.message} user={info.SenderId===user._id}></Message_Send>

  ))}
   </div>

      <MessageWrite></MessageWrite>
    </div>
  )
}

export default MessageData
