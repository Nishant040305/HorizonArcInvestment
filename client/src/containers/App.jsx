import { useState } from 'react'
import reactLogo from '.././assets/react.svg'
import viteLogo from '/vite.svg'
import '.././assets/App.css'
import { Route, Routes } from 'react-router-dom';
import Login from '.././components/Login';
import SideBar from '../components/sideBar';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/sideBar" element={<SideBar></SideBar>}></Route>
    </Routes>
    
  );
}

export default App;
