import React from 'react'
import '.././assets/BuyLandIndi.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { setLand } from '../Store/BuyStockSlice';
import { setLandAction } from '../Actions/BuyStocksetPageAction';
import { useSelector ,useDispatch} from 'react-redux';

function BuyOption(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url =useSelector(state=>state.url);
  const action = {
    Area:{amount:1250,unit:"sqft"},
    Location:"Lehra, Prayagraj",
    Price:400000000,
    Category:"Residential/Plot"
  }
  const clickhandle =()=>{
    console.log("action",action);
    dispatch(setLand(action));
  navigate(url.page);
  }
  return (
    <div className="rounded-3xl buy-cart bg-white" onClick={()=>{clickhandle()}}>
      <img className="rounded-3xl buy-cart-img"src="https://img.freepik.com/free-photo/amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers_181624-18618.jpg?w=1060&t=st=1719822907~exp=1719823507~hmac=72467b1d3ff99b6937deb45b5d3e5120eb61220f2f5b93c65a801ca9f3840b2f"></img>
      <div className="buy-cart-info">
        <div className="buy-cart-info-location"><strong>Lehra Land Plot,Near NH230 Highway</strong></div>
        <div className="buy-cart-info-address">Residential land/Plot Lehra Prayagraj,Uttarpradesh 211013</div>
        <div className="buy-cart-info-block">
        <div className="buy-cart-info-amount"><div className="total_amount">Rs.40 Lakhs</div></div>
        <div className='buy-cart-info-area'><div className="total_area">1250sqft</div><div></div>Plot Area</div>
        <div className='buy-cart-info-status'><div className="total_status">Plot/Land</div><div>Ready To Use</div></div>
        </div>
        <div className="buy-cart-info-highlights"><strong>Highlights:</strong><div className="highlights">Road Facing</div><div className="highlights">Near Prachi Hospital</div></div>
        <div className='buy-cart-info-detail'>Property for sale in sector-40 , noida A residential land of 300 sq m is available for sale in sector-40, noida. Property details: Completion done. Lease rent one-Time paid. North east facing, 9 meter road Prime location property. Sale demand: 8 crores. Features: Nearby metro station, markets, schools, hospital, etc. Additional information: We have other options available for sale in various se...</div>
        {props.tab=="buy"?<button className="contact-but"><i className="fas fa-phone" style={{color:'white', marginRight:5}} /><strong>Contact</strong></button>:<button className="contact-but" style={{backgroundColor:'green'}}><strong>Buy Shares</strong></button>}
      </div>
    
    </div>
  )
}

export default BuyOption;