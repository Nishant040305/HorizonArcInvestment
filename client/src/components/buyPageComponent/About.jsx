import React from "react";
import './About.css';
 const AboutProp=(props)=>{
    return(
        <div className="aboutProp">
            <strong>
                About the Property
            </strong>
            <div className="data"> {props.decription}</div>
        </div>
    )
}
export default AboutProp;