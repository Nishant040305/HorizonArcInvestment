import React from 'react'
import './profile.css';
import { useSelector } from 'react-redux';
const Profile=()=> {
  const user = useSelector(state=>state.user);
  return (
    <div className='profile-page p-10'>
      <div className='profile-page-content'>
      <img className='rounded-circle w-48 h-48 mb-9 ml-20' src={user.image}></img>
      <div className='profile-page-data'>
        <div className='profile-page-head'>Username:</div><div className='profile-page-info'>{user.Username}</div>
      </div>
      <div className='profile-page-data'>
        <div className='profile-page-head'>Name:</div><div className='profile-page-info'>{user.fullName}</div>
      </div>
      <div className='profile-page-data'>
        <div className='profile-page-head'>Pan Number:</div><div className='profile-page-info'>{user.panNumber}</div>
      </div>
      <div className='profile-page-data'>
        <div className='profile-page-head'>Email:</div><div className='profile-page-info'>{user.email}</div>
      </div><div className='profile-page-data'>
        <div className='profile-page-head'>Phone Number:</div><div className='profile-page-info'>{user.mobile}</div>
      </div><div className='profile-page-data'>
        <div className='profile-page-head'>Location:</div><div className='profile-page-info'>SVBH, Tagore Hostel MNNIT Prayagraj Uttarpardesh</div>
      </div>
      <div className='profile-page-data'>
        <div className='profile-page-head'>DOB:</div><div className='profile-page-info'>4 March 2007</div>
      </div>
     
    <button className=' bg-slate-900 text-white profile-edit'>Edit</button>
      </div>
    </div>
  )
}

export default Profile;