import React ,{useState}from 'react'
import "./profile-bar.css";
import { change } from '../../../Store/DashBoardOptionsSlice';
import { useDispatch } from 'react-redux';
const ProfileBar=()=>{
  const[exp,setExp] = useState(1)
  const dispatch = useDispatch();
  const expandSet =()=>{
    setExp(1-exp);
  } 
  const OptionsChange=(e)=>{
    dispatch(change(e));
  }
  return (
    <div className={`profile-bar ${exp?"width18vw":"w-16"}`}>
        <div>
        <button className='backColor float-right width-100 text-right butt-prof-bar-arrow ' onClick={expandSet}><i className={`fas ${exp?'fa-arrow-left':'fa-arrow-right'}`} style={{fontSize:20,paddingRight:20}}></i></button>

        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("profile")}name="profile"><div><i className='fa fa-user mr-5'></i>{exp?"Profile":""}</div>{exp?<div className='bg-slate-600 text-white' style={{width:"fit-content",fontSize:15,borderRadius:5,padding:3}}>User</div>:<></>}</button>
        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("shares")}name="shares"><div><i className='	fa fa-area-chart mr-5'></i>{exp?"Shares":""}</div></button>
        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("messages")}name="messages"><div><i className='fa fa-envelope mr-5'></i>{exp?"Messages":""}</div></button>
        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("notification")}name="notification"><div><i className='fa fa fa-comment mr-5'></i>{exp?"Notification":""}</div></button>
        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("findpeople")}name="findpeople"><div><i className='fa fa-search mr-5'></i>{exp?"Find People":""}</div></button>
        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("shortlist")}name="shortlist"><div><i className='fa fa-heart mr-5'></i>{exp?"ShortList":""}</div></button>

        <button className='backColor butt-prof-bar' onClick={()=>OptionsChange("settings")}name="settings"><div><i className='fa fa-cog mr-5 '></i>{exp?"Settings":""}</div></button>
        </div>

        <button className='backColor butt-prof-bar '><div>{exp?"Logout":""}</div><i className='fa fa-sign-out mr-5 mb-11'></i></button>
    </div>
  )
}

export default ProfileBar;