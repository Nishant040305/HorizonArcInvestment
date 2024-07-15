import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../assets/Login.css';

const VerifyComponent = () => {
  const BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
  const { id, token } = useParams();
  const [Username, setUsername] = useState(null);
  const [mssg, setMssg] = useState(null);
  let T = 0;
  axios.defaults.withCredentials = true;
  const verifyUser = async () => {

      try {
        const response = await axios.get(`${BACKWEB}/users/${id}/verify/${token}`,{
          mode:"cors",
          withCredentials: true 
        }).then(response=>{
          console.log(response)
          setUsername(response.data.info);

        }).catch(e=>{
          setMssg(e.response.data.message)
        })
        
        
      } catch (error) {
        setMssg("Internal Server Error")
      }
  
    
  };

  useEffect(() => {
    verifyUser();
  }, [1]);

  return (
    <div className='Verify'>
      {Username || mssg ? <h2>Kindly Do Not Reload the Page</h2> : <h1>...Loading</h1>}
      {Username && <img className='verify-img' src="https://c7.alamy.com/comp/2ABNAN7/green-check-mark-icon-in-a-circle-tick-symbol-in-green-color-2ABNAN7.jpg" alt="Verified" />}
      {mssg && <img className='verify-img' src="https://www.shutterstock.com/shutterstock/photos/1386505274/display_1500/stock-vector-x-marks-two-red-crossed-vector-brush-strokes-rejected-sign-in-grunge-style-1386505274.jpg" alt="Invalid Link" />}
      <div style={{ fontSize: 30 }}>{mssg || Username}</div>
      {Username || mssg ? <Link to="http://localhost:5173"><button className='bg-green-300 text-white'>Return to Home Page</button></Link> : ""}
    </div>
  );
};

export default VerifyComponent;
