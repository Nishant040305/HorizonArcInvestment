import React, { useEffect, useState } from 'react'
import viteLogo from '/vite.svg'
import '.././assets/App.css'
import { Route, Routes, Navigate } from 'react-router-dom';
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
import axios from "axios";
import { useDispatch } from 'react-redux';
import { register } from '../Store/UserAuthSlice';
import { setSeen } from '../Store/LoginSeenSlice';
import {  setStock } from '../Store/BuyStockSlice';
import { setBuyData } from '../Store/BuyDataSlice';
import { setglobalUser } from '../Store/globalUser';
const App=() =>{
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const url = useSelector(state=>state.url);
  const seen = useSelector(state=>state.loginSeen);
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const globalUser =async()=>{
    try{
        const response = await axios.get(`${BACKWEB}/User/getAllUser`,
            {
                headers: {
                'Accept': 'application/json',
                
            },
            mode:"cors",
            withCredentials:true

        }).then(response=>{
            if(response.status ==200){
                dispatch(setglobalUser(response.data.info));
            }
        })
    }catch(e){
    }
  }
  const User= async()=>{
    try{
        const response = await axios.get(`${BACKWEB}/`,
            {
                headers: {
                'Accept': 'application/json',
                
            },
            mode:"cors",
            withCredentials:true

        }).then(response=>{
            if(response.status ==200){
                dispatch(register(response.data.info));
                dispatch(setSeen(1));
                globalUser();
            }
        })
    }catch(e){
    }
    
}
const StockData = async()=>{
  try{
    const response = await axios.get(`${BACKWEB}/stockTab`,
        {
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
        if(response.status ==200){
            dispatch(setStock(response.data.info));
        }
    })
}catch(e){
}
}
const BuyLand = async()=>{
  try{
    const response = await axios.get(`${BACKWEB}/buyTab`,
        {
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
        if(response.status ==200){
            dispatch(setBuyData(response.data.info));
        }
    })
}catch(e){
}
}
useEffect(()=>{
  StockData();
  BuyLand();
  User();
},[]);
  return (
    <Routes>
      <Route path={url.buy} element={<BuyTab></BuyTab>}></Route>
      <Route path={url.stock} element={<StockTab></StockTab>}></Route>
      <Route path={url.sell} element={<Sellpage></Sellpage>}></Route>
      <Route path={url.page} element ={<Index></Index>}></Route>
      <Route path={url.dashboard} element={!seen.seen? <Navigate replace to={url.stock} />:<Dashboard></Dashboard>}></Route>
      <Route path='/users/:id/verify/:token' element ={<VerifyComponent></VerifyComponent>}></Route>
    </Routes>
    
  );
}

export default App;
