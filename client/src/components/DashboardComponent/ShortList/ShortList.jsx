import React ,{useEffect,useState}from 'react'
import BuyOption from '../../BuyLandIndi';
import './Shortlist.css';
import { useDispatch, useSelector } from 'react-redux';
import { ShortListData } from '../../../Lib/ImportantFunc';
import { setShortlist } from '../../../Store/ShortListSlice';
const ShortList = () => {
  // const shortList = useSelector(state=>state.shortList);
  const dispatch = useDispatch();
  const user = useSelector(state=>state.user);
  const BuyData = useSelector(state=>state.buyData);
  const shortList = useSelector(state=>state.shortList);
  const data = [];
  for(let j=0;j<shortList.length;j++){
    for(let i=0;i<BuyData.length;i++){
      if(BuyData[i]._id==shortList[j]){
        data.push(BuyData[i]);
        break;
      }
    }
  }
  
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page
  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / pageSize);

  // Get the data to display on the current page
  const currentData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  return (
    <div className='bg-white shortcontainer'>
    <div className='shortlist'>
      {currentData.length!=0?currentData.map((info, index) => (
              <BuyOption 
                  key={info._id || index} 
                  Images={info.Images} 
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
                  tab="buy"
                  shortlist="shortlist"
              />
              )):<div className='flex flex-row justify-center'><img className='empty-cart' src="shopping.png"></img></div>}
            
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
  </div></div>
  )
}

export default ShortList
