import React from "react";
import '.././assets/SideBar.css';


const SideBar =()=>{
    return(
        <div className="sideBar text-black">
            <div  className="menu absolute top-0 ">
            <button className="bg-white "><img src="menu.png" className="w-7 h-7"></img></button>

            </div>
            <div>
            <img className="rounded-full profilePic" src="https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no"></img>
            <div style={{fontSize: 30}}>Nishant Mohan</div>
            </div>
            
            <div className="container"style={{fontSize: 24,alignContent:"center", textAlign:"left",display:"flex",justifyContent:"centre"}} >
                <ul>
                    <li>
                    <button  className="bg-white sidebar-button" > 
                        <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="user.png"></img><spam style={{marginLeft:60}}>Profile</spam>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className="bg-white sidebar-button">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="bar-chart.png"></img><spam style={{marginLeft:60}}>Trending Stocks</spam>

                        </div>
                        </button>
                    </li>
                    <li>
                    <button className="bg-white sidebar-button">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="project.png"></img><spam style={{marginLeft:60}}>Portfolio</spam>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className="bg-white sidebar-button">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="history.png"></img><spam style={{marginLeft:60}}>History</spam>

                        </div>

                        </button>
                    </li>
                    
                </ul>
            </div>
           <button className="bg-white sidebar-button">
            <div style={{display:"flex", alignItems:"center",fontSize: 24}}>
                    <img className="w-9 h-9"src="call.png"></img><spam style={{marginLeft:60}}>Help Centre</spam>
            </div>

            </button>
            </div>
        
    )
}

export default SideBar;