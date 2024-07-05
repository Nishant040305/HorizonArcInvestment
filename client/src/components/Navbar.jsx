import React,{useState} from "react";
import '.././assets/Navbar.css';
import { useNavigate } from "react-router-dom";
const Navbar =(props)=>{
    const navigate = useNavigate();
    const searchByLocation =()=>{
        return null;
    }  
    const handlelocation=(e)=>{
        setLocation(e.target.value);
    }

    const [location,setLocation] = useState('');
     return(
        <div className="Navbar left-0   text-black">
            <div className="Navbar-head " >
                <div className="Navbar-head nav-options-block  float-left left-0 top-0">
                <button style={{backgroundColor: "#f0f5f5",visibility:"hidden"}}><i className="fa fa-reorder" style={{fontSize:30}}></i></button>
                <div className="nav-options" onClick={()=>{navigate('/stockTab')}}>
                    <img className="w-8 h-8 m-1"src="financial-profit.png"></img>
                    <div className="spam">Stocks</div>
                    
                </div> 
                <div className="nav-options" onClick={()=>{navigate('/buyTab')}}>
                    <img className="w-8 h-8 m-1"src="buy.png" ></img>
                    <div className="spam">Buy</div>
                </div>
                <div className="nav-options" onClick={()=>{navigate('/sell')}}>
                    <img className="w-8 h-8 m-1"src="hand.png"></img>
                    <div className="spam">Sell</div>
                </div>

                </div>
            
            <div className="" style={{display:"flex", marginRight:100}}>
                <hr className="vertical-line"></hr>
                <div className="personal-data">
                <img className="w-12 h-12 rounded-full" src={props.image}></img>
                <div className="text-name"style={{marginLeft:10,textWrap:"nowrap"}}>{props.name}</div>
                <button className="btn bg-black text-white logout-button ">Logout</button>
            </div>
                </div>
            
            </div>
        
            
            </div>


    )
}

export default Navbar;