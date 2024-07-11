import React from 'react'
import './MessageData.css';
import { useSelector } from 'react-redux';
const MessageWrite=()=>{
    return(
        <div className='MessageData-type bg-slate-200'>
            <input type="text" className='bg-white text-black' placeholder='Type a message'></input>
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
    const user = useSelector(state=>state.user);
  return (
     
    <div className='MessageData '>
      <div className='MessageData-head bg-slate-100'><img src={user.image} className='rounded-full w-16 h-16'/>Nishant Mohan</div>
      <div className='MessageArea'>
        <Message_Send text="hello there my name is nishant mohan" user="1"></Message_Send>
        <Message_Send text="hello there my name is nishant mohan" user="0"></Message_Send>

      </div>
      <MessageWrite></MessageWrite>
    </div>
  )
}

export default MessageData
