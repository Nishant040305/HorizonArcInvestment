import React,{useState} from "react";
import '.././assets/SideBar.css';
import { useNavigate } from "react-router-dom";
const SideBar =()=>{
    const [expand,setexpand] = useState(1);
    const Navigate = useNavigate();
    return(
        <>
        {!expand?<div className={!expand?"sideBar text-black":"sidebar active text-black"}>
            <div  className="menu absolute top-0 " onClick={()=>{setexpand(!expand)}}>
            <button className="bg-white m-1 top-4"><i className="fa fa-reorder " style={{fontSize:25}}></i></button>

            </div>
            <div>
            <img className="rounded-full profilePic" src="https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no"></img>
            <div style={{fontSize: 30}}>Nishant Mohan</div>
            </div>
            
            <div className="container"style={{fontSize: 24,alignContent:"center", textAlign:"left",display:"flex",justifyContent:"centre"}} >
                <ul>
                    <li>
                    <button  className=" sidebar-button" > 
                        <div style={{display:"flex", alignItems:"center"}}>
                        <i className="	fas fa-user-circle " ></i><spam style={{marginLeft:60}}>Profile</spam>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button" onClick={()=>{setexpand(1-expand);  Navigate('/stockTab')}}>
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="bar-chart.png"></img><spam style={{marginLeft:60}}>Trending Stocks</spam>

                        </div>
                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="project.png"></img><spam style={{marginLeft:60}}>Portfolio</spam>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <i className="	fa fa-envelope text-yellow-400" style={{fontSize:40}}></i><spam style={{marginLeft:60}}>Messages</spam>

                        </div>

                        </button>
                    </li>
                   
                    
                </ul>
            </div>
           <label className="sidebar-button">
            <div style={{display:"flex", alignItems:"center",fontSize: 24}}>
                    <i className="fas fa-phone text-green-500" style={{fontSize:40}}></i><spam style={{marginLeft:60}}>Help Centre</spam>
                    
            </div>
            
            </label>
            </div>:<div  className="menu absolute top-1 left-1" onClick={()=>{setexpand(!expand)}}>
            <button className="bg-white m-1"><i className="fa fa-reorder " style={{fontSize:25}}></i></button>

            </div>}
            </>
        
    )
}

export default SideBar;