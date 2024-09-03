import React ,{useEffect}from 'react';
import './Notification.css';
import { useSelector,useDispatch } from 'react-redux';
import { addNotification ,removeNotification} from '../../../Store/NotificationSlice';
import BuyOption from '../../BuyLandIndi';
import {socket} from '../../../Lib/socket'
const FriendRequest = (props)=>{
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const notification = useSelector(state=>state.notification);

  const AcceptFriendRequest=()=>{
  
    socket.emit('friend-request/accept',{notification:notification[props.index],userInfo:{image:user.image,Username:user.Username,receiverId:user._id}});
    dispatch(removeNotification(props.index));
  }
  const RejectFriendRequest=()=>{
    socket.emit('friend-request/reject',{notification:notification[props.index]._id});
    dispatch(removeNotification(props.index));
  }
  return(
    <div className='Notification-friend Notification-message '>
      <div className='flex flex-row ' style={{alignItems:'center'}}>
      <img className='rounded-full w-9 h-9 mr-4' src={props.message.image}></img>{props.message.Username} wants to Friend with you
      </div>
      <div className='flex flex-row mt-3 ml-14'>
        <button className='btn btn-success w-24 mr-10' onClick={()=>AcceptFriendRequest()}>Accept+</button><button className='btn btn-danger w-24' onClick={()=>RejectFriendRequest()}>Reject</button>
      </div>
    </div>
  )
}
const NotificationMess =(props)=>{
    return(
        <div className='Notification-message'>
            {props.text}
            
        </div>
    )
}
const ShareDataNotification=({info})=>{
  return(
    <> 
    <div className='text-left' style={{fontSize:25,fontWeight:500,marginLeft:40}}>NEW STOCKS ADDED</div>
    <BuyOption 
                  Images={info.Images} 
                  Price={info.Price[info.Price.length-1]} 
  
                  amount={info.Area.amount}
                  gataNumber={info.gataNumber}
                  unit = {info.Area.unit}
                  State={info.State}
                  District={info.District} 
                  Village = {info.Village}
                  Description={info.Description} 
                  Highlights={info.Highlights}
                  Category={info.Category}
                  Property={info.Property}
                  id={info._id}
                  tab ="stock"
              /></>
  )
}
const Notification = () => {
  const notification = useSelector(state=>state.notification);
  const dispatch = useDispatch();

  return (
    <div className='Notification'>
      <div className='Notification-head '>Notification</div>
      <div className='Notification-container'>
        {notification.map((info,index)=>(
          (info.NotifType=='friend-request/send')?<FriendRequest key={index} _id={info._id} index = {index} SenderId={info.SenderId} message={info.message}></FriendRequest>:(info.NotifType=='newShares')?<ShareDataNotification key={index} info={info.message}/>:<></>
        ))}
      </div>
    </div>
  )
}

export default Notification;
