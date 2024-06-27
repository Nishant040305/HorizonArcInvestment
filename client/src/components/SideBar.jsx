import React from "react";
import '.././assets/SideBar.css';
const SideBar =()=>{
    return(
        <div className="sideBar">
            <div>
            <img className="rounded-circle profilePic" src="https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no"></img>
            <div style={{fontSize: 30}}>Nishant Mohan</div>
            </div>
            <div>
            <div className="container"style={{fontSize: 24,alignContent:"center"}} >
                <ul style={{textAlign:"left"}}>
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
            </div>
            
            <div style={{fontSize: 25 ,display:"flex" , flexDirection:"row",alignItems: "center"}}><img src="viber_152851.png" className="w-6 h-6" ></img><spam style={{margin:15}}>Help Centre</spam></div>
        </div>
    )
}

export default SideBar;