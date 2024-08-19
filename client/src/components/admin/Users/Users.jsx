import React,{useState} from 'react'
import { UserFilter } from '../../../Lib/Filter';
import { useSelector } from 'react-redux';
import './Users.css';

const FindPeopleBlock =(props)=>{
    return(
        <div className='FindPeopleBlock' >
          <div className='Findpeople-name'>
          <img className="rounded-full w-10 h-10 " src={props.image}></img> 
          <div className='text-black'>{props.name}</div>
          </div> 

        </div>
    )
}
const Users = () => {
  const globalUser = useSelector(state=>state.globalUsers);
  const[filter,setFilter] = useState('');
  const userFiltered = UserFilter(filter,globalUser.global);
  const handleChange=(e)=>{
    setFilter(e.target.value)
  }
  return (
    <div className='admin-users'>
      <div>
      <input className='bg-white text-gray-800 admin-users-search' value={filter} onChange={(e)=>handleChange(e)} placeholder='Enter  UserName'></input>
      <button className='bg-green-600 text-white'>Find</button>
      </div>
      
      <div className='user-list'>
        {userFiltered.length?userFiltered.map((info,index)=>(
          <FindPeopleBlock name={info.Username} image={info.image}></FindPeopleBlock> 
        )):<div className='flex flex-row justify-center'><img className='findpeople-no-image' src="5639817.webp"></img></div>}
      </div>
    </div>
  )
}

export default Users;
