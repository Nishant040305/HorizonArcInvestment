import { createSlice } from "@reduxjs/toolkit";
import { setUser } from "../Reducer/UserAuthReducer";
const userSlice = createSlice({
    name:"user",
    initialState:{
        fullName:"Nishant Srivastava",
        panNumber:"ALRPS4679R",
        email:"nishant040305@gmail.com",
        mobile:"9651602279",
        image:"https://lh3.googleusercontent.com/a/ACg8ocLIiWPNraDN3nfZ7rpQjGFqdpcpwE9ugPxL5VmVupt9KL5Rgg5Y=s360-c-no"
    },
    reducers:{
        setUser:setUser
    }
})

export default userSlice.reducer;