import React, { useState } from 'react';
import './admin.css';
import Navbar from './Navbar';
import User from './Users/Users';
import AddBuyData from './Addland/addBuyData';
import Shares from './Shares/shares'
import Land from './Land/land'
import AddSharesData from './AddShares/addShares';
import { socket } from '../../Lib/socket';
import Notification from './Notification/AdminNotification';
import EditInfo from './EditInfo/EditInfo';
import AdminCreate from './Users/AdminCreate';
const Admin = () => {
  const [selectedTab, setSelectedTab] = useState('User');

  const renderComponent = () => {
    switch (selectedTab) {
      case 'User':
        return <User />;
      case 'AddLand':
        return <AddBuyData />;
      case 'Shares':
        return <Shares/>;
      case 'Land':
        return <Land/>;
      case 'AddShares':
        return <AddSharesData></AddSharesData>
      case 'Notification':
        return <Notification></Notification>
      case 'EditInfo':
        return <EditInfo></EditInfo>
      case 'CreateAdmin':
        return <AdminCreate></AdminCreate>
      default:
        return <User />;

    }
  };
  
  return (
    <div className=' admin'>
      <Navbar onTabChange={setSelectedTab} />
      {renderComponent()}
    </div>
  );
};

export default Admin;
