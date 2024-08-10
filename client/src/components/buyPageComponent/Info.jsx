import React,{useEffect, useRef,useState} from "react";
import './info.css';
import { useSelector } from "react-redux";
import { numTowords } from "../../Lib/ImportantFunc";
import { useNavigate, useParams } from "react-router-dom";
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
const InfoBlock =(props)=>{
    const navigate = useNavigate();
    const land = props.props
    const url = useSelector(state=>state.url);
    const highlight = land?.Highlights;

    return(
        <div className="buyInfoComponent">
            <div className="flex flex-row">
            <Data type="Area" value={`${land?.Area?.amount} ${land?.Area?.unit}`}></Data>
            <Data type="Location" value={`${land?.Village}, ${land?.District} near ${highlight?highlight[0].text:""}`}></Data>
            </div>
            <div className="flex flex-row">
            <Data type="Price" value={numTowords(land?.Price[land?.Price.length-1])}></Data>
            <Data type="Category" value={`${land?.Category}`}></Data>
            </div>
          
        </div>
    )
}

const Overview=React.forwardRef((props, ref) =>{
    const {id} = useParams();
    const navigate = useNavigate();
    const BuyLandData = useSelector(state=>state.buyData);
    const land = props.props;
    const url = useSelector(state=>state.url);
 
    const handleFocusInput = () => {
        if (ref.current) {
            ref.current.focus();
        }
    };
    return(
        <div className="Overview" ref={ref} >
            <img className="overview" src={land?.Images[0]}></img>
            <InfoBlock props={land}></InfoBlock>
        </div>
    )
});
export default Overview;