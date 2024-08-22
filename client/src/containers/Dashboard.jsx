import React from 'react'
import '../components/DashboardComponent/DashNavSide/Dashboard.css';
import ProfileBar from '../components/DashboardComponent/DashNavSide/profile-bar';
import Profile from '../components/DashboardComponent/Profile/profile';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SideBar from '../components/sideBar';
import NavDash from '../components/DashboardComponent/DashNavSide/NavDash';
import Footer from '../components/Footer'
import Messages from '../components/DashboardComponent/Message/Messages';
import Notification from '../components/DashboardComponent/Notification/Notification';
import FindPeople from '../components/DashboardComponent/FindPeople/FindPeople';
import Shares from '../components/DashboardComponent/Shares/shares';
import SettingsComponent from '../components/DashboardComponent/SettingsComponent/settingsComponent';
import { useSelector } from 'react-redux';
import ShortList from '../components/DashboardComponent/ShortList/ShortList';
const Dashboard = () => {
  const option = useSelector(state=>state.dashboard)
  return (
  <>
  <Navbar></Navbar>
  <SideBar></SideBar>
  <NavDash></NavDash>
    <div className='Dashboard'>
      <ProfileBar></ProfileBar>
      {option=="profile"?<Profile/>:option=="shares"?<Shares/>:option=="messages"?<Messages></Messages>:option=="notification"?<Notification/>:option=="shortlist"?<ShortList></ShortList>:option=="settings"?<SettingsComponent></SettingsComponent>:<FindPeople></FindPeople>}
    
    </div>
  <Footer></Footer>
  </>
    
  )
}

export default Dashboard
