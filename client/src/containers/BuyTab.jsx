import React,{useState} from 'react';
import Navbar from '../components/Navbar';
import BuyOption from '../components/BuyLandIndi';
import Recomendation from '../components/Recomendation';
import '../assets/BuyTab.css';
import Footer from '../components/Footer';
import StockFilter from '../components/StockFilter';
import SideBar from '../components/sideBar';
import Login from '../components/Login';
import { useSelector } from 'react-redux';
const Filter =()=>{
    return(
        <div className="buyTabfilter" style={{display:"flex",flexDirection:"row"}}>
                                <input className="form-control mr-sm-2 search root" name="category" type="search"  placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success submit-button" type="button">Search</button>       
        </div>
    )
}
export default function BuyTab() {
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

      {!(seen.seen||seen.seenlog)&&<Login></Login>}
      <Navbar></Navbar>
      {(seen.seen)?<SideBar></SideBar>:<></>}
      <div className={`BuyTab-block ${!(seen.seen||seen.seenlog)?"backdrop-background-blur":""}`}>
      <div className='stock-filter'>
        <StockFilter></StockFilter>
      </div>
      <div className=''>
      <div className="buyoption-block">
        <Filter />
        {currentData.length !== 0 ? (
          currentData.map((info, index) => (
            <BuyOption
              key={info._id || index}
              Images={info.Images[0]}
              Price={info.Price[3]}
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
