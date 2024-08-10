import React from 'react'
import '.././assets/BuyLandIndi.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { numTowords } from '../Lib/ImportantFunc';
import { removeShortlist } from '../Store/ShortListSlice';
const BuyOption=(props)=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url =useSelector(state=>state.url);
  const user = useSelector(state=>state.user);
  const removeShortlistElem =(ID)=>{
    dispatch(removeShortlist({user:user.shortList,_id:ID}))
  }
  const clickhandle =()=>{

    navigate(`/buyStockPage/${props.id}/${props.tab}`);
  }
  const highlight  = props.Highlights;
  console.log(props.Price)
  // console.log(price)
  return (
    <div className="rounded-3xl buy-cart bg-white">
      <img className="rounded-3xl buy-cart-img"src={props.Images?props.Images:"https://img.freepik.com/free-photo/amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers_181624-18618.jpg?w=1060&t=st=1719822907~exp=1719823507~hmac=72467b1d3ff99b6937deb45b5d3e5120eb61220f2f5b93c65a801ca9f3840b2f"}></img>
      <div className="buy-cart-info">
        <div className="buy-cart-info-location"><strong>{props.Village?`${props.Village}, ${props.District} near ${highlight[0].text}`:'Lehra Land Plot,Near NH230 Highway'}</strong></div>
        <div className="buy-cart-info-address">{props.Category?`${props.Category}  ${props.Village} ${props.District},${props.State} 211013`:'Residential plot/Land Lehra Prayagraj,Uttarpradesh 211013'}</div>
        <div className="buy-cart-info-block">
        <div className="buy-cart-info-amount"><div className="total_amount">{`Rs. ${numTowords(Number(props.Price))}`}</div></div>
        <div className='buy-cart-info-area'><div className="total_area">{`${props.amount}${props.unit}`}</div><div></div>Plot Area</div>
        <div className='buy-cart-info-status'><div className="total_status">Plot/Land</div><div>Ready To Use</div></div>
        </div>
        <div className="buy-cart-info-highlights"><strong>Highlights:</strong><div className="highlights">{highlight?highlight[0]?.text:'Road Facing'}</div><div className="highlights">{highlight?highlight[1]?.text:'Near Prachi Hospital'}</div></div>
        <div className='buy-cart-info-detail'>{props.Description?props.Description:`Property for sale in sector-40 , noida A residential land of 300 sq m is available for sale in sector-40, noida. Property details: Completion done. Lease rent one-Time paid. North east facing, 9 meter road Prime location property. Sale demand: 8 crores. Features: Nearby metro station, markets, schools, hospital, etc. Additional information: We have other options available for sale in various se...`}</div>
        {props.tab=="buy"?<button className="contact-but"  onClick={()=>{clickhandle()}}><i className="fas fa-phone" style={{color:'white', marginRight:5}} /><strong>Contact</strong></button>:<button className="contact-but" style={{backgroundColor:'green'}}  onClick={()=>{clickhandle()}}><strong>Buy Shares</strong></button>}
        {(props.shortlist=="shortlist")&&<button className='contact-but' style={{backgroundColor:'red',display:'flex',alignItems:'flex-end'}} onClick={()=>removeShortlistElem(props.id)}>Remove<i className='fa fa-close' style={{marginLeft:5,fontSize:20}}></i></button>}
      </div>
    </div>
  )
}

export default BuyOption;