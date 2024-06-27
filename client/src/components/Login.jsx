import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ".././assets/Login.css";
// import "dotenv";
import axios from "axios";
import { Button } from 'flowbite-react';

const loginwithgoogle =()=>{
    window.open(`http://localhost:5000/auth/google/callback`,"_self")
}
const Login =()=>{
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
    const [dob,setDob] = useState('');
    const [pan, setPan] = useState('');
    const [number,setNumber] = useState('');
    const handleEmail =(e)=>{
        setEmail(e.target.value)
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
            console.log(`${BACKWEB}/Pan`)
            const response = await axios.post(`${BACKWEB}/Pan`,{pan:pan,mobile:number,dob:dob,Name:fullname,email:email},
                {
                    headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
            }
            else{
                console.log("yes");
                
                setOtp(1);
                console.log(response.data.otp);
                setOtpMessage(1)
            }
        } catch (e) { console.error(e) }
    }
    const login_Confirm = async()=>{
        if(varotp==otp){
            console.log("here we go");
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
         <img className="login-image" src="vite.svg" alt="Login" />
        <div className="Login-info">
            <div className="Login-email">
                <div className = "Login-title">
                    <div className="log">
                    Sign In
                    </div>
                    <div className="login-cross"><img src="vite.svg"></img></div>
                </div>
                {otpMessage?<div className="Login-data">
                    Enter your OTP.
                </div>:<div className="Login-data">
                    Enter your email to log in.
                </div>}
                {otpMessage?<div className="Login-content">
                
                <input className ="Login-email-input" onChange={handleOtp}placeholder="     Enter your OTP" value={varotp}></input>
                <div style={{display:"flex",flexDirection:"row"}}><button style={{marginTop:50 ,width:250}}className=" btn Login-email-buttton" onClick={()=>{login_Confirm()}}>Confirm</button><div className='btn Login-email-buttton' style={{marginTop:50 ,width:250}}>RESEND</div>
                </div>
                </div>:
                <div className="Login-content">
                    <input className ="Login-email-input" onChange={handleFullname}placeholder="     Enter your FullName" value={fullname}></input>
                    <div style={{display:"flex",flexDirection:"row"}}>
                        <input className ="Login-email-input" onChange={handlePan}placeholder="     Enter your PAN" value={pan}></input>
                        <input className ="Login-email-input" onChange={handleDob} type="date" placeholder="     Enter your Date of Birth" value={dob}></input>
                    </div>

                    <input className ="Login-email-input" onChange={handleMobile}placeholder="     Enter your Mobile Number" value={number}></input>
                    <input className ="Login-email-input" onChange={handleEmail}placeholder="     Enter your  Email" value={email}></input>
                
                    <button className=" btn Login-email-buttton " onClick={()=>{login_email()}}>Continue</button>
                </div>}

            </div>
            <div className="line" style={{display:"flex"}}>
                <hr></hr> OR <hr></hr>
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
export default Login;