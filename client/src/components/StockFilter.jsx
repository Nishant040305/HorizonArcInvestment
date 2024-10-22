import React, { useState ,useRef, useEffect} from 'react';
import '../assets/StockFilter.css';
import Slider from 'react-slider';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {  setPriceFilterBuy, setPriceFilterStocks,setAreaFilterBuy ,setAreaFilterStock, setTag, deleteTag} from '../Store/FilterDataSlice';
import { numTowords } from '../Lib/ImportantFunc';
const Selectedfilter =(props)=>{
  const dispatch = useDispatch();
  const buydata = useSelector(state=>state.buyData);
  const stockData = useSelector(state=>state.stock)
    const PlotTypeFilter = ()=>{
      if(props.type=='add'){
        const url = new URL(window.location.href);
        url.searchParams.set('plot_type',props.filter.text);
        window.history.pushState({}, '', url);
        dispatch(setTag({...props.filter,buy:buydata,stock:stockData}));
      }
    }
    const deleteTagblock=()=>{
      dispatch(deleteTag({...props.filter,buy:buydata,stock:stockData}));
    }
    return(
        <>
        {props.type=="add"?<div className='stockSelectte bg-slate-100 rounded-3xl' onClick={()=>PlotTypeFilter()}>
             <div>{props.filter.text}</div><div className="text-slate-400"style={{marginLeft:8,fontSize:25}}>+</div>
        </div>:<div className='stockSelect bg-blue-50 rounded-3xl'>
        <div>{props.filter.text}</div><i className='fa fa-times' style={{color:'blue',marginLeft:8}} onClick={()=>deleteTagblock()}></i>
   </div>}
   </>
    )
}
const Projectsfilter=(props)=>{
    return(
        <div style={{display:'flex',alignItems:'flex-end'}}>
            <input type="checkbox" style={{width:20,height:20,marginLeft:20,marginTop:10,marginRight:10,color:'white'}} className='bg-white '></input>
            <div >{props.message}</div>
        </div>
    )
}

export default function StockFilter() {
    const tag_ = useSelector(state=>state.filter);
    const tag = tag_.tag;
    const v0ref = useRef(null);
    const v1ref = useRef(null);
    const Max = 1000000000;
    const Min = 0;
    const AMax = 20000;
    const AMin = 0;
    const filter = useSelector(state=>state.filter);
    const buydata = useSelector(state=>state.buyData);
    const stockData = useSelector(state=>state.stock)
    const setValue = (e) => {
      setVal(e);
      const url = new URL(window.location.href);
      url.searchParams.set('min', e[0]);
      url.searchParams.set('max', e[1]);
      window.history.pushState({}, '', url);
  
      // Now the URL is updated, and you can access min and max from the URL parameters.
  };

  const setAreaSearch =(e)=>{
    setArea(e);
    const url = new URL(window.location.href);
      url.searchParams.set('Amin', e[0]);
      url.searchParams.set('Amax', e[1]);
      window.history.pushState({}, '', url);
  }
    const category = [
      {text:"Residential/plot",
        type:"plot_type"
      },
      {text:"Commercial/plot",
        type:"plot_type"
      }
    ]
    const [value, setVal] = useState([Min, Max]);
    const [error, setError] = useState(0); // Initialize error to 0
    const [area,setArea] = useState([AMin,AMax]);
    const makeEditable = (ref) => {
      if (ref.current) {
        ref.current.contentEditable = "true";
        ref.current.focus();
      }
    };
  
    const validateAndUpdateValues = () => {
      const newValue0 = parseFloat(v0ref.current.innerText);
      const newValue1 = parseFloat(v1ref.current.innerText);
  
      if (!isNaN(newValue0) && !isNaN(newValue1)) {
        if (newValue0 >= Min && newValue0 <= newValue1 && newValue1 <= Max) {
          setVal([newValue0, newValue1]);
          setError(0); // Valid conditions, set error to 0
        } else {
          setError(1); // Invalid conditions, set error to 1
        }
      } else {
        setError(1); // Non-numeric input, set error to 1
      }
    };
  
    useEffect(() => {
      validateAndUpdateValues();
    }, []);
    const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (value[0] !== null && value[1] !== null) {
        dispatch(setTag({type:"minAmount",amount:value[0],text:`Starting from ${numTowords(value[0])}`,buy:buydata,stock:stockData}));
        dispatch(setTag({type:"maxAmount",amount:value[1],text:`Ending with ${numTowords(value[1])}`,buy:buydata,stock:stockData}));
      
      
    }
  }, [value]);
  useEffect(() => {
    if (area[0] !== null && area[1] !== null) {
        dispatch(setTag({type:"minArea",amount:area[0], text:`Starting with ${area[0]} hectar`,buy:buydata,stock:stockData}));
        dispatch(setTag({type:"maxArea",amount:area[1],text:`upto ${area[1]} hectar`,buy:buydata,stock:stockData}));
    }
  }, [area]);
  const deleteTagAll=()=>{
    for(let i=0;i<tag.length;i++){
      dispatch(deleteTag({...tag[i],buy:buydata,stock:stockData}));
      value[0] = 0;
      value[1] = Max;
      area[1]=AMax
      area[0] = 0;
    }
  }
  const DeleteArea=()=>{
    for(let i=0;i<tag.length;i++){
      dispatch(deleteTag({type:"maxArea",buy:buydata,stock:stockData}));
      dispatch(deleteTag({type:"minArea",buy:buydata,stock:stockData}))
      area[1]=AMax
      area[0] = 0;
    }
  }
  const DeletePrice=()=>{
    for(let i=0;i<tag.length;i++){
      dispatch(deleteTag({type:"maxAmount",buy:buydata,stock:stockData}));
      dispatch(deleteTag({type:"minAmount",buy:buydata,stock:stockData}))
      value[1]=Max
      value[0] = 0;
    }
  }
  return (
    <div className='stockfilter'>
      {tag.length!=0&&<><div className='stock-applied-filter'>
        <div>Applied Filters</div><div style={{color:'blue'}} onClick={()=>deleteTagAll()}>Clear All</div>
        
      </div>
      <div className='stock-filter-list'>
        {tag.map((info,index)=>(
          
          <Selectedfilter key={index} filter={info}></Selectedfilter>)
          )}
        </div>
     </>}
        <div className='stock-budget'>
        <div>Budget</div><div style={{color:'blue'}} onClick={()=>DeletePrice()}>Clear All</div>
        </div>
        <Slider className='slider' value = {value} onChange={setValue} min={Min} max={Max}></Slider>
        <div className='stock-budget-input'>
            <div style={{display:'flex'}}><div className="stock-budget-input-data2">Min</div>
        <div
          className="stock-budget-input-data"
          ref={v0ref}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={validateAndUpdateValues}
        >
          {value[0]}
        </div></div>
        <div style={{display:'flex'}}>
        <div className="stock-budget-input-data2">Max</div>
        <div
          className="stock-budget-input-data"
          ref={v1ref}
          contentEditable="true"
          suppressContentEditableWarning={true}
          onBlur={validateAndUpdateValues}
        >
          {value[1]}
        </div>
        </div>

        </div>
        {error === 1 && (
        <div style={{ color: "red" }}>Invalid input. Please check the values.</div>
      )}
      <div className="linesha"></div>
      <div className="stock-type-prop">
      <div>Type Of Properties</div><div style={{color:'blue'}}>Clear All</div>
      </div>
      <div className='stock-filter-list'>
        {category.map((info,index)=>(<Selectedfilter  key={index}type="add"filter={info}></Selectedfilter>))}
        </div>
        <div className='stock-budget'>
        <div>Area<small>&nbsp;(sq m)</small></div><div style={{color:'blue'}} onClick={()=>DeleteArea()}>Clear All</div>
        </div>
        <Slider className='slider' value = {area} onChange={setAreaSearch} min={AMin} max={AMax}></Slider>
        <div className='stock-budget-input'>
            <div style={{display:'flex'}}>
        <div className="stock-budget-input-data">
          {area[0]}
        </div></div>
        <div style={{display:'flex'}}>
        <div className="stock-budget-input-data">
          {area[1]}
        </div>
        </div>

        </div>
        {/* <div className="linesha"></div> */}
        {/* <div className='stock-budget' style={{marginBottom:30}}>
        <div>New Projects/Society </div><div style={{color:'blue'}}>Clear All</div>
        </div>
        <div style={{display:'flex',flexDirection:"column"}}>
            <Projectsfilter message="National Highway NH23"></Projectsfilter>
            <Projectsfilter message="Eiffel Tower"></Projectsfilter>

        </div> */}
      </div>
  )
}
