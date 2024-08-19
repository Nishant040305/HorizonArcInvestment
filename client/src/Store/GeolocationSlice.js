import { createSlice } from "@reduxjs/toolkit";
import {setLocationReducer } from "../Reducer/GeolocationReducer";
const GeolocationSlice = createSlice({
    name:"geoLocation",
    initialState:{latitude:25.5507,longitude:81.8416},
    reducers:{
        setLocation:setLocationReducer,
    }
})

export const {setLocation} = GeolocationSlice.actions;

export default GeolocationSlice.reducer;