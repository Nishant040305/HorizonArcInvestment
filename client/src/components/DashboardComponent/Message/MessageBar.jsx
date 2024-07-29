import React from 'react'
import './MessageBar.css';
import { useDispatch, useSelector } from 'react-redux';
import { setpresentChat } from '../../../Store/MessageSlice';
const MessageBlock =(props)=>{
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch()
    const chatpres = useSelector(state=>state.message);

    const ChangeRoom =(index)=>{
        dispatch(setpresentChat(index))
    }
    return(
    <div className='Message-block' onClick={()=>ChangeRoom(props.data)}>
        <img className="rounded-full w-10 h-10"src={props.image}></img> 
        <div className='Message-Block-name'><strong>{props.name}</strong></div>
        <div className='flex flex-col'>
        <div className='Message-block-timestamp'><small>17:30</small></div>
        <div className='bg-green-500 rounded-circle text-white' style={{fontSize:13,width:25,height:25,textAlign:'center'}}>28</div>
        </div>
     
    </div>)
}
const MessageBar = () => {
    const user = useSelector(state=>state.user);
    const chatRoom = useSelector(state=>state.message);
    console.log(chatRoom);
    const chatUser = chatRoom.chatRoom;
  return (
    <div className='Message-bar p25'>
        <div style={{fontSize:28,textAlign:'left',paddingLeft:20,fontWeight:600,paddingBottom:20}}>Messages</div>
        <input className='message-user-search' placeholder='      Search...'></input>
        <div className='Message-bar'>
        {chatUser.map((info, index) => (
              
              <MessageBlock 
                  key={info._id || index} 
                  chatRoomId = {info._id}
                  image={info.ChatIcon=='NULL'?(user._id==info.users[0]?info.usersImage[1]:info.usersImage[0]):user.ChatIcon}
                  name={info.ChatIcon=='NULL'?(user._id==info.users[0]?info.userUsername[1]:info.userUsername[0]):user.ChatIcon}
                  icon = {info.ChatIcon}
                  data = {index}
              />
              ))}
      
        </div>
      
    </div>
  )
}

export default MessageBar
