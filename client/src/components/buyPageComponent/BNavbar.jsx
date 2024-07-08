import React from "react";
import { useSelector } from "react-redux";
import "./BNavbar.css";
import { numTowords, numFormat } from "../../Lib/ImportantFunc";

const DivBar = () => {
  let over = document.getElementById("Overview");
  let rec = document.getElementById("rec");
  let article = document.getElementById("articles");
  const handleScroll = (e)=>{
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
const BNavbar = () => {
  const land = useSelector((state) => state.land);
  return (
    <div className="BNavbar">
      <div className="BNavbar-info">
        <div className="BNavbar-info-data-block">
          <div
            className="BNavbar-info-data"
            style={{
              borderRight: "1px solid rgb(86, 86, 86)",
              paddingRight: 20,
            }}
          >
            <strong>
              <i className="fa fa-inr" style={{ fontSize: 25 }}></i>
              {numTowords(land.Price)}
            </strong>
            <small>{` @ ${numFormat(land.Price / land.Area.amount)} per ${
              land.Area.unit
            }`}</small>
          </div>
          <div className="BNavbar-info-data flex-col text-left">
            <div className="block">{land.Category}</div>
            <div>{land.Location}</div>
          </div>
        </div>
        <div className="BNavbar-info-data-block flex-col">
          <button className="bg-blue-400 text-white BNav-contact">
          &nbsp;&nbsp;&nbsp;&nbsp;  Contact&nbsp;&nbsp;&nbsp;&nbsp;
          </button>
          <button className="bg-slate-200 text-blue-300 BNav-contact mt-2">
            <i className="fa-regular fa-heart"></i>&nbsp;&nbsp;&nbsp;ShortList
          </button>
        </div>
      </div>
      <DivBar></DivBar>
    </div>
  );
};

export default BNavbar;
