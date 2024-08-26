import { useSelector } from "react-redux";
import {calculateDistance} from "./ImportantFunc";
export const PriceFilter = (Filter,Array)=>{
    const FilterData = [];
    for(let i = 0;i<Array.length;i++){
        let val = Array[i].Price[Array[i].Price.length-1];
        if(val<=Filter.Max && val>=Filter.Min){
            FilterData.push(Array[i])
        }
    }
    return FilterData;
}
export const AreaFilter = (Filter,Array)=>{
    const FilterData = [];
    for(let i = 0;i<Array.length;i++){
        let val = Array[i].Area.amount;
        if(val<=Filter.Max && val>=Filter.Min){
            FilterData.push(Array[i])
        }
    }
    return FilterData;
}

export const locationFilter = (Filter, Array) => {
    const {latitude,longitude} = Filter;
    // Calculate distance for each item and store it along with the item
    const dataWithDistances = Array.map((item) => ({
        ...item,
        distance: calculateDistance(latitude, longitude, item.location.latitude, item.location.longitude),
    }));

    // Sort the array based on distance in increasing order
    const sortedData = dataWithDistances.sort((a, b) => a.distance - b.distance);

    // Return the sorted array
    return sortedData;

};
export const CategoryFilter = (filter,array)=>{
    const result = [];
    if(filter!="Residential/plot"&&filter!="Commercial/plot"){
        return array;
    }

    for(let i= 0;i<array.length;i++){
        if(array[i].Category==filter){
            result.push(array[i]);
        }
    }
    return result;
}
export const UserFilter = (filter, array) => {
    const user = useSelector(state=>state.user);
    const friends = useSelector(state=>state.globalUsers)
    const arr = [];
  
    for (let i = 0; i < array.length; i++) {
        
        if ((!filter||array[i].Username.toLowerCase().includes(filter.toLowerCase()))&&array[i]._id!=user._id) {
            if((friends.friends.findIndex((item)=>item===array[i]._id))===-1){
                let b = {
                    ...array[i],
                    friend:false
                }
                arr.push(b);
            }
            else{
                let b = {
                    ...array[i],
                    friend:true
                }
                arr.push(b);
            }
            
            
        }
        
    }
    return arr;
}
