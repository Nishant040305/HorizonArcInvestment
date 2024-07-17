import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import ".././assets/Login.css";
// import "dotenv";
import { useSelector,useDispatch} from 'react-redux';
import { register } from '../Store/UserAuthSlice';
import { setSeen, setSeenlog } from '../Store/LoginSeenSlice';
import axios from "axios";
const loginwithgoogle =()=>{
    window.open(`http://localhost:5000/auth/google/callback`,"_self")
}
const Login =()=>{
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
    const [form,setForm] = useState(false);
    const [seen,setSen] = useState(false);
    const navigate = useNavigate();
    const [userVer,setUserver] = useState({
        Username:"",
        password:"",
    })
    const [user,setUser] = useState({
        fullName:"",
        email:"",
        password:"",
    })
    const [mssg,setMssg] = useState(null);
    const handleUser=(e)=>{
        setUser(
            {
                ...user,
                [e.target.name]:e.target.value
            }
        )
    }
    const handleUserVer =(e)=>{
        setUserver({
            ...userVer,
            [e.target.name] : e.target.value
        })
    }
    
    const login_email = async()=>{
        try {
            const response = await axios.post(`${BACKWEB}/register`,user,
                {
                    headers: {
                    'Accept': 'application/json',
                }
            });
            if (response.status !== 200) {
                throw new Error('Failed to Send Email');
                
            }
            else{
                setMssg(response.data.message)
                setForm(1);
            }
        } catch (e) { console.error(e) }
    }
    const login_Confirm = async()=>{
        try{
            const response = await axios.post(`${BACKWEB}/login`,userVer,
                {
                    headers: {
                    'Accept': 'application/json',
                    
                },
                mode:"cors",
                withCredentials:true

            }).then(response=>{
                if(response.status ==200){
                    dispatch(register(response.data.info));
                    dispatch(setSeen(1));
                }
            }).catch(e=>{
                setMssg(e.response.data.error)
            })
        }catch(e){
            
        }
        
    }
    return(
        
    <div className="loginpage ">
         <img className="login-image" src="https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg?w=1060&t=st=1720159831~exp=1720160431~hmac=79382a1c2c14b889a33d9dd9a94d3fc6aaf4a84884f40f76a1cd2b8ad61e775b" alt="Login" />
        <div className="Login-info">
            <div className="Login-email">
                <div className = "Login-title">
                    <div className="log">
                    {!form?"Sign In":"Log In"}
                    </div>
                    <div className="login-cross" onClick={()=>dispatch(setSeenlog(1))}><i className="	fa fa-close" style={{fontSize:35}}></i></div>
                </div>
                {form?<div className="Login-data">
                    Enter your details to Login.
                </div>:<div className="Login-data">
                    Enter your details to signin.
                </div>}
                {form?<div className="Login-content">
                <div className='text-red-500'>{mssg}</div>
                <input className ="Login-email-input" onChange={handleUserVer} name="Username" placeholder="Enter your Username" value={userVer.Username}></input>
                <input className ="Login-email-input" onChange={handleUserVer} name="password"placeholder="Enter your OTP" value={userVer.password}></input>
                <div style={{display:"flex",flexDirection:"row" , justifyContent:"center"}}><button style={{marginTop:50 ,width:250}}className=" btn Login-email-buttton" onClick={()=>{login_Confirm()}}>Confirm</button><button className='btn Login-email-buttton' style={{marginTop:50 ,width:250}} onClick={()=>login_email()}>RESEND</button>
                </div>
                </div>:
                <div className="Login-content">
                    <input className ="Login-email-input" onChange={handleUser}placeholder="Enter your FullName" name="fullName" value={user.fullName}></input>
                    <div style={{display:"flex",flexDirection:"row"}}>
                    </div>

                    <input className ="Login-email-input" onChange={handleUser}placeholder="Enter your Password" name="password" value={user.password}></input>
                    <input className ="Login-email-input" onChange={handleUser}placeholder="Enter your  Email" name="email" value={user.email}></input>

                    <button className=" btn Login-email-buttton" onClick={(e)=>{login_email()}}>Continue</button>
                </div>}
                <div className='mt-10'>
                    {!form?<div className='text-blue-500' onClick={()=>setForm(1-form)}>click here to Login</div>:<div className='text-blue-500' onClick={()=>setForm(1-form)}>Click here to register</div>}
                        </div>
            </div>
            <div className="line" style={{display:"flex"}}>
                <hr></hr> OR <hr></hr>
            </div>
            <div className="Login-Oauth">
                <div className="Login-term">
                    <div className="term">
                    By continuing, you agree to the updated <strong>Terms of Sale</strong>,<strong>Terms of Service</strong> and <strong>Privacy Policy.</strong>
                   

                    </div>
                   <div>
                   </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default Login;