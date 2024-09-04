import { createSlice } from "@reduxjs/toolkit";
import { ArticleReducer } from "../Reducer/ArticleReducer";
    const ArticleSlice = createSlice({
    name:"article",
    initialState:[],
    reducers:{
        getArticle:ArticleReducer,
    }
})
export const {getArticle} = ArticleSlice.actions;
export default ArticleSlice.reducer;