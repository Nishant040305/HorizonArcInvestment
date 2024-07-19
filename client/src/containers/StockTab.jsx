import React from 'react';
import Navbar from '../components/Navbar';
import StockOption from '../components/BuyLandIndi';
import Recomendation from '../components/Recomendation';
import '../assets/StockTab.css';
import Footer from '../components/Footer';
import StockFilter from '../components/StockFilter';
import SideBar from '../components/sideBar';
import { useSelector } from 'react-redux';
import Login from '../components/Login';


const Filter =()=>{
    return(
        <div className="StockTabfilter" style={{display:"flex",flexDirection:"row"}}>
                                <input className="form-control mr-sm-2 search root" name="category" type="search"  placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success submit-button" type="button">Search</button>       
        </div>
    )
}

export default function StockTab() {
  const user = useSelector(state=>state.user);
  const seen = useSelector(state=>state.loginSeen);
  const StockLandData = useSelector(state=>state.stock)
  console.log(StockLandData);
  return (
    <div className={`StockTab `}>
      {!(seen.seen||seen.seenlog)&&<Login></Login>}

      <Navbar></Navbar>
      {(seen.seen)?<SideBar></SideBar>:<></>}
      <div className={`StockTab-block ${!(seen.seen||seen.seenlog)?"backdrop-background-blur":""}`}>
        <div>
          <Filter></Filter>
        <div className="Stockoption-block">
        {StockLandData.map((info, index) => (
              
              <StockOption 
                  key={info._id || index} 
                  Images={info.Images[0]} 
                  Price={info.Price[info.Price.length-1]} 
  
                  amount={info.Area.amount}
                  gataNumber={info.gataNumber}
                  unit = {info.Area.unit}
                  State={info.State}
                  District={info.District} 
                  Village = {info.Village}
                  Description={info.Description} 
                  Highlights={info.Highlights}
                  Category={info.Category}
                  Property={info.Property}
                  id={info._id}
                  tab ="stock"
              />
              ))}
        

            
        </div>
        </div>
        <div className='stock-filter'>
        <StockFilter></StockFilter>

        </div>
      </div>
      <div className="Stockfootpage r">
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
