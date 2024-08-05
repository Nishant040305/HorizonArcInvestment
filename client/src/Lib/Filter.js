import { useSelector } from "react-redux";

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

export const locationFilter =(Filter,Array)=>{
    const {latitude,longitude} = Filter;
    const FilterData=[];
    const dataWithDistances = Array.map((item) => ({
        ...item,
        distance: calculateDistance(Filter.latitude, Filter.longitude, item.location.latitude, item.location.longitude),
    }));
}

export const UserFilter = (filter, array) => {
    const user = useSelector(state=>state.user);
    const friends = useSelector(state=>state.globalUsers)
    const arr = [];
  
    for (let i = 0; i < array.length; i++) {
        
        if ((!filter||array[i].Username.toLowerCase().includes(filter.toLowerCase()))&&array[i]._id!=user._id) {
            if((friends.friends.findIndex((item)=>item._id===array[i]._id))===-1){
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
