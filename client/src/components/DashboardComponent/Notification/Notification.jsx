import React from 'react';
import './Notification.css';

const NotificationMess =(props)=>{
    return(
        <div className='Notification-message'>
            {props.text}
            
        </div>
    )
}

const Notification = () => {
  return (
    <div className='Notification'>
      <div className='Notification-head '>Notification</div>
      <div className='Notification-container'>
        <NotificationMess text="hello my name is nishant mohan i study in this college slfjsldfj
        ssfjks sdfjsd
        sdflksjf sjdfkso fskldjs skfjls skdjfl sjdfkl lksjdf sljkdf s hello my name is nishant mohan i study in this college slfjsldfj
        ssfjks sdfjsd
        sdflksjf sjdfkso fskldjs skfjls skdjfl sjdfkl lksjdf sljkdf s"></NotificationMess>
      </div>
    </div>
  )
}

export default Notification;
