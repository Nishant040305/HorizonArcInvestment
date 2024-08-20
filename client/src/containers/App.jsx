import React, { useEffect, useState,useRef, useReducer } from 'react'
import viteLogo from '/vite.svg'
import '.././assets/App.css'
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
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
import { setglobalUser,setFriends } from '../Store/globalUser';
import { setNotification,addNotification } from '../Store/NotificationSlice';
import { socket } from '../Lib/socket';
import { setShortlist } from '../Store/ShortListSlice';
import { ShortListData } from '../Lib/ImportantFunc';
import { setMessage ,Addmessage} from '../Store/MessageSlice';
import { setBuyStockData,setLocationFilterBuy,setPriceFilterBuy,setPriceFilterStocks } from '../Store/FilterDataSlice';
import { PriceFilter } from '../Lib/Filter';
import Admin from '../components/admin/Admin';
import ImageSlider from '../components/imageSlider';
import { setAdmin } from '../Store/IsAdminSlice';
import LocationSearch from '../components/SearchField';
const App=() =>{
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const url = useSelector(state=>state.url);
  const seen = useSelector(state=>state.loginSeen);
  const dispatch = useDispatch();
  let buydata = null;
  const initialLoad = useRef(true);
  axios.defaults.withCredentials = true;
  const user = useSelector(state=>state.user)
  const admin = useSelector(state=>state.admin);
  const StockLandData = useSelector(state=>state.stock)
  const BuyLandData = useSelector(state=>state.buyData);
  const filter = useSelector(state=>state.filter)
  const navigate  = useNavigate(); 
  const getShortlistData = async(ID)=>{
    try{
      const response = await axios.post(`${BACKWEB}/buyTab/getShorListData`,
        { _id:ID,
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
      if(response.status ===200&&response.data.infoLength!==0){
          dispatch(setShortlist(response.data.info));

        }
      
    })
    }
    catch(e){

    }
  }
  const getNotification = async(ID)=>{
    if(ID){
    try{
      const response = await axios.post(`${BACKWEB}/notification`,
        { userId:ID,
            headers: {
            'Accept': 'application/json',
            
        },
        mode:"cors",
        withCredentials:true

    }).then(response=>{
      if(response.status ===200){
        dispatch(setNotification(response.data.info));
      }
    })
    }
    catch(e){

    }}
  }
  const handleGetLocation = async () => {
    console.log("hello")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          dispatch(setLocationFilterBuy({ latitude: latitude, longitude: longitude }));
          localStorage.setItem('geolocationConsent', 'true'); // Store consent
        },
        (error) => {
          console.error('Error getting geolocation:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  
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
                const userInfo = response.data.info;
                dispatch(register(userInfo));
                dispatch(setSeen(1));
                getNotification(userInfo._id);
                getShortlistData(userInfo.shortList);
                if(userInfo?.role=="admin"){
                  dispatch(setAdmin(true));
                  // navigate(url.admin)
                }
                
                socket.connect();
                socket.emit('connectToServer',userInfo.chatRoom);
            }
        })
    }catch(e){
      return null;
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
          buydata = response.data.info;
            dispatch(setBuyData(response.data.info));
        }
    })
}catch(e){
}
}
const getChats =async(Chat)=>{
  try{
    const response = await axios.post(`${BACKWEB}/chat/getChat`,
      
      {
        chatRoom:Chat,
        headers: {
        'Accept': 'application/json',
        
    },
    mode:"cors",
    withCredentials:true

}).then(response=>{
    if(response.status ==200){
        dispatch(setMessage(response.data.info));
    }
})
    
  }catch(e){

  }
}
const getFriends =async(Friend)=>{
  try{
    const response = await axios.post(`${BACKWEB}/User/getFriends`,
      
      {
        _id:Friend,
        headers: {
        'Accept': 'application/json',
        
    },
    mode:"cors",
    withCredentials:true

}).then(response=>{
    if(response.status ==200){
        dispatch(setFriends(response.data.info));
    }
})
    
  }catch(e){

  } 
}
const askForLocation = () => {
  // Trigger this on page load or when user consents
  handleGetLocation();
};

useEffect(()=>{
  StockData();
  BuyLand();
  User();
  globalUser();
  
},[]);
// const [data_,setData] = useState('');
useEffect(()=>{
  dispatch(setBuyStockData({buy:BuyLandData,
    stock:StockLandData
  }));
},[BuyLandData,StockLandData])
useEffect(()=>{
  if(user){
    getNotification(user._id);
    getShortlistData(user.shortList);
    getChats(user.chatRoom);
    getFriends(user.friendId);
    handleGetLocation();

    socket.connect();
    socket.emit('connectToServer',{chatRoom:user.chatRoom,userId:user._id});
    return()=>{
      socket.off('connectToServer')
    }
  }

},[user])
useEffect(()=>{
  socket.on('friend-request/send',(data)=>{
    dispatch(addNotification(data));
  });
 
  // socket.on('message',(data));
  return ()=>{
    socket.off('friend-request/send');
  }
},[])
useEffect(()=>{
  
  socket.on('message',(data)=>{
    dispatch(Addmessage(data))
  })
  return ()=>{
    socket.off('message')
  }
})

 
  return (
    <Routes>

      <Route path={url.buy} element={<BuyTab></BuyTab>}></Route>
      <Route path={url.stock} element={<StockTab></StockTab>}></Route>
      <Route path={url.sell} element={<Sellpage></Sellpage>}></Route>
      <Route path={url.page} element ={<Index></Index>}></Route>
      <Route path={url.dashboard} element={!seen.seen? <Navigate replace to={url.stock} />:<Dashboard></Dashboard>}></Route>
      <Route path={url.verify} element ={<VerifyComponent></VerifyComponent>}></Route>
      <Route path={url.admin} element={!admin? <Navigate replace to={url.stock} />:<Admin></Admin>}></Route>
      <Route path="/test" element ={<LocationSearch></LocationSearch>}></Route>
    </Routes>
    
  );
}

export default App;
