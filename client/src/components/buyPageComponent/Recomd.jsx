import React from 'react'
import Recomendation from '../Recomendation';
import './Recomd.css'
export default function Recomd() {
  return (
    
    <div className='rec' id = 'rec'>
    <div style={{fontSize:30,fontWeight:500,textAlign:"left"}}>Similar Properties</div>
    <div className='recbuy'>
    <Recomendation tab = "buy"></Recomendation>
      <Recomendation tab = "buy"></Recomendation>
      <Recomendation tab = "buy"></Recomendation>
      <Recomendation tab = "buy"></Recomendation>
    </div>



    </div>
  
  )
}
