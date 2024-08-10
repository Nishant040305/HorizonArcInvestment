import React from 'react'
import './Traninfo.css';
export default function Traninfo(props) {
  const category = props.Category;
  return (
    <div className="traninfo">
      <div className="data"><strong>Transaction Type:</strong><div>Offline</div></div>
      <div className="data"><strong>Property Hold:</strong><div>Leasehold</div></div>
      <div className="data"><strong>Category:</strong><div>{category}</div></div>
    </div>
  )
}
