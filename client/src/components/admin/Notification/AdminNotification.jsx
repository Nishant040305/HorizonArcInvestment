import React ,{useEffect, useState}from 'react';
import {socket} from '../../../Lib/socket'
import axios from "axios";
let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
const NotificationMess = (props) => {
  const { text } = props;

  return (
      <div className='Notification-message'>
          {Object.entries(text).map(([key, value]) => (
              <div key={key}>
                  <strong>{key}:</strong> 
                  {typeof value === 'object' && value !== null ? (
                      <div>
                          {Object.entries(value).map(([subKey, subValue]) => (
                              <div key={subKey}>
                                  <strong>{subKey}:</strong> {subValue}
                              </div>
                          ))}
                      </div>
                  ) : (
                      value
                  )}
              </div>
          ))}
      </div>
  );
};


const Notification = () => {
  const [notification,setNotification] = useState([]);
  const getNotification = async()=>{
    
    try{
      const response = await axios.post(`${BACKWEB}/admin/getNotificationAdmin`,
        {
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
      if(response.status ===200){
        setNotification(response.data.info);
      }
    })
    }
    catch(e){

    }  }
  useEffect(()=>{
    socket.emit('connectToAdmin');
    socket.on('Sell',async(data)=>{
        let ar = notification;
        ar.push(data);
        setNotification(ar);
    });
    getNotification();
    return ()=>{
        socket.off('connectToAdmin');
        socket.off('Sell');
    }
  },[])

  return (
    <div className='Notification'>
      <div className='Notification-head '>Notification</div>
      <div className='Notification-container'>
        {notification.map((info,index)=>(
            info.NotifType=="Sell"?<NotificationMess key={index}text={info.message}></NotificationMess>:<></>
        ))}
      </div>
    </div>
  )
}

export default Notification;
