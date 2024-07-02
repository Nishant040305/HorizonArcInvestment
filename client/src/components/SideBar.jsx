import React from "react";
import '.././assets/SideBar.css';


const SideBar =()=>{
    return(
        <div className="sideBar text-black">
            <div  className="menu absolute top-0 ">
            <button className="bg-white m-1"><i class="fa fa-reorder " style={{fontSize:25}}></i></button>

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
                        <i class="	fas fa-user-circle " ></i><spam style={{marginLeft:60}}>Profile</spam>

                        </div>

                        </button>
                    </li>
                    <li>
                    <button className=" sidebar-button">
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
                    <button className="sidebar-button">
                    <div style={{display:"flex", alignItems:"center"}}>
                        <img className="w-9 h-9"src="history.png"></img><spam style={{marginLeft:60}}>History</spam>

                        </div>

                        </button>
                    </li>
                    
                </ul>
            </div>
           <button className="sidebar-button">
            <div style={{display:"flex", alignItems:"center",fontSize: 24}}>
                    <i class="fas fa-phone text-green-500" style={{fontSize:40}}></i><spam style={{marginLeft:60}}>Help Centre</spam>
            </div>

            </button>
            </div>
        
    )
}

export default SideBar;