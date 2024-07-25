import {createSlice} from '@reduxjs/toolkit';

import { NotificationReducer } from '../Reducer/NotificationReducer';

const NotificationSlice = createSlice({
    name:"notification",
    initialState:[],
    reducers:{
        setNotification:NotificationReducer,
        addNotification:NotificationReducer,
        removeNotification:NotificationReducer,
    }
})

export const {setNotification,addNotification,removeNotification}  = NotificationSlice.actions;
export default NotificationSlice.reducer;