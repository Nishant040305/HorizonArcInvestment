import React, { useState } from 'react'
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
import StockTab from './StockTab';
import StockFilter from '../components/StockFilter';
import Sellpage from './Sellpage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/sidebar" element = {<SideBar></SideBar>}></Route>
      <Route path="/nav" element = {<Navbar></Navbar>}></Route>
      <Route path='/buy' element ={<BuyOption></BuyOption>}></Route>
      <Route path='/recomd' element ={<Recomendation></Recomendation>}></Route>
      <Route path='/buyTab' element={<BuyTab></BuyTab>}></Route>
      <Route path='/stockTab' element={<StockTab></StockTab>}></Route>
      <Route path='/stockfilter' element={<StockFilter></StockFilter>}></Route>
      <Route path='/sell' element={<Sellpage></Sellpage>}></Route>
    </Routes>
    
  );
}

export default App;
