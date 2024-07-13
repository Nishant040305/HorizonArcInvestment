import React from 'react'
import './NavDash.css';
import { change } from '../../../Store/DashBoardOptionsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const NavDash = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const url = useSelector(state=>state.url);
  const OptionsChange=(e)=>{
    dispatch(change(e));
  }
  return (
    <div className='dashboard-navbar'>
        <div style={{fontSize:30,fontWeight:500}}>
        <i className='fa fa-home' style={{fontSize:25,marginRight:20}}> </i> DashBoard
        </div>
        <div className='flex flex-row items-center bg-slate-50 border'>
        <input className=" bg-slate-50 w-full   border-gray-300  text-gray-900 focus:border-cyan-500 focus:ring-cyan-500  dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm pr-10 rounded-lg" type="text" placeholder="Find People..."  /><i className='fa fa-search text-slate-600'></i>
        </div>
        <div className='dashboard-navbar-tab'>
            <div onClick={()=>Navigate(url.buy)}>
            Buy
            </div>
            <div onClick={()=>Navigate(url.stock)}>
            Shares
            </div>
            <div onClick={()=>OptionsChange('shortlist')}>
            ShortList
            </div>
            <div onClick={()=>Navigate(url.sell)}>
            Sell
            </div>
        </div>
    </div>
  )
}

export default NavDash
