import React, { useRef } from 'react';
import "./BNavbar.css";
import Overview from './Info';
import Recomd from './Recomd';
import Articles from './Articles';

const DivBar = () => {
    let over = document.getElementById("Overview");
    let rec = document.getElementById("rec");
    let article = document.getElementById("articles");
    const handleScroll = (e)=>{
      console.log("test")
      e.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    }
    return (  
      <div className="Bbar">
        <div className="Bbar-head-active" onClick={()=>{handleScroll(over)}}>Overview</div>
  
  
        <div className="Bbar-head" onClick={()=>{handleScroll(rec)}}>Recommandeation</div>
  
        <div className="Bbar-head" onClick={()=>{handleScroll(article)}}>Articles</div>
      </div>
    );
  };

export default DivBar;
