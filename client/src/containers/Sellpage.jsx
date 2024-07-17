import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ".././assets/Sellpage.css";
// import "dotenv";
import axios from "axios";
import SideBar from '../components/sideBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const loginwithgoogle =()=>{
    window.open(`http://localhost:5000/auth/google/callback`,"_self")
}
const Sell =()=>{
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    const [userId,setUserId] = useState('');
    const [name,setName] = useState('');
    const [varotp,setvartp]  = useState('');
    const [otp,setOtp] = useState('');
    const [otpMessage,setOtpMessage] = useState(false);
    const [seen,setSeen] = useState(false);
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [fullname,setFullname] = useState('');
    const [gatanum,setGatanum] = useState('');
    const [state,setState] = useState('');
    const [district,setDistrict] = useState('');
    const [mandal,setMandal] = useState('');
    const [loc,setLoc] = useState('');

    const [dob,setDob] = useState('');
    const [pan, setPan] = useState('');
    const [number,setNumber] = useState('');

    const handleEmail =(e)=>{
        setEmail(e.target.value)
    }
    const handleGatanum=(e)=>{
        setGatanum(e.target.value)
    }
    const handleState=(e)=>{
        setState(e.target.value)
    }
    const handleDistrict=(e)=>{
        setDistrict(e.target.value)
    }
    const handleMandal=(e)=>{
        setMandal(e.target.value)
    }
    const handleLoc=(e)=>{
        setLoc(e.target.value)
    }
    const handleFullname =(e)=>{
        setFullname(e.target.value)
    }
    const handleMobile =(e)=>{
        setNumber(e.target.value)
    }
    const handleDob =(e)=>{
        setDob(e.target.value)
    }
    const handlePan =(e)=>{
        setPan(e.target.value)
    }
    const handleName =(e)=>{
        setName(e.target.value);
    }
    const handleOtp =(e)=>{
        setvartp(e.target.value);
    }
    
    const login_email = async()=>{
        try {
            const response = await axios.post(`${BACKWEB}/jsonwebtoken`,{pan:pan,mobile:number,dob:dob,Name:fullname,email:email},
                {
                    headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
            }
            else{
                
                // setOtp(1);
                // setOtpMessage(1)
            }
        } catch (e) { console.error(e) }
    }
    const login_Confirm = async()=>{
        if(varotp==otp){
            const response = await axios.post(`${BACKWEB}/ConfirmDetail`,{pan:pan,mobile:number,dob:dob,Name:fullname,email:email},
                {headers: {
                'Accept': 'application/json',
            }
            });
            if (response.status !==200){
                throw new Error('Internal Server Error');
            }
            else{
                setUserId(response.data._id);
                
            }
        }
        else if(varotp!=otp){
            const response = await axios.post(`${BACKWEB}/getInfo`,{pan:pan},
                {headers: {
                'Accept': 'application/json',
            }
            });
            if (response.status !==200){
                throw new Error('Internal Server Error');
            }
            else{
                setUserId(response.data._id);
                
            }
        }
        
    }
    return(
        
    <div className="loginpage">
         <img className="login-image selling-img" src="https://img.freepik.com/premium-photo/new-york-city-skyscraper-background-snowy-mountains-ink-black-white-drawing_1015980-600208.jpg?w=740" alt="Login" />
        <div className="Login-info">
            <div className="Login-email">
                <div className = "Login-title">
                    <div className="log">
                    <small>Details for Selling the Land</small>
                    </div>
                    <div className="login-cross"><i className="	fa fa-close" style={{fontSize:50}}></i></div>
                </div>
                {otpMessage?<div className="Login-data">
                    Enter your OTP.
                </div>:<div className="Login-data">
                    <small>Kindly Provide the details as per your pan card and and khatauni.</small>
                </div>}
                {otpMessage?<div className="Login-content">
                
                <input className ="Login-email-input" onChange={handleOtp}placeholder="     Enter your OTP" value={varotp}></input>
                <div style={{display:"flex",flexDirection:"row"}}><button style={{marginTop:50 ,width:250}}className=" btn Login-email-buttton" onClick={()=>{login_Confirm()}}>Confirm</button><div className='btn Login-email-buttton' style={{marginTop:50 ,width:250}}>RESEND</div>
                </div>
                </div>:
                <div className="Login-content">
                    <input className ="Login-email-input" onChange={handleGatanum}placeholder="     Enter your Gata Number of the land" value={gatanum}></input>

                    <div style={{display:'flex'}}>
                    <input className ="Login-email-input" onChange={handleState}placeholder="     Enter your State" value={state}></input>
                    <input className ="Login-email-input" onChange={handleDistrict}placeholder="     Enter your District" value={district}></input>
                    </div>
                    <div style={{display:'flex'}}>
                    <input className ="Login-email-input" onChange={handleMandal}placeholder="     Enter your Mandal" value={mandal}></input>
                    <input className ="Login-email-input" onChange={handleLoc}placeholder="     Enter your Village/City" value={loc}></input>
                    </div>
                    <input className ="Login-email-input" onChange={handleFullname}placeholder="     Enter your FullName" value={fullname}></input>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <input className ="Login-email-input" onChange={handlePan}placeholder="     Enter your PAN" value={pan}></input>
                        <input className ="Login-email-input" onChange={handleMobile}placeholder="     Enter your Mobile Number" value={number}></input>
                    </div>

                    <input className ="Login-email-input" onChange={handleEmail}placeholder="     Enter your  Email" value={email}></input>

                    <button className=" btn Login-email-buttton sell-butt" onClick={()=>{login_email()}}>Continue</button>
                </div>}

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