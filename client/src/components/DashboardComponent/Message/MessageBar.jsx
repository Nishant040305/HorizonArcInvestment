import React from 'react'
import './MessageBar.css';
import { useSelector } from 'react-redux';
const MessageBlock =(props)=>{
    return(
    <div className='Message-block'>
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
    const globalUser = useSelector(state=>state.globalUsers);
  return (
    <div className='Message-bar p25'>
        <div style={{fontSize:28,textAlign:'left',paddingLeft:20,fontWeight:600,paddingBottom:20}}>Messages</div>
        <input className='message-user-search' placeholder='      Search...'></input>
        <div className='Message-bar'>
        {globalUser.map((info, index) => (
              
              <MessageBlock 
                  key={info._id || index} 
                  image={info.image}
                  name={info.Username}
              />
              ))}
      
        </div>
      
    </div>
  )
}

export default MessageBar
