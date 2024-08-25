import React from 'react'
import '.././assets/Recommendation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ImageSlider from './imageSlider';
import { numTowords } from '../Lib/ImportantFunc';
import { useNavigate } from 'react-router-dom';
function Recomendation(props) {
  const navigate = useNavigate();
  const clickhandle =()=>{
    navigate(`/buyStockPage/${props.id}/${props.tab}`);
  }
  const highlight  = props.Highlights;

  return (
    <div className="rounded-3xl recomnd-cart bg-white" onClick={()=>{clickhandle()}}>
      <ImageSlider height="250px" width="290px" images={props.Images}></ImageSlider>
      <div className="recomnd-cart-info">
        <div className="recomnd-cart-info-location"><strong>{props.Village?`${props.Village}, ${props.District} near ${highlight[0].text}`:'Lehra Land Plot,Near NH230 Highway'}</strong></div>
        <div className="recomnd-cart-info-block">
        <div className="recomnd-cart-info-amount"><div className="total_amount" style={{fontSize:20}}>{`Rs. ${numTowords(Number(props.Price))}`}</div></div>
        <div className='recomnd-cart-info-area'><div className="total_area" style={{fontSize:20}}>{`${props.amount}${props.unit}`}</div></div>
        </div>
        {props.tab=="buy"?<button className="contact-but"><i className="fas fa-phone" style={{color:'white', marginRight:5}} /><strong>Contact</strong></button>:<button className="contact-but" style={{backgroundColor:'green'}}><strong>Buy Shares</strong></button>}

      </div>
    
    </div>
  )
}

export default Recomendation;