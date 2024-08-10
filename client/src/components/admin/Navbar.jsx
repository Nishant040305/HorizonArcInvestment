import React from 'react'
import './Navbar.css'
const Navbar = () => {
  return (
    <div className='flex flex-row'>
      <button className='bg-white text-gray-800 admin-nav'>Users</button>
      <button className='bg-white text-gray-800 admin-nav'>Shares</button>
      <button className='bg-white text-gray-800 admin-nav'>Land</button>
      <button className='bg-white text-gray-800 admin-nav'>Notification</button>
      <button className='bg-white text-gray-800 admin-nav'>Add Shares</button>
      <button className='bg-white text-gray-800 admin-nav'>Add Land</button>
      <button className='bg-white text-gray-800 admin-nav'>Employees</button>
      <button className='bg-white text-gray-800 admin-nav'>Transaction Details</button>
      <button className='bg-white text-gray-800 admin-nav'>Send Message</button>

    </div>
  )
}

export default Navbar
