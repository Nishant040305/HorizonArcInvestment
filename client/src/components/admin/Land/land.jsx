import React,{useState} from 'react';
import Navbar from '../Navbar';
import BuyOption from '../../BuyLandIndi';
import '../../../assets/BuyTab.css';
import Footer from '../../Footer';
import StockFilter from '../../StockFilter';
import SideBar from '../../sideBar';
import Login from'../../Login';
import { useSelector } from 'react-redux';
import LocationSearch from '../../SearchField';

export default function Land() {
  const user = useSelector(state=>state.user);
  const seen = useSelector(state=>state.loginSeen);
  const BuyLandData = useSelector(state=>state.filter);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(BuyLandData.buy.length / pageSize);

  // Get the data to display on the current page
  const currentData = BuyLandData.buy.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className={`BuyTab `}>

      <div className={`BuyTab-block`}>
      <div className='stock-filter'>
        <StockFilter></StockFilter>
      </div>
      <div className=''>
      <div className="buyoption-block">
        <LocationSearch></LocationSearch>
        {currentData.length !== 0 ? (
          currentData.map((info, index) => (
            <BuyOption
              key={info._id || index}
              Images={info.Images}
              Price={info.Price[info.Price.length-1]}
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
              admin="true"
            />
          ))
        ) : (
          <div className="flex flex-row justify-center nothinginStock">
            <img className="empty-cart" src="available_7910160.png" alt="Nothing in stock" />
          </div>
        )}
      </div>
    </div>
    </div>
      <div className="buyfootpage">
        <div className="pageCat">Pages {currentPage} to {totalPages}</div>
        <strong style={{ alignItems: 'center' }}>
          <i className="material-icons" style={{ paddingTop: 7 }}>chevron_left</i>
        </strong>
        <strong onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</strong>
        {[...Array(totalPages).keys()].map(page => (
          <button
            key={page + 1}
            className="rounded-full bg-white"
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        ))}
        <strong onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>Next Page</strong>
        <strong style={{ alignItems: 'center' }}>
          <i className="material-icons" style={{ paddingTop: 7 }}>chevron_right</i>
        </strong>
      </div>
    <Footer></Footer>

  </div>
  )
}
