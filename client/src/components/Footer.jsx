import React from "react";
import {Link} from "react-router-dom";
import '../assets/Footer.css';
const Footer =()=>{
    return(
        <div className="product">
<footer >
        <div className="footer">
            <div className="footer-column">
                <p className="footer-links-head"><strong>POPULAR LOCATIONS</strong></p>
                <ul>
                    <li className="footer-links">Kolkata</li>
                    <li className="footer-links">Mumbai</li>
                    <li className="footer-links">Chennai</li>
                    <li className="footer-links">Pune</li>
                </ul>
            </div>


            <div className="footer-column">
                <p className="footer-links-head"><strong>TRENDING LOCATIONS</strong></p>
                <ul>
                    <li className="footer-links">Bhubaneshwar</li>
                    <li className="footer-links">Hyderabad</li>
                    <li className="footer-links">Chandigarh</li>
                    <li className="footer-links">Nashik</li>
                </ul>
            </div>

            <div className="footer-column">
                <p className="footer-links-head"><strong>ABOUT US</strong></p>
                <ul>
                    <li className="footer-links">Group</li>
                    <li className="footer-links">Blog</li>
                    <li className="footer-links">Contact Us</li>
                    <li className="footer-links">Business</li>
                    
                </ul>
            </div>


            <div className="footer-column">
                <p className="footer-links-head"><strong>HORIZAN ARC INVESTMENTS</strong></p>
                <ul>
                    <li className="footer-links">Help</li>
                    
                    <li className="footer-links">Sitemap</li>
                    <li className="footer-links">Terms of Use</li>
                    <li className="footer-links">Privacy Policy</li>
                   
                </ul>
            </div>


            <div className="footer-column footer-column2">
                <p className="footer-links-head"><strong>FOLLOW US</strong></p>
                <div className="social-footer-links" >
                    <span className="social-footer-links">
                    <a href="https://www.instagram.com/nishant040305" > <i className="fa-brands fa-facebook" style={{color:'white'}} ></i></a>
                    </span>
                    <span className="social-footer-links">
                    <a href="https://www.instagram.com/nishant040305" >  <i className="fa-brands fa-twitter" style={{color:'white'}}></i></a>
                    </span>
                    <span className="social-footer-links">
                    <a href="https://www.instagram.com/nishant040305" > <i className="fa-brands fa-youtube" style={{color:'white'}}></i></a>
                    </span>
                    <span className="social-footer-links">
                    <a href="https://www.instagram.com/nishant040305" ><i className="fa-brands fa-square-instagram" style={{color:'white'}}/></a>
                    </span>
                </div>

               
            </div>
           
        </div>
        <div className="footer-credit-bg">
            <div className="footer-credit">
                <p className="footer-credit-p"><strong className="footer-credit-p">All rights reserved © 2024 HORIZAN ARC INVESTMENTS</strong></p>
            </div>
        </div>

    </footer>
        </div>
        
      
    )
}

export default Footer;