import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice(
    {
        name:"urls",
        initialState:{
            stock:"/",
            buy:'/buyTab',
            sell:"/sellTab",
            messages:"/messages",
            recomd:"/recommandation",
            page:"/buyStockPage/:id/:tab",
            profile:"/profilePage",
            dashboard:"/dashboard",
            admin:'/adminPortal',
        },
        reducers:{

        }
    }
)

export default urlSlice.reducer;