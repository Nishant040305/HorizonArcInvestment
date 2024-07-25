import React from 'react'
import { useSelector } from 'react-redux'
import './FindPeople.css';
import {socket} from '../../../Lib/socket';
const FindPeopleBlock =(props)=>{
  const user = useSelector(state=>state.user);
  const sendFriendRequest =(receiverId)=>{
    socket.emit('friend-request/send',{SenderId:user._id,receiverId:receiverId,message:{
      image:user.image,
      Username:user.Username,
    },NotifType:"friend-request/send"});
    socket.on('Notification',(Data)=>{
      console.log(Data);
    })
  }
    return(
        <div className='FindPeopleBlock' onClick={()=>{sendFriendRequest(props._id)}}>
          <div className='Findpeople-name'>
          <img className="rounded-full w-10 h-10 mr-10 ml-3" src={props.image}></img> 
          <div className=''>{props.name}</div>
          </div>
            
            <div><button className='bg-green-400 text-white'>Friend</button></div>

        </div>
    )
}


const FindPeople = () => {
    const user = useSelector(state=>state.user)
    const globalUser = useSelector(state=>state.globalUsers);
    console.log(globalUser)
  return (
    <div className='Findpeople'>
      {globalUser.map((info, index) => (
              
              <FindPeopleBlock 
                  key={info._id||index} 
                  _id = {info._id}
                  image={info.image}
                  name={info.Username}
              />
              ))}

    </div>
  )
}

export default FindPeople
