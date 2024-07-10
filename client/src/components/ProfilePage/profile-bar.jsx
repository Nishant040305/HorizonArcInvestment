import React from 'react'
import "./profile-bar.css";

const ProfileBar=()=>{
  return (
    <div className='profile-bar'>
        <div>
        <button className='backColor butt-prof-bar'><div><i className='fa fa-user mr-5'></i>Profile</div><div className='bg-slate-600 text-white' style={{width:"fit-content",fontSize:15,borderRadius:5,padding:3}}>User</div></button>
        <button className='backColor butt-prof-bar'><div><i className='	fa fa-area-chart mr-5'></i>Shares</div></button>
        <button className='backColor butt-prof-bar'><div><i className='fa fa-envelope mr-5'></i>Messages</div></button>
        <button className='backColor butt-prof-bar'><div><i className='fa fa fa-comment mr-5'></i>Notification</div></button>
        <button className='backColor butt-prof-bar'><div><i className='fa fa-search mr-5'></i>Find People</div></button>
        <button className='backColor butt-prof-bar'><div><i className='fa fa-cog mr-5 '></i>Settings</div></button>
        </div>

        <button className='backColor butt-prof-bar '><div>Logout</div><i className='fa fa-sign-out mr-5 mb-11'></i></button>
    </div>
  )
}

export default ProfileBar;