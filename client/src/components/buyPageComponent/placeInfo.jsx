import React from "react";
import './placeInfo.css';
const icons ={
    Hospital:"fas fa-ambulance",
    Airport:"fas fa-helicopter",
    Train:"fas fa-subway",

}
const Place=(props)=>{
    return(
        <div className="place">
            <i className={icons[props.type]}></i>&nbsp;{props.locality}
        </div>
    )
}
const PlaceNearby=(props)=>{
    const highlight = props;
    console.log(highlight)

    return(
        <div className="place-nearby">
            <div className="flex flex-row place-img-block">
            <img className="w-15 h-10"src="https://static.99acres.com/universalapp/img/landmarkGroup.png"></img><div style={{marginLeft:20}}><div style={{fontSize:20,fontWeight:500}}>Place Nearby</div><div style={{fontSize:18,fontWeight:400,marginTop:-6}}>Lehra, Prayagraj</div></div>


            </div>

            <div className="flex flex-row" style={{marginTop:20}}>
            {highlight?.Highlights?highlight.Highlights.map((info,index)=>(
            <Place type={info.type} locality={info.text}></Place>

            )):""}
   
            </div>
           
        </div>
    )
}
export default PlaceNearby;