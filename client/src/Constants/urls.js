import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice(
    {
        name:"urls",
        initialState:{
            stock:"/",
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
            page:"/buyStockPage/:id/:tab",
            profile:"/profilePage",
            dashboard:"/dashboard",
        },
        reducers:{

        }
    }
)

export default urlSlice.reducer;