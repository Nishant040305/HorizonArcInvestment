import React,{useState} from "react";
import '.././assets/Navbar.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSeen, setSeenlog } from "../Store/LoginSeenSlice";
import { register } from "../Store/UserAuthSlice";
const Navbar =(props)=>{
    let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
    const navigate = useNavigate();
    const searchByLocation =()=>{
        return null;
    }  
    const handlelocation=(e)=>{
        setLocation(e.target.value);
    }
    
    const [location,setLocation] = useState('');
    const user = useSelector(state=>state.user);
    const url  = useSelector(state=>state.url);
    const seen = useSelector(state=>state.loginSeen);
    const dispatch = useDispatch();
    const Sellpg=()=>{
        if(!seen.seen) dispatch(setSeenlog(0))
        else{
            navigate(url.sell)
    }
    }
    const getDomainFromUrl = (url) => {
        try {
            const { hostname } = new URL(url);
            return hostname;
        } catch (e) {
            console.error("Invalid URL:", e);
            return "";
        }
    };
    
    function deleteCookie() {
        const domain = getDomainFromUrl(BACKWEB)
        // Delete cookie by setting it to an expired date and specifying the domain
        document.cookie = `uid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; domain=${domain}; path=/`;
        
        dispatch(register({}));
        dispatch(setSeen(0));
        dispatch(setSeenlog(1));
    }
    
     return(
        <div className="Navbar left-0   text-black">
            <div className="Navbar-head " >
                <div className="Navbar-head nav-options-block  float-left left-0 top-0">
                <button style={{backgroundColor: "#f0f5f5",visibility:"hidden"}}><i className="fa fa-reorder" style={{fontSize:30}}></i></button>
                <div className="nav-options" onClick={()=>{navigate(url.stock)}}>
                   <i className="fas fa-chart-bar" style={{fontSize:35}}></i>
                    <div className="spam">Stocks</div>
                    
                </div> 
                <div className="nav-options" onClick={()=>{navigate(url.buy)}}>
                    <i className="fas fa-home text-3xl text-blue-300"></i>
                    <div className="spam">Buy</div>
                </div>
                <div className="nav-options" onClick={()=>Sellpg()}>
                    <i className="fas fa-balance-scale text-3xl text-orange-300"></i>
                    <div className="spam">Sell</div>
                </div>

                </div>
            <>
            {seen.seen?<div className="" style={{display:"flex", marginRight:100}} >
                <hr className="vertical-line"></hr>
                <div className="personal-data" onClick={()=>navigate(url.dashboard)}>
                <img className="w-12 h-12 rounded-full" src={user.image}></img>
                <div className="text-name"style={{marginLeft:10,textWrap:"nowrap"}}>{user.fullName}</div>
                <button className="btn bg-black text-white logout-button  " onClick={()=>deleteCookie()}>Logout</button>
                </div>
            </div>:<button className="btn bg-white text-black border-slate-700 logout-button "style={{marginRight:100,fontWeight:500}} onClick={()=>dispatch(setSeenlog(0))}>Login</button>}</>
            </div>
        
            
            </div>


    )
}

export default Navbar;