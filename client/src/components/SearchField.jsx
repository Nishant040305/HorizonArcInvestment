import React, { useState } from 'react';
import axios from 'axios';
import { Suggestion } from '../Lib/Suggestion';
import { useDispatch } from 'react-redux';
import { setLocationFilterBuy } from '../Store/FilterDataSlice';

function LocationSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const fetchSuggestions = async (input) => {
    if (input.length > 2) {
        const result = Suggestion(query);
        setSuggestions(result);
    } else {
      setSuggestions([]);
    }
    
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name); // Or any relevant field
    setSuggestions([]);
  };
  const Search =()=>{
    const result = Suggestion(query);
    if(result.length!=0){
      const filter = {
        latitude:result[0].latitude,
        longitude:result[0].longitude
      }
      dispatch(setLocationFilterBuy(filter));
    }

  }
  return (
    <>
    
        <div className="buyTabfilter" style={{display:"flex",flexDirection:"row",zIndex:1000,position:"relative" }} >
            
            <input className="form-control mr-sm-2 search root" name="category" type="search" value={query} onChange={handleInputChange} placeholder="Search" aria-label="Search"/>
            

          <button className="btn btn-outline-success submit-button" type="button" onClick={()=>Search()}>Search</button>
          </div> 
          {suggestions.length > 0 && (
                <ul className="suggestions-list form-control mr-sm-2 search-options root " style={{position:"absolute",zIndex:1000}}>
                    {suggestions.map((suggestion,index) => (
                    <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                        >
                        {suggestion.name}
                    </li>
                    ))}
                </ul>
                )}
      
    </>
  );
}

export default LocationSearch;
