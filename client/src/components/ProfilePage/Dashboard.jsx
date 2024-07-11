import React from 'react'
import './Dashboard.css';
import ProfileBar from './profile-bar';
import Profile from './profile';
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar';
import SideBar from '../sideBar';
import NavDash from './NavDash';
import Footer from '../Footer'
import Messages from './Messages';
const Dashboard = () => {
  return (
  <>
  <Navbar></Navbar>
  <SideBar></SideBar>
  <NavDash></NavDash>
    <div className='Dashboard'>
      <ProfileBar></ProfileBar>
      <Messages></Messages>
    </div>
  <Footer></Footer>
  </>
    
  )
}

export default Dashboard
