import React, { useState } from 'react'
import reactLogo from '.././assets/react.svg'
import viteLogo from '/vite.svg'
import '.././assets/App.css'
import { Route, Routes } from 'react-router-dom';
import Login from '.././components/Login';
import SideBar from '.././components/sideBar';
import Navbar from '.././components/Navbar';
// import { PDFViewer } from '@react-pdf/renderer';
// import MyDocument from '.././components/BuyLandIndi';
import ReactDOM from 'react-dom';
import BuyOption from '.././components/BuyLandIndi';
import Recomendation from '../components/Recomendation';
import BuyTab from './BuyTab';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/sidebar" element = {<SideBar></SideBar>}></Route>
      <Route path="/nav" element = {<Navbar></Navbar>}></Route>
      <Route path='/buy' element ={<BuyOption></BuyOption>}></Route>
      <Route path='/recomd' element ={<Recomendation></Recomendation>}></Route>
      <Route path='/buyTab' element={<BuyTab></BuyTab>}></Route>
    </Routes>
    
  );
}
// const App = () => (
//   <PDFViewer>
//     <MyDocument />
//   </PDFViewer>
// );

// ReactDOM.render(<App />, document.getElementById('root'));
export default App;
