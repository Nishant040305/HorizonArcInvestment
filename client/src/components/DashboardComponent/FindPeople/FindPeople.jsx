import React from 'react'
import { useSelector } from 'react-redux'
import './FindPeople.css';
const FindPeopleBlock =(props)=>{
    return(
        <div className='FindPeopleBlock'>
          <div className='Findpeople-name'>
          <img className="rounded-full w-10 h-10 mr-10 ml-3" src={props.image}></img> 
          <div className=''>{props.name}</div>
          </div>
            
            <div><button className='bg-green-400 text-white'>Friend</button></div>

        </div>
    )
}


const FindPeople = () => {
    const user = useSelector(state=>state.user)
  return (
    <div className='Findpeople'>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock><FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>
      <FindPeopleBlock name={user.fullName} image={user.image}></FindPeopleBlock>

    </div>
  )
}

export default FindPeople
