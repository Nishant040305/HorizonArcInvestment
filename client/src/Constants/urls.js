import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice(
    {
        name:"urls",
        initialState:{
            stock:"/stockTab",
            buy:'/buyTab',
            sell:"/sellTab",
            login:"/login",
            nav:"/nav",
            sideBar:"/sideBar",
            profile:"/profile",
            messages:"/messages",
            footer:"/footer",
            recomd:"/recommandation",
            filter:"stockFilter",
            buyComp:"/cartComponent",
            page:"/buyStockPage",
            profile:"/profilePage"
        },
        reducers:{

        }
    }
)

export default urlSlice.reducer;