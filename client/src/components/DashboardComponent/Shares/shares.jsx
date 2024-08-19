import React from 'react'
import './shares.css';
import Sharesgaraph from './Sharesgaraph';
import SharesBar from './SharesBar';
const Shares = () => {
  return (
    <div className='Shares'>
      <Sharesgaraph></Sharesgaraph>
      <div className='shares-right'>
        <div className='shares-block-head'>Shares</div>
      <div className='sharesBlock'>
      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>
      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>

      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>
      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>

      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>
      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>
      <SharesBar id="XYPQ452DX" value="5000"></SharesBar>

     

      </div>
      </div>
    </div>
  )
}

export default Shares;
