import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ".././assets/Sellpage.css";
// import "dotenv";
import axios from "axios";
import SideBar from '../components/sideBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import data from '../Constants/sorted_data.json';
import { socket } from '../Lib/socket';
import { useSelector } from 'react-redux';
const Sell =()=>{
    const user = useSelector(state=>state.user)
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    const[land,setLand] = useState({
        Area:{amount:null,unit:'sq.m'},
        gataNumber:null, 
        State:null,
        District:null,
        Division:null,
        Village:null,
        Email:null,
        phoneNumber:null,
        fullName:null,
        panNumber:null
    })
    const[location,setLocation] = useState({
        State:null,
        Division:null,
        District:null,
        Village:null,
      
        
    })
    const handleChange=(e)=>{
        if([e.target.name]=="Area"){
            setLand({
                ...land,
                Area:{
                    ...land.Area,
                    amount:e.target.value,
                }
            })
        }
        else if(e.target.name=="unit"){
            setLand({
                ...land,
                Area:{
                    ...land.Area,
                    unit:e.target.value,
                }
            })
        }
        else{
            setLand({
                ...land,
                [e.target.name]:e.target.value,
            })
        }
       
    }
    const handleLocation = (e) => {
        const {name,value} = e.target;
        if(value==""){
            return;
        }
        else if(value!="" &&value!=null&&value!=undefined&&name!="Village"){
            let variable = {
                ...location,
                [name]: value,
                ...(name === "State" && { Division: null, District: null, Village: null}),
                ...(name === "Division" && { District: null, Village: null  }),
                ...(name === "District" && { Village: null, }),

            }
          
            setLocation(variable);
            setLand({
                ...land,
                ...variable
            })
        }
        else if(name=="Village"){
            let variable = {
                ...location,
                [name]:value,
                

            }
            setLocation(variable)
            setLand(((prev)=>(
               {
                ...prev,
                ...variable
               }

            )))
            
        }
        
    };
    const sendNotification=async()=>{
        socket.emit('Sell',{SenderId:user._id,message:land});
        return ()=>{
            socket.off('Sell');
        }
    }
    useEffect(()=>{
        console.log(land);
        console.log(location);
    },[location,land])
    return(
        
    <div className="loginpage">
         <img className="login-image selling-img" src="https://img.freepik.com/premium-photo/new-york-city-skyscraper-background-snowy-mountains-ink-black-white-drawing_1015980-600208.jpg?w=740" alt="Login" />
        <div className="Login-info">
            <div className="Login-email">
                <div className = "Login-title">
                    <div className="log">
                    <small>Details for Selling the Land</small>
                    </div>
                </div>
               
                <div className="Login-content">
                    <input className ="Login-email-input" onChange={(e)=>handleChange(e)} name="gataNumber"placeholder="     Enter your Gata Number of the land" value={land.gataNumber}></input>
            <div className='flex flex-row'>
            <select className="Login-email-input login-location" value={location.State || ''} onChange={(e) => handleLocation(e)} name='State'>
            <option value="">Select State</option>
                {Object.keys(data).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>
            <select className="Login-email-input login-location" value={location.Division} onChange={(e)=>handleLocation(e)}  name='Division'>
            <option value="">Select Division</option>
            {location.State&&Object.keys(data[location.State]).map(key => (
            <option value={key}>{key}</option>))}
            </select>
            </div>
            <div className='flex flex-row'>
            <select className="Login-email-input login-location" value={location.District}  onChange={(e)=>handleLocation(e)}  name='District'>
            <option value="">Select District</option>
            {location.Division&&Object.keys(data[location.State][location.Division]).map(key => (
            <option value={key}>{key}</option>))}
            </select>
            <select className="Login-email-input login-location"  onChange={(e)=>handleLocation(e)}  name='Village'>
            <option value="">Select Village/City</option>
            {location.District&&Object.keys(data[location.State][location.Division][location.District]).map(key => (
            <option value={key}>{key}</option>))}
            </select>          
            </div>
             <div className=' text-left flex flex-row ' >
                    <input className="Login-email-input h-12" type="number" placeholder="Area:"onChange={(e)=>handleChange(e)}   name='Area'></input>
                    <select className="Login-email-input login-location form-control from   "onChange={(e)=>handleChange(e)} name="unit">
                    <option value="sq.m">sq.m</option>
                    <option value="hectare">Hectare</option>
                    <option value="sq.ft">Sq. Feet</option>
                </select></div >
                    <input className ="Login-email-input" onChange={(e)=>handleChange(e)}placeholder="     Enter your FullName" name="fullName" value={land.fullName}></input>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <input className ="Login-email-input" onChange={(e)=>handleChange(e)}placeholder="     Enter your PAN" name="panNumber" value={land.panNumber}></input>
                        <input className ="Login-email-input" onChange={(e)=>handleChange(e)} name="phoneNumber" placeholder="     Enter your Mobile Number" value={land.phoneNumber}></input>
                    </div>

                    <input className ="Login-email-input" onChange={(e)=>handleChange(e)}placeholder="     Enter your  Email" name="Email" value={land.Email}></input>

                    <button className=" btn Login-email-buttton sell-butt" onClick={()=>{sendNotification()}}>Continue</button>
                </div>

            </div>
            
            <div className="line" style={{display:"flex"}}>
            </div>
            <div className="Login-Oauth">
                <div className="Login-term">
                    <div className="term">
                    By continuing, you agree to the updated <strong>Terms of Sale</strong>,<strong>Terms of Service</strong> and <strong>Privacy Policy.</strong>

                    </div>
                   
                </div>
            </div>
        </div>
    </div>
    )
}


const Sellpage=()=>{
    return(
        <>
        
    <div className="sell" >
        <Navbar></Navbar>
        <SideBar></SideBar>
        <Sell></Sell>
    </div>
    <Footer></Footer>
    </>)
}
export default Sellpage;