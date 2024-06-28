import React,{useState} from "react";
import '../assets/Navbar.css';

const Navbar =()=>{
    const searchByLocation =()=>{
        return null;
    }  
    const handlelocation=(e)=>{
        setLocation(e.target.value);
    }

    const [location,setLocation] = useState('');
     return(
        <div className="Navbar left-0 top-0  text-black">
            <div className="Navbar-head " style={{marginRight:100}}>
                <div className="Navbar-head nav-options-block  float-left left-0 top-0">
                <button style={{    backgroundColor: "#f0f5f5"}}><img src="menu.png" className="w-7 h-7"></img></button>
                <div className="nav-options">
                    <img className="w-8 h-8 m-1"src="financial-profit.png"></img>
                    <div className="spam">Stocks</div>
                    
                </div> 
                <div className="nav-options">
                    <img className="w-8 h-8 m-1"src="buy.png" ></img>
                    <div className="spam">Buy</div>
                </div>
                <div className="nav-options">
                    <img className="w-8 h-8 m-1"src="hand.png"></img>
                    <div className="spam">Sell</div>
                </div>
                <input className="form-control mr-sm-2 search root" name="category"  type="search"  placeholder="Search" aria-label="Search"/>
                <button className="btn bg-black text-white rounded-lg h-11 m-2" type="button">Search</button>
                </div>
            
            <div className="" style={{display:"flex", marginRight:100}}>
                <hr className="vertical-line"></hr>
                <div className="personal-data">
                <img className="w-12 h-12 rounded-full" src="https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no"></img>
                <div className="text-name"style={{marginLeft:10,textWrap:"nowrap"}}>Nishant Mohan</div>
                <button className="btn bg-black text-white logout-button ">Logout</button>
            </div>
                </div>
            
            </div>
        
            
            </div>


    )
}

export default Navbar;