import axios from "axios"

let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

export const ArticleReducer=(state,action)=>{
    switch(action.type){
        case 'article/getArticle':
            return action.payload;
        default:
            return state;
    }
}