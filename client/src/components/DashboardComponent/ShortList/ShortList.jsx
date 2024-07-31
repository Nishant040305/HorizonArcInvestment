import React ,{useEffect}from 'react'
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
  return (
    <div className='shortlist'>
      {shortList.dataLength!=0?shortList.data.map((info, index) => (
              
              <BuyOption 
                  key={info._id || index} 
                  Images={info.Images[0]} 
                  Price={info.Price[3]} 
  
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
  )
}

export default ShortList
