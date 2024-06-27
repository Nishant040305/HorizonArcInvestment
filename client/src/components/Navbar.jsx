import React from "react";
import '../assets/Navbar.css';

const Navbar =()=>{
    return(
        <div className="Navbar bg-green-200 text-white">
            <ul>
                <li>
                    Stocks
                </li>
                <li>
                    Buy Land
                </li>
                <li>
                    Sell Land
                </li>
            </ul>
        </div>
    )
}

export default Navbar;