import { UserFilter } from "../Lib/Filter";

import { useSelector } from "react-redux";

const A=()=>{
    const d = useSelector(state=>state.globalUsers);
    console.log('he',UserFilter('nish',d));

}

export default A;