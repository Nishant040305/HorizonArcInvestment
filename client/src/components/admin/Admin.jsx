import React, { useState } from 'react';
import './admin.css';
import Navbar from './Navbar';
import User from './Users/Users';
import AddBuyData from './Addland/addBuyData';
import Shares from './Shares/shares'
import Land from './Land/land'
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
      default:
        return <User />;

    }
  };

  return (
    <div className='bg-white admin'>
      <Navbar onTabChange={setSelectedTab} />
      {renderComponent()}
    </div>
  );
};

export default Admin;
