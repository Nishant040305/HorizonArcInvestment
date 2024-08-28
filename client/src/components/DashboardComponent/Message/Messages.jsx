import React from 'react'
import './Messages.css';
import MessageBar from './MessageBar';
import MessageData from './MessageData';

const Messages = (props) => {
  return (
    
    <div className={`Messages ${props.state==1?'MaxWidth965':''}`}>
      <MessageBar></MessageBar>
      <MessageData></MessageData>
    </div>
  )
}

export default Messages
