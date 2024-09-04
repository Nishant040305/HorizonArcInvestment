import axios from "axios"

let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;
const data =async()=>{
    const response = await axios.get(`${BACKWEB}/articles`);
    if(response.status==200){
        return response.data.info;
    }
    else{
        return [];
    }
}
export const ArticleReducer=(state,action)=>{
    switch(action.type){
        case 'article/getArticle':
            const article = data();
            return article;
        default:
            return state;
    }
}