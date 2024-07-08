export const setAllBuyData =(info)=>{
    return (dispatch)=>{
        dispatch(
            {
                type:"buyStockPage/setAllBuyData",
                payload:info
            }
        )
    }
}
export const setOneBuyData =(info)=>{
    return (dispatch)=>{
        dispatch(
            {
                type:"buyStockPage/setOneBuyData",
                payload:info
            }
        )
    }
}
export const delBuyData =(info)=>{
    return (dispatch)=>{
        dispatch(
            {
                type:"buyStockPage/delBuyData",
                payload:info
            }
        )
    }
}