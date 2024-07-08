import React,{useRef} from "react";
import './info.css';
import { useSelector } from "react-redux";
import { numTowords } from "../../Lib/ImportantFunc";
const icons = {
    Area:{ic:"fas fa-pencil-ruler",
        style:"yA",
    },
    Location:{
        ic:"fas fa-map-marked-alt",
        style:"gL"
        },
    Price:{
        ic:"fas fa-piggy-bank",
        style:"pP"
    },
    Category:{
        ic:"fas fa-shapes",
        style:"rC"
    }
}
const Data=(props)=>{
    
    return(
        <div className="buy-info-comp-data" >
            <i className={icons[props.type].ic+" "+icons[props.type].style} ></i> <small>{props.type}</small>
            <div style={{fontSize:17,paddingLeft:30}}><strong>{props.value}</strong></div>
        </div>
    )
}
const InfoBlock =()=>{
    const land = useSelector(state=>state.land);
    return(
        <div className="buyInfoComponent">
            <div className="flex flex-row">
            <Data type="Area" value={land.Area.amount+land.Area.unit}></Data>
            <Data type="Location" value={land.Location}></Data>
            </div>
            <div className="flex flex-row">
            <Data type="Price" value={numTowords(land.Price)}></Data>
            <Data type="Category" value={land.Category}></Data>
            </div>
          
        </div>
    )
}

const Overview=React.forwardRef((props, ref) =>{

    const handleFocusInput = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };
    return(
        <div className="Overview" ref={ref} >
            <img className="overview" src="https://img.freepik.com/free-photo/amazing-aerial-shot-singapore-cityscape-with-lots-skyscrapers_181624-18618.jpg?w=1060&t=st=1719822907~exp=1719823507~hmac=72467b1d3ff99b6937deb45b5d3e5120eb61220f2f5b93c65a801ca9f3840b2f"></img>
            <InfoBlock></InfoBlock>
        </div>
    )
});
export default Overview;