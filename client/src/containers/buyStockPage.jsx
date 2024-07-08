import React,{useRef} from "react";
import PlaceNearby from "../components/buyPageComponent/placeInfo";
import Overview from "../components/buyPageComponent/Info";
import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import BNavbar from "../components/buyPageComponent/BNavbar";
import '../components/buyPageComponent//index.css';
import Traninfo from "../components/buyPageComponent/Traninfo";
import Footer from "../components/Footer";
import AboutProp from "../components/buyPageComponent/About";
import Recomd from "../components/buyPageComponent/Recomd";
import Articles from "../components/buyPageComponent/Articles";
import { useSelector } from "react-redux";
import "../components/buyPageComponent/BNavbar.css";
import { numTowords, numFormat } from "../Lib/ImportantFunc";

const Index =()=>{
    const land = useSelector((state) => state.land);

    const handleScroll = (e)=>{
        const over = document.getElementById("over");
        const rec = document.getElementById("rec");
        const article = document.getElementById("article");
      console.log("test")
        if(e=="over"){
            over.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        }
        else if(e=="rec"){
            rec.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        }
        else if(e=="article"){
            article.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})

        }
    }
    return(

        <div className="index" >
            <Navbar></Navbar>
            <SideBar></SideBar>
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
      <div className="Bbar">
        <div className="Bbar-head-active" onClick={()=>{handleScroll("over")}}>Overview</div>
  
  
        <div className="Bbar-head" onClick={()=>{handleScroll("rec")}}>Recommandeation</div>
  
        <div className="Bbar-head" onClick={()=>{handleScroll("article")}}>Articles</div>
      </div>
    </div>
            <div className="buy-index">
                <div id="over">
                <Overview ></Overview>
                </div>

            <PlaceNearby></PlaceNearby>
            <Traninfo></Traninfo>
            <AboutProp></AboutProp>
            <div id="rec">
            <Recomd ></Recomd>
            </div>
            <div id ="article">
            <Articles ></Articles>
            </div>
            <Footer></Footer>
            </div>
            
        </div>
        
    )
}

export default Index;