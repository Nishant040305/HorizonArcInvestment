import React,{useRef} from 'react'
import Recomendation from '../Recomendation';
import './Recomd.css'
const Recomd=React.forwardRef((props, ref) =>{

  const handleFocusInput = () => {
      if (ref.current) {
          ref.current.focus();
      }
  };
  return (
    
    <div className='rec' ref={ref} >
    <div style={{fontSize:30,fontWeight:500,textAlign:"left"}}>Similar Properties</div>
    <div className='recbuy'>
    <Recomendation tab = "buy"></Recomendation>
      <Recomendation tab = "buy"></Recomendation>
      <Recomendation tab = "buy"></Recomendation>
      <Recomendation tab = "buy"></Recomendation>
    </div>



    </div>
  
  )
});

export default Recomd;