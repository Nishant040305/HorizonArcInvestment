import React, { useState } from 'react'
import viteLogo from '/vite.svg'
import '.././assets/App.css'
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';
import SideBar from '../components/sideBar';
import Navbar from '../components/Navbar';
// import { PDFViewer } from '@react-pdf/renderer';
// import MyDocument from '.././components/BuyLandIndi';
import ReactDOM from 'react-dom';
import BuyOption from '.././components/BuyLandIndi';
import Recomendation from '../components/Recomendation';
import BuyTab from './BuyTab';
import StockTab from './StockTab';
import StockFilter from '../components/StockFilter';
import Sellpage from './Sellpage';
import { useSelector } from 'react-redux';
import InfoBlock from '../components/buyPageComponent/Info';
import Overview from '../components/buyPageComponent/Info';
import PlaceNearby from '../components/buyPageComponent/placeInfo';
import Index from './buyStockPage';
import ProfileBar from '../components/DashboardComponent/DashNavSide/profile-bar';
import Dashboard from './Dashboard';
import VerifyComponent from '../components/VerifyComponent';
function App() {
  const url = useSelector(state=>state.url);
  // console.log(url)
  return (
    <Routes>
      <Route path={url.login} element={<Login></Login>}></Route>
      <Route path={url.sideBar} element = {<SideBar></SideBar>}></Route>
      <Route path={url.nav} element = {<Navbar></Navbar>}></Route>
      <Route path={url.buyComp} element ={<BuyOption></BuyOption>}></Route>
      <Route path={url.recomd} element ={<Recomendation></Recomendation>}></Route>
      <Route path={url.buy} element={<BuyTab></BuyTab>}></Route>
      <Route path={url.stock} element={<StockTab></StockTab>}></Route>
      <Route path={url.filter} element={<StockFilter></StockFilter>}></Route>
      <Route path={url.sell} element={<Sellpage></Sellpage>}></Route>
      <Route path={url.page} element ={<Index></Index>}></Route>
      <Route path={url.dashboard} element={<Dashboard></Dashboard>}></Route>
      <Route path={url.login} element={<Login></Login>}></Route>
      <Route path='/users/:id/verify/:token' element ={<VerifyComponent></VerifyComponent>}></Route>
    </Routes>
    
  );
}

export default App;
