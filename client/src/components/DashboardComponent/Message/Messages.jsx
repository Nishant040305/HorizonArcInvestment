import React from 'react'
import './Messages.css';
import MessageBar from './MessageBar';
import MessageData from './MessageData';
const Messages = () => {
  return (
    <div className='Messages'>
      <MessageBar></MessageBar>
      <MessageData></MessageData>
    </div>
  )
}

export default Messages
