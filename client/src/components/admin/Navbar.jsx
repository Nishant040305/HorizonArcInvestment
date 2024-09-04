import React from 'react';
import './Navbar.css';

const Navbar = ({ onTabChange }) => {
  return (
    <div className='flex flex-row nav-bar-admin'>
      <button className='admin-nav' onClick={() => onTabChange('User')}>Users</button>
      <button className='admin-nav' onClick={() => onTabChange('Shares')}>Shares</button>
      <button className='admin-nav' onClick={() => onTabChange('Land')}>Land</button>
      <button className='admin-nav' onClick={() => onTabChange('Notification')}>Notification</button>
      <button className='admin-nav' onClick={() => onTabChange('AddShares')}>Add Shares</button>
      <button className='admin-nav' onClick={() => onTabChange('AddLand')}>Add Land</button>
      <button className='admin-nav' onClick={() => onTabChange('CreateAdmin')}>Create Admin</button>
      <button className='admin-nav' onClick={() => onTabChange('TransactionDetails')}>Transaction Details</button>
      <button className='admin-nav' onClick={() => onTabChange('EditInfo')}>Edit Data</button>
      <button className='admin-nav' onClick={() => onTabChange('Articles')}>Add Articles</button>


    </div>
  );
};

export default Navbar;
