import React, { useState, useRef } from 'react';
import Recomendation from '../Recomendation';
import './Recomd.css';
import { useSelector } from 'react-redux';

const ITEMS_PER_PAGE = 4;

const Recomd = React.forwardRef((props, ref) => {
  const [currentPage, setCurrentPage] = useState(1);
  const buyLandData = useSelector((state) => state.buyData);
  const totalPages = Math.ceil(buyLandData.length / ITEMS_PER_PAGE);

  const handleFocusInput = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const currentData = buyLandData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className='rec' ref={ref}>
      <div className="justify-between"style={{ fontSize: 30, fontWeight: 500, textAlign: "left",display:"flex", flexDirection:"row"}}>
        <div>Similar Properties</div>
        <div className='flex flex-row pr-40'>
        <div onClick={handlePrevPage} style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}>
            <i className="material-icons" style={{ paddingTop: 7 }}>chevron_left</i>
          </div>
          <div className='pr-10 pl-10'><small>{`${currentPage}/${totalPages}`}</small></div>

          <div onClick={handleNextPage} style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed' }}>
            <i className="material-icons" style={{ paddingTop: 7 }}>chevron_right</i>
          </div>
        </div>
      </div>
      <div className='recbuy'>
        {currentData.map((info, index) => (
          <Recomendation
            key={info._id || index}
            Images={info.Images}
            Price={info.Price[info.Price.length - 1]}
            amount={info.Area.amount}
            gataNumber={info.gataNumber}
            unit={info.Area.unit}
            State={info.State}
            District={info.District}
            Village={info.Village}
            Description={info.Description}
            Highlights={info.Highlights}
            Category={info.Category}
            Property={info.Property}
            id={info._id}
            tab="buy"
          />
        ))}
      </div>
    </div>
  );
});

export default Recomd;
