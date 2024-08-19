import React from 'react'
import { useSelector } from 'react-redux'
import './FindPeople.css';
import {socket} from '../../../Lib/socket';
import { UserFilter } from '../../../Lib/Filter';
const FindPeopleBlock =(props)=>{
  const user = useSelector(state=>state.user);
  const sendFriendRequest =(receiverId)=>{
    socket.emit('friend-request/send',{SenderId:user._id,receiverId:receiverId,message:{
      image:user.image,
      Username:user.Username,
    },NotifType:"friend-request/send"});
    
  }
    return(
        <div className='FindPeopleBlock' >
          <div className='Findpeople-name'>
          <img className="rounded-full w-10 h-10 mr-10 ml-3" src={props.image}></img> 
          <div className='text-black'>{props.name}</div>
          </div> 
            <div>
              {props.friend?<div className='bg-gray-100 text-gray-700 div-friend' >Friend</div>:<button className='bg-green-400 text-white'onClick={()=>{sendFriendRequest(props._id)}}>Friend</button>}</div>

        </div>
    )
}


const FindPeople = () => {
    const user = useSelector(state=>state.user)
    const globalUser = useSelector(state=>state.globalUsers);
    const filter = useSelector(state=>state.filter);
    const userFiltered = UserFilter(filter.globalUser,globalUser.global);
  return (
    <div className='Findpeople'>
      {userFiltered.length?userFiltered.map((info, index) => (
              
              <FindPeopleBlock 
                  key={info._id||index} 
                  _id = {info._id}
                  image={info.image}
                  name={info.Username}
                  friend = {info.friend}
              />
              )):<div className='flex flex-row justify-center'><img className='findpeople-no-image' src="5639817.webp"></img></div>}
    
    </div>
  )
}

export default FindPeople
