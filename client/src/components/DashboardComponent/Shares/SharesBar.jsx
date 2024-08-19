import React from 'react'
import './SharesBar.css'
const SharesBar = (props) => {
  return (
    <div className='share-bar'>
        <div className='share-bar-id'>{props.id}</div>
        <div className='text-green-700'>
            <strong>value:</strong>{props.value}
        </div>
        <div >
            <button className='bg-green-500 text-white mr-10 w-28'>SELL</button>

        </div>
    </div>
  )
}

export default SharesBar
