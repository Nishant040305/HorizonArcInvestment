export const userSetInfo =(info)=>{
    return (dispatch)=>{
        dispatch({
            type:"user/register",
            payload:info
        })
    }
}

export const userSetImage =(url)=>{
    return (dispatch)=>{
        dispatch({
            type:"user/setImage",
            payload:url
        })
    }
}