import React,{useState} from 'react';
import Navbar from '../components/Navbar';
import StockOption from '../components/BuyLandIndi';
import Recomendation from '../components/Recomendation';
import '../assets/StockTab.css';
import Footer from '../components/Footer';
import StockFilter from '../components/StockFilter';
import SideBar from '../components/sideBar';
import { useSelector } from 'react-redux';
import Login from '../components/Login';


const Filter =()=>{
    return(
        <div className="StockTabfilter" style={{display:"flex",flexDirection:"row"}}>
                                <input className="form-control mr-sm-2 search root" name="category" type="search"  placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-outline-success submit-button" type="button">Search</button>       
        </div>
    )
}

export default function StockTab() {
  const user = useSelector(state=>state.user);
  const seen = useSelector(state=>state.loginSeen);
  const StockLandData = useSelector(state=>state.filter)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page

  // Calculate the total number of pages
  const totalPages = Math.ceil(StockLandData.stock.length / pageSize);

  // Get the data to display on the current page
  const currentData = StockLandData.stock.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className={`StockTab `}>
      {!(seen.seen||seen.seenlog)&&<Login></Login>}

      <Navbar></Navbar>
      {(seen.seen)?<SideBar></SideBar>:<></>}
      <div className={`StockTab-block ${!(seen.seen||seen.seenlog)?"backdrop-background-blur":""}`}>
        <div>
          <Filter></Filter>
        <div className="Stockoption-block">
        {currentData.length!=0?currentData.map((info, index) => (
              
              <StockOption 
                  key={info._id || index} 
                  Images={info.Images[0]} 
                  Price={info.Price[info.Price.length-1]} 
  
                  amount={info.Area.amount}
                  gataNumber={info.gataNumber}
                  unit = {info.Area.unit}
                  State={info.State}
                  District={info.District} 
                  Village = {info.Village}
                  Description={info.Description} 
                  Highlights={info.Highlights}
                  Category={info.Category}
                  Property={info.Property}
                  id={info._id}
                  tab ="stock"
              />
              )):<div className='flex flex-row justify-center nothinginStock'><img className='empty-cart' src="available_7910160.png"></img></div>}
        

            
        </div>
        </div>
        <div className='stock-filter'>
        <StockFilter></StockFilter>

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
