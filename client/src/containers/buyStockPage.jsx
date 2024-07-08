import React from "react";
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
const Index =()=>{
    return(
        <div className="index" >
            <Navbar></Navbar>
            <SideBar></SideBar>
            <BNavbar></BNavbar>
            <div className="buy-index">
            <Overview></Overview>
            <PlaceNearby></PlaceNearby>
            <Traninfo></Traninfo>
            <AboutProp></AboutProp>
            <Recomd></Recomd>
            <Articles></Articles>
            <Footer></Footer>
            </div>
            
        </div>
        
    )
}

export default Index;