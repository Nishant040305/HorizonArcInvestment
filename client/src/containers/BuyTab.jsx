import React from 'react';
import Navbar from '../components/Navbar';
import BuyOption from '../components/BuyLandIndi';
import Recomendation from '../components/Recomendation';
import '../assets/BuyTab.css';
import Footer from '../components/Footer';
import StockFilter from '../components/StockFilter';
import SideBar from '../components/sideBar';
import Login from '../components/Login';
import { useSelector } from 'react-redux';
const Filter =()=>{
    return(
        <div className="buyTabfilter" style={{display:"flex",flexDirection:"row"}}>
                                <input className="form-control mr-sm-2 search root" name="category" type="search"  placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success submit-button" type="button">Search</button>       
        </div>
    )
}
export default function BuyTab() {
  const user = useSelector(state=>state.user);
  const seen = useSelector(state=>state.loginSeen);
  return (
    <div className={`BuyTab `}>

      {!(seen.seen||seen.seenlog)&&<Login></Login>}
      <Navbar></Navbar>
      {(seen.seen)?<SideBar></SideBar>:<></>}
      <div className={`BuyTab-block ${!(seen.seen||seen.seenlog)?"backdrop-background-blur":""}`}>
      <div className='stock-filter'>
        <StockFilter></StockFilter>
      </div>
        <div className="buyoption-block">
            <Filter></Filter>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            <BuyOption tab="buy"></BuyOption>
            
        </div>
      
      </div>
      <div className="buyfootpage ">
              <div className='pageCat'>Pages 5 to 12</div>
              <strong style={{alignItems:'centre'}}> <i className="material-icons" style={{paddingTop:7}}>chevron_left</i></strong>
              <strong>Previous</strong>
              <button className="rounded-full bg-white">1</button>
              <button className="rounded-full bg-white">2</button>
              <button className="rounded-full bg-white">3</button>
              <button className="rounded-full bg-white">4</button>
              <button className="rounded-full bg-white">5</button>
              <button className="rounded-full bg-white">6</button>
              <button className="rounded-full bg-white">7</button>
              <button className="rounded-full bg-white">8</button>
              <strong>Next Page</strong>
              <strong style={{alignItems:'centre'}}> <i className="material-icons" style={{paddingTop:7}}>chevron_right</i></strong>

            </div>
      <Footer></Footer>
    </div>
  )
}
