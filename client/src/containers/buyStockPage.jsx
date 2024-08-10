import React,{useRef, useState,useEffect} from "react";
import PlaceNearby from "../components/buyPageComponent/placeInfo";
import Overview from "../components/buyPageComponent/Info";
import SideBar from "../components/sideBar";
import Navbar from "../components/Navbar";
import '../components/buyPageComponent//index.css';
import Traninfo from "../components/buyPageComponent/Traninfo";
import Footer from "../components/Footer";
import AboutProp from "../components/buyPageComponent/About";
import Recomd from "../components/buyPageComponent/Recomd";
import Articles from "../components/buyPageComponent/Articles";
import { useDispatch, useSelector } from "react-redux";
import "../components/buyPageComponent/BNavbar.css";
import { numTowords, numFormat } from "../Lib/ImportantFunc";
import Login from "../components/Login";
import { useNavigate, useParams } from "react-router-dom";
import { addShortlist } from "../Store/ShortListSlice";
import axios from "axios";

const Index =()=>{
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    const {id,tab} = useParams();
    const navigate = useNavigate();
    const BuyLandData = useSelector(state=>state.buyData);
    const StockLandData = useSelector(state=>state.stock);
    const url = useSelector(state=>state.url);
    const user = useSelector(state=>state.user);
    const dispatch = useDispatch();
    const [land,setLand] = useState(null);
    const ShortList = useSelector(state=>state.shortList);
    const [select,setSelect] = useState(null);
    const [tabSelect,setTabselect] = useState('over');
    const addToShortList =async()=>{
      if(seen.seen&&!select) setSelect(1-select);
      if(seen.seen) dispatch(addShortlist({user:user.shortList,land:land}));}
    const seen = useSelector(state=>state.loginSeen);
    const handleScroll = (e)=>{
        const over = document.getElementById("over");
        const rec = document.getElementById("rec");
        const article = document.getElementById("article");
        if(e=="over"){
            setTabselect('over');
            over.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        }
        else if(e=="rec"){
            setTabselect('rec')
            rec.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
        }
        else if(e=="article"){
            setTabselect('article')
            article.scrollIntoView({behavior: "smooth", block: "center", inline: "center"})

        }
    }
    useEffect(()=>{
      if(tab=="buy"){
        setLand(BuyLandData[BuyLandData.findIndex(x=>x._id===id)])
      }
       else if(tab=="stock"){
        setLand(StockLandData[StockLandData.findIndex(x=>x._id===id)])
       }
    },[tab,id,StockLandData,BuyLandData])
    const highlight = land?.Highlights;
    console.log(highlight)
    return(

        <div className={`index`} >
            {!(seen.seen||seen.seenlog)&&<Login></Login>}
            <Navbar></Navbar>

            {(seen.seen)?<SideBar></SideBar>:<></>}

            <div className={`BNavbar ${!(seen.seen||seen.seenlog)?"backdrop-background-blur":""}`}>
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
              {numTowords(land?.Price[land?.Price.length-1])}
            </strong>
            <small>{` @ ${numFormat(land?.Price[land?.Price.length-1]/ land?.Area?.amount)} per ${
              land?.Area?.unit
            }`}</small>
          </div>
          <div className="BNavbar-info-data flex-col text-left">
            <div className="block">{`${land?.Category}`}</div>
            <div>{`${land?.Village}, ${land?.District} near ${highlight?highlight[0].text:""}`}</div>
          </div>
        </div>
        <div className="BNavbar-info-data-block flex-col">
          {tab=="buy"?<button className="bg-blue-400 text-white BNav-contact">
          &nbsp;&nbsp;&nbsp;&nbsp;  Contact&nbsp;&nbsp;&nbsp;&nbsp;
          </button>:<button className="bg-green-400 pl-7 pr-6 text-white BNav-contact">
          Buy Shares
          </button>}
          {tab=="buy"?<button className="bg-slate-200 text-blue-300 BNav-contact mt-2 pl-5 pr-8" onClick={()=>addToShortList()}>
          <i className={`${seen.seen&&select?'fa-solid':'fa-regular'} fa-heart`}></i>ShortList</button>:<></>}
        </div>
      </div>
      <div className="Bbar">
        <div className={`${tabSelect=="over"?'Bbar-head-active':'Bbar-head'}`} onClick={()=>{handleScroll("over")}}>Overview</div>
  
  
        <div className={`${tabSelect=="rec"?'Bbar-head-active':'Bbar-head'}`} onClick={()=>{handleScroll("rec")}}>Recommendation</div>
  
        <div className={`${tabSelect=="article"?'Bbar-head-active':'Bbar-head'}`} onClick={()=>{handleScroll("article")}}>Articles</div>
      </div>
    </div>
            <div className={`buy-index ${!(seen.seen||seen.seenlog)?"backdrop-background-blur":""}`}>
                <div id="over">
                <Overview props={land}></Overview>
                </div>

            <PlaceNearby Highlights={land?.Highlights}></PlaceNearby>
            <Traninfo Category={land?.Category}></Traninfo>
            <AboutProp props={land?.Description}></AboutProp>
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