import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
// import "dotenv";
import axios from "axios";
const loginwithgoogle =()=>{
    window.open(`http://localhost:5000/auth/google/callback`,"_self")
}
const OTPVerification = (props) => {
    const [timer, setTimer] = useState(30); // Set the initial timer value (in seconds)
    const [showResend, setShowResend] = useState(false); // State to show/hide the Resend button
    const navigate = useNavigate();
    let { state } = useLocation();
    const otp = state.otp;
    const email = state.email;
    const request = state.request;

    const verify = async (e)=>{
        if(request=="passwordChange"){
            if((otp ==document.getElementById('OTP_enter').value)&&(timer>0)){
                navigate(`/confirmpage`,{state:{email:email}})
            }
        }
        if(request=="emailConfirm"){
            const username = state.Username;
            const password = state.password;
            try{
            const response = await fetch('http://localhost:5000/signup/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept':"*/*",
                  },
                  body: JSON.stringify({Username:username,email:email,password:password})
                }).then(response => response.json()).then(data=>{
                  if(data.error){
                      throw new Error(data.error);
                  }
                  else{
                      console.log(data);
                      let id = data.id;
                      navigate(`/`);
                  }
                }).catch (error=>{
                      console.log(error.message)
                    
                }) 
                
            }
            catch(err){
              console.log("Some error occured");
            }
          };
        }
        
    
    
    const emailproccess = async (e)=>{
        let email_confirm = email;
        let username = "USER";
        if(request=="emailConfirm"){
            username = state.Username;
        }
        const response = await fetch("http://localhost:5000/email/",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json',
                'Accept':"*/*",
            },
            body:JSON.stringify({email:email_confirm,request:request,Username:username})
        }).then(response=>response.json()).then(data=>{
            if(data.error){
                throw new Error(data.error);
            }
            else{
                if(request=="passwordChange"){
                    navigate(`/OTP`, { state: { email: data.email, otp: data.OTP,request:"passwordChange" } })

                }
                if(request=="emailConfirm"){
                    navigate(`/OTP`, { state: { email: data.email, otp: data.OTP,request:"emailConfirm",Username:state.Username,password:state.password } })

                }
            }
        }).catch(error=>{
            console.log(error);
        })

    }
    // Start the timer as soon as the component mounts
    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);

        // Clear the interval when the timer reaches 0 and show the Resend button
        if (timer === 0) {
            clearInterval(countdown);
            setShowResend(true);
        }

        // Clean up the interval on unmount
        return () => clearInterval(countdown);
    }, [timer]);

    const resendOTP = async () => {
        emailproccess(email)
        // Reset the timer and hide the Resend button
        setTimer(30);
        setShowResend(false);
    };
    
    return(
        <div className="content-login">
            <div className="block" style={{borderTopRightRadius:20, borderEndEndRadius:20}}>
                <div className="login-universal">
                <img className="root rounded-circle" src="http://www.mnnit.ac.in/upcon2020/assets/img/mnnit_sponsor.png" alt="Shiksha"/>
                <form>
                <h3 className="title">Welcome To Shiksha</h3>

                <div className="input-div pass">
                    <div className="i">
                        <i className="fas fa-user"></i>
                    </div>
                    <div style={{marginTop:20, marginBottom:50}}>Please Enter Your OTP for verification</div>
                </div>

                <input className="password" id = "OTP_enter"style={{textAlign:"center", marginTop:0,height:70, width:400}} placeholder="Enter OTP"></input>

                <button className="signin forget-button" type="button"  onClick={(e)=>{verify(e)}}>Enter</button>
                {timer > 0 ? <div>Resend OTP in {timer} seconds</div> : <button className="signin resend-otp" onClick={resendOTP}>Resend OTP</button>}
                </form>
            </div>
            </div>
        </div>
    );
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

                    <button className=" btn Login-email-buttton" onClick={()=>{login_email()}}>Continue</button>
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