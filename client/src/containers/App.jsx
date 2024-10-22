import React, { useEffect, useState,useRef, useReducer } from 'react'
import viteLogo from '/vite.svg'
import '.././assets/App.css'
import { Route, Routes, Navigate, useLocation, useNavigate } from 'react-router-dom';
import ReactDOM from 'react-dom';
import BuyTab from './BuyTab';
import StockTab from './StockTab';
import Sellpage from './Sellpage';
import { useSelector } from 'react-redux';
import Index from './buyStockPage';
import Dashboard from './Dashboard';
import VerifyComponent from '../components/VerifyComponent';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { register } from '../Store/UserAuthSlice';
import { setSeen } from '../Store/LoginSeenSlice';
import {  addShares, configDatastock, setStock } from '../Store/BuyStockSlice';
import { addLand, configData, setBuyData } from '../Store/BuyDataSlice';
import { setglobalUser,setFriends, addFriend, unFriendUser } from '../Store/globalUser';
import { setNotification,addNotification } from '../Store/NotificationSlice';
import { socket } from '../Lib/socket';
import { setShortlist } from '../Store/ShortListSlice';
import { numTowords, ShortListData } from '../Lib/ImportantFunc';
import { setMessage ,Addmessage, addUserChat,updateSeenStatus, deleteMessageId, deleteAllMessageIO, deleteChatRoom} from '../Store/MessageSlice';
import { setBuyStockData,setLocationFilterBuy,setPriceFilterBuy,setPriceFilterStocks, setTag } from '../Store/FilterDataSlice';
import { PriceFilter } from '../Lib/Filter';
import Admin from '../components/admin/Admin';
import { setAdmin } from '../Store/IsAdminSlice';
import { getArticle } from '../Store/ArticleSlice';
const App=() =>{
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const url = useSelector(state=>state.url);
  const seen = useSelector(state=>state.loginSeen);
  const dispatch = useDispatch();
  let buydata = null;
  const location = useLocation();
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(configData({ latitude: latitude, longitude: longitude }));
          dispatch(configDatastock({ latitude: latitude, longitude: longitude }));
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
                socket.emit('connectToServer',userInfo.chatRoomId);
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
const article =async()=>{
  try{
    const response = await axios.get(`${BACKWEB}/article`);
    if(response.status==200){
        return dispatch(getArticle(response.data.info));
    }
    else{
        return [];
    }
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
const parseQueryParams = () => {
  const params = new URLSearchParams(location.search);
  const min = params.get('min');
  const max = params.get('max');
  const plotType = params.get('plot_type');
  const Amin = params.get('Amin');
  const Amax = params.get('Amax');
  const locationParam = params.get('location');
  if(min!=null) dispatch(setTag({type:"minAmount",amount:min,text:`Starting with ${numTowords(Number(min))}`,buy:BuyLandData,stock:StockLandData}));
  if(max!=null) dispatch(setTag({type:"maxAmount",amount:max,text:`Ending with ${numTowords(Number(max))}`,buy:BuyLandData,stock:StockLandData}));
  if(plotType!=null) dispatch(setTag({type:"plot_type",text:plotType,buy:BuyLandData,stock:StockLandData}));
  if(Amin!=null) dispatch(setTag({type:"minArea",amount:Amin, text:`Starting with ${Amin} hectar`,buy:BuyLandData,stock:StockLandData}));
  if(Amax!=null) dispatch(setTag({type:"maxArea",amount:Amax,text:`upto ${Amax} hectar`,buy:BuyLandData,stock:StockLandData}));

}
useEffect(()=>{
  StockData();
  BuyLand();
  User();
  globalUser();
  article();
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
    getChats(user.chatRoomId);
    getFriends(user.friendId);
    handleGetLocation();

    socket.connect();
    socket.emit('connectToServer',{chatRoom:user.chatRoomId,userId:user._id});
  }

},[user,socket])
useEffect(() => {
  if (user) {
    // Emit connection event initially
    socket.connect();
    socket.emit('connectToServer', { chatRoom: user.chatRoomId, userId: user._id });

    // Handle reconnection
    socket.on('connect', () => {
      console.log('Reconnected to the server');
      socket.emit('connectToServer', { chatRoom: user.chatRoomId, userId: user._id });

      // Optionally re-fetch data
      getChats(user.chatRoomId);
      getNotification(user._id);
      getShortlistData(user.shortList);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
      // Optionally notify the user or handle UI changes
    });

    return () => {
      // Clean up listeners on unmount
      socket.off('connect');
      socket.off('disconnect');
    };
  }
}, [socket, user,dispatch]);
useEffect(() => {
  socket.connect();

  socket.on('reconnect', () => {
    console.log('Reconnected to the server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from the server');
  });

  return () => {
    socket.off('reconnect');
    socket.off('disconnect');
  };
}, [socket]);

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
  socket.on('friend-request/accept',(data)=>{
    console.log(data)
    dispatch(addFriend(data.friend));
    dispatch(addUserChat(data.chatRoom));
    console.log("hely")
    socket.emit('connectToChatRoom',data.chatRoom._id);
  })
  return ()=>{
    socket.off('friend-request/accept');
  }
},[])

useEffect(() => {
  const handleMessage = (data) => {
      dispatch(Addmessage(data));
  };

  socket.on('message', handleMessage);
  return () => {
      socket.off('message', handleMessage);
  };
}, [dispatch, socket]);
useEffect(() => {
  // Listen for the messageSeenUpdate event from the server
  socket.on('messageSeenUpdate', (updatedMessage) => {
      // Dispatch an action to update the message status in Redux store
      dispatch(updateSeenStatus(updatedMessage));
  });

  return () => {
      // Cleanup the socket connection on component unmount
      socket.off('messageSeenUpdate');
  };
}, [dispatch, socket]);
useEffect(()=>{
  socket.on('message-delete',(data)=>{
    dispatch(deleteMessageId(data));
  })
  socket.on('Delete-All-Chat',(data)=>{
    dispatch(deleteAllMessageIO(data));
  })
  return ()=>{
    socket.off('message-delete')
  }
})
useEffect(()=>{
  socket.on('unFriend-user',(data)=>{
    dispatch(unFriendUser({...data,userId:user._id,friendsId:data.userId}));
    dispatch(deleteChatRoom(data))
  })
  return ()=>{
    socket.off('unFriend-user')
  }
})
useEffect(()=>{
  socket.on('newShares',(data)=>{
    dispatch(addNotification(data));
    dispatch(addShares(data.message));
  })
  return()=>{
    socket.off('newShares')
  }
})
useEffect(()=>{
  socket.on('newLand',(data)=>{
    dispatch(addNotification(data));
    dispatch(addLand(data.message))
  })
  return()=>{
    socket.off('newLand')
  }
})
useEffect(() => {
  parseQueryParams();
}, [location.search]); // Run this effect whenever the URL changes
  return (
    <Routes>

      <Route path={url.buy} element={<BuyTab></BuyTab>}></Route>
      <Route path={url.stock} element={<StockTab></StockTab>}></Route>
      <Route path={url.sell} element={<Sellpage></Sellpage>}></Route>
      <Route path={url.page} element ={<Index></Index>}></Route>
      <Route path={url.dashboard} element={!seen.seen? <Navigate replace to={url.stock} />:<Dashboard></Dashboard>}></Route>
      <Route path={url.verify} element ={<VerifyComponent></VerifyComponent>}></Route>
      <Route path={url.admin} element={!admin? <Navigate replace to={url.stock} />:<Admin></Admin>}></Route>
    </Routes>
    
  );
}

export default App;
