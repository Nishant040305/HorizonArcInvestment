import React from 'react'
import '.././assets/Recommendation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Recomendation(props) {
  return (
    <div className="rounded-3xl recomnd-cart bg-white">
      <img className="rounded-3xl recomnd-cart-img"src="https://img.freepik.com/free-photo/amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers_181624-18618.jpg?w=1060&t=st=1719822907~exp=1719823507~hmac=72467b1d3ff99b6937deb45b5d3e5120eb61220f2f5b93c65a801ca9f3840b2f"></img>
      <div className="recomnd-cart-info">
        <div className="recomnd-cart-info-location"><strong>Lehra Land Plot,Near NH230 Highway</strong></div>
        <div className="recomnd-cart-info-block">
        <div className="recomnd-cart-info-amount"><div className="total_amount">Rs.40 Lakhs</div></div>
        <div className='recomnd-cart-info-area'><div className="total_area">1250sqft<spam style={{fontSize:18,fontWeight:400,marginLeft:10}}>(200sqm)</spam></div></div>
        </div>
        <div className="recomnd-cart-info-highlights"><strong>Highlights:</strong><div className="highlights">Road Facing</div><div className="highlights">Near Prachi Hospital</div></div>
        {props.tab=="buy"?<button className="contact-but"><i className="fas fa-phone" style={{color:'white', marginRight:5}} /><strong>Contact</strong></button>:<button className="contact-but" style={{backgroundColor:'green'}}><strong>Buy Shares</strong></button>}

      </div>
    
    </div>
  )
}

export default Recomendation;