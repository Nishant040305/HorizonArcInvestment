import { PriceFilter,AreaFilter, locationFilter, CategoryFilter } from "../Lib/Filter";
import { useSelector } from "react-redux";
export const FilterReducer =(state,action)=>{

    switch (action.type) {
        case 'filterData/setBuyStockData':
            const filterbuystock = {
                ...state,
                ...action.payload
            }
            return filterbuystock;
            break;
        case 'filterData/setPriceFilterStocks':
            let data_ ={
                ...state,
                stock:PriceFilter(action.payload.filter,action.payload.data)
            }
            return data_;
        case 'filterData/setPriceFilterBuy':
            let data ={
                ...state,
                buy:PriceFilter(action.payload.filter,action.payload.data)
            }
            return data;
        case 'filterData/setAreaFilterStock':
            let data__ ={
                ...state,
                stock:AreaFilter(action.payload.filter,action.payload.data)
            }
            return data__;
        case 'filterData/setAreaFilterBuy':
            let data___ ={
                ...state,
                buy:AreaFilter(action.payload.filter,action.payload.data)
            }
            return data___;
            case 'filterData/setLocationFilterBuy':
                const plainBuyArray = state.buy.map(item => ({ ...item }));
                const plainStockArray = state.stock.map(item=>({ ...item }))
                const filterlocation = {
                    ...state,
                    stock:locationFilter(action.payload, plainStockArray),
                    buy: locationFilter(action.payload, plainBuyArray)
                };
                return filterlocation;
        case 'filterData/searchGlobalUser':
            state['globalUser'] = action.payload;
            return state;
        case 'filterData/setTag': 
                const updatedTags = state.tag.filter(tag => tag.type !== action.payload.type);
                if(action.payload.type=="minAmount"){

                    if(action.payload.amount!=0) updatedTags.push({type:"minAmount",amount:action.payload.amount,text:action.payload.text});

                }
                else if(action.payload.type=="maxAmount"){
                    if(action.payload.amount!=1000000000) updatedTags.push({type:"maxAmount",amount:action.payload.amount,text:action.payload.text});

                }
                else if(action.payload.type=="minArea"){
                    if(action.payload.amount!=0) updatedTags.push({type:"minArea",amount:action.payload.amount,text:action.payload.text});
                }
                else if(action.payload.type=="maxArea"){
                    if(action.payload.amount!=20000) updatedTags.push({type:"maxArea",amount:action.payload.amount,text:action.payload.text})
                }
                else if(action.payload.type=="plot_type"){
                    if(action.payload.text=="Residential/plot"||action.payload.text=="Commercial/plot") updatedTags.push({type:"plot_type",text:action.payload.text})
                }
                else if(action.payload.type=="location"){
                    updatedTags.push({type:"location",text:action.payload.text,location:action.payload.location})
                }
                let filter_ = {...state,
                    tag:updatedTags,
                    buy:action.payload.buy,
                    stock:action.payload.stock,
                }
                for(let i=0;i<updatedTags.length;i++){
                    if(updatedTags[i].type=="minAmount"){
                        filter_={
                            ...filter_,
                            buy:PriceFilter({Min:updatedTags[i].amount,Max:1000000000},filter_.buy),
                            stock:PriceFilter({Min:updatedTags[i].amount,Max:1000000000},filter_.stock),
                        }
                    }
                    if(updatedTags[i].type=="maxAmount"){
                        filter_={
                            ...filter_,
                            buy:PriceFilter({Min:0,Max:updatedTags[i].amount},filter_.buy),
                            stock:PriceFilter({Min:0,Max:updatedTags[i].amount},filter_.stock),
                        }
                    }
                    if(updatedTags[i].type=="minArea"){
                        filter_={
                            ...filter_,
                            buy:AreaFilter({Min:updatedTags[i].amount,Max:20000},filter_.buy),
                            stock:AreaFilter({Min:updatedTags[i].amount,Max:20000},filter_.stock),
                        }
                    }
                    if(updatedTags[i].type=="maxArea"){
                        filter_={
                            ...filter_,
                            buy:AreaFilter({Min:0,Max:updatedTags[i].amount},filter_.buy),
                            stock:AreaFilter({Min:0,Max:updatedTags[i].amount},filter_.stock),
                        }
                    }
                    if(updatedTags[i].type=="location"){
                        filter_={
                            ...filter_,
                            buy:locationFilter(updatedTags[i].location,filter_.buy),
                            stock:locationFilter(updatedTags[i].location,filter_.stock),
                        }
                    }
                    if(updatedTags[i].type=="plot_type"){
                        filter_={
                            ...filter_,
                            buy:CategoryFilter(updatedTags[i].text,filter_.buy),
                            stock:CategoryFilter(updatedTags[i].text,filter_.stock)
                        }
                    }
                }
                return filter_
            
        case 'filterData/deleteTag':
            const updatedTags_ = state.tag.filter(tag => tag.type !== action.payload.type);
            let filter = {...state,
                tag:updatedTags_,
                buy:action.payload.buy,
                stock:action.payload.stock,
            }

            for(let i=0;i<updatedTags_.length;i++){
                if(updatedTags_[i].type=="minAmount"){
                    filter={
                        ...filter,
                        buy:PriceFilter({Min:updatedTags_[i].amount,Max:1000000000},filter.buy),
                        stock:PriceFilter({Min:updatedTags_[i].amount,Max:1000000000},filter.stock),
                    }
                }
                if(updatedTags_[i].type=="maxAmount"){
                    filter={
                        ...filter,
                        buy:PriceFilter({Min:0,Max:updatedTags_[i].amount},filter.buy),
                        stock:PriceFilter({Min:0,Max:updatedTags_[i].amount},filter.stock),
                    }
                }
                if(updatedTags_[i].type=="minArea"){
                    filter={
                        ...filter,
                        buy:AreaFilter({Min:updatedTags_[i].amount,Max:20000},filter.buy),
                        stock:AreaFilter({Min:updatedTags_[i].amount,Max:20000},filter.stock),
                    }
                }
                if(updatedTags_[i].type=="maxArea"){
                    filter={
                        ...filter,
                        buy:AreaFilter({Min:0,Max:updatedTags_[i].amount},filter.buy),
                        stock:AreaFilter({Min:0,Max:updatedTags_[i].amount},filter.stock),
                    }
                }
                if(updatedTags_[i].type=="location"){
                    filter={
                        ...filter,
                        buy:AreaFilter(updatedTags_[i].location,filter.buy),
                        stock:AreaFilter(updatedTags_[i].location,filter.stock),
                    }
                }
                if(updatedTags_[i].type=="plot_type"){
                    filter={
                        ...filter,
                        buy:CategoryFilter(updatedTags_[i].text,filter.buy),
                        stock:CategoryFilter(updatedTags_[i].text,filter.stock)
                    }
                }
            }
            return filter

        default:
            return state;
            break;
    }
}