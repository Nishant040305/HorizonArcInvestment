import React,{useState} from "react";
import '.././assets/SideBar.css';
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { change } from "../Store/DashBoardOptionsSlice";
const SideBar =()=>{
    const [expand,setexpand] = useState(1);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const url = useSelector(state=>state.url);
    const user = useSelector(state=>state.user);
    const Portfolio =(e)=>{
        setexpand(1-expand);
        dispatch(change(e));
        Navigate(url.dashboard);
    }
    return(
        <>
        {!expand?<div className={!expand?"sideBar text-black":"sidebar active text-black"}>
            <div  className="menu absolute top-0 left-0" onClick={()=>{setexpand(!expand)}}>
            <button className="bg-white m-1 top-4"><i className="fa fa-reorder " style={{fontSize:25}}></i></button>

            </div>
            <div onClick={()=>Portfolio('profile')}>
            <img className="rounded-full profilePic" src={user.image}></img>
            <div style={{fontSize: 30}}>{user.fullName}</div>
            </div>
            
            <div className="container"style={{fontSize: 24,alignContent:"center", textAlign:"left",display:"flex",justifyContent:"centre"}} >
                <ul>
                    <li>
                    <button  className=" sidebar-button"  onClick={()=>Portfolio('profile')} > 
                        <div style={{display:"flex", alignItems:"center"}}>
                        <i className="	fas fa-user-circle "></i><div style={{marginLeft:60}}>Profile</div>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button" onClick={()=>{setexpand(1-expand);  Navigate(url.stock)}}>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <i className=" fas fa-chart-bar fa-flip-horizontal " ></i><div style={{marginLeft:60}}>Trending Stocks</div>

                        </div>
                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button" onClick={()=>Portfolio('shares')}>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <i className="fas fa-wallet text-4xl text-orange-500"></i><div style={{marginLeft:60}}>Portfolio</div>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button" onClick={()=>Portfolio('messages')}>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <i className="	fa fa-envelope text-yellow-400" style={{fontSize:40}}></i><div style={{marginLeft:60}}>Messages</div>

                        </div>

                        </button>
                    </li>
                   
                    
                </ul>
            </div>
           <label className="sidebar-button">
            <div style={{display:"flex", alignItems:"center",fontSize: 24}}>
                    <i className="fas fa-phone text-green-500" style={{fontSize:40}}></i><div style={{marginLeft:60}}>Help Centre</div>
                    
            </div>
            
            </label>
            </div>:<div  className="menu absolute top-1 left-1" onClick={()=>{setexpand(!expand)}}>
            <button className="bg-white m-1"><i className="fa fa-reorder " style={{fontSize:25}}></i></button>

            </div>}
            </>
        
    )
}

export default SideBar;