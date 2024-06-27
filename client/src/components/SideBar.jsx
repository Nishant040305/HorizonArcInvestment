import React from "react";
import '.././assets/SideBar.css';


const SideBar =()=>{
    return(
        <div className="sideBar">
            <div>
            <img className="rounded-circle profilePic" src="https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no"></img>
            <div style={{fontSize: 30}}>Nishant Mohan</div>
            </div>
            
            <div className="container"style={{fontSize: 24,alignContent:"center"}} >
                <ul>
                    <li>
                        Profile
                    </li>
                    <li>
                        Trending Stocks
                    </li>
                    <li>
                        Portfolio
                    </li>
                    <li>
                        History
                    </li>
                    
                </ul>
            </div>
            <div>Help Centre</div>
        </div>
    )
}

export default SideBar;