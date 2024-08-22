import React,{useState} from 'react'
import './profile.css';

import { useSelector,useDispatch } from 'react-redux';
const Profile=()=> {
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState({
    location: user.location || '',
    DOB: user.DOB || '',
    fullName: user.fullName || '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({
    location: '',
    fullName: '',
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const { location, fullName } = editForm;
    const newErrors = {};
    if (location.length > 50) {
      newErrors.location = 'Location must be less than 50 letters';
    }
    if (fullName.length < 3 || fullName.length > 30) {
      newErrors.fullName = 'Full Name must be between 3 and 30 letters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    
  const handleEditSubmit = () => {
    if (validateForm()) {
      dispatch(register({...user,...editForm})); // Dispatch action to update user
      setIsEditing(false); // Exit editing mode
    }
  };

  return (
    <div className='profile-page p-10'>
      <div className='profile-page-content'>
      <img className='rounded-circle w-48 h-48 mb-9 ml-20' src={user.image}></img>
      <div className='profile-page-data'>
        <div className='profile-page-head'>Username:</div><div className='profile-page-info'>{user.Username}</div>
      </div>
      <div className='profile-page-data'>
        <div className='profile-page-head'>Email:</div><div className='profile-page-info'>{user.email}</div>
      </div>
      {isEditing ? (
            <>
            <div className='profile-page-data'>
              <div className='profile-page-head'>Name:</div>
              <input
                className='profile-input profile-page-info'
                name="fullName"
                value={editForm.fullName}
                onChange={handleInputChange}
                placeholder='Enter your full name'
              />
              {errors.fullName && <div className='error'>{errors.fullName}</div>}
            </div>
            <div className='profile-page-data'>
              <div className='profile-page-head'>Location:</div>
              <input
                className='profile-input profile-page-info'
                name="location"
                value={editForm.location}
                onChange={handleInputChange}
                placeholder='Enter your location'
              />
              {errors.location && <div className='error'>{errors.location}</div>}
            </div>
            <div className='profile-page-data'>
              <div className='profile-page-head '>DOB:</div>
              <input
                className='profile-input profile-page-info'
                type='date'
                name="DOB"
                value={editForm.DOB}
                onChange={handleInputChange}
              />
            </div>
            <button className='bg-slate-900 text-white profile-edit' onClick={handleEditSubmit}>Save</button>
            <button className='bg-red-600 text-white profile-edit' onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ):<><div className='profile-page-data'>
            <div className='profile-page-head'>Name:</div><div className='profile-page-info'>{user.fullName}</div>
          </div>
          <div className='profile-page-data'>
          <div className='profile-page-head'>Location:</div><div className='profile-page-info'>{user.location}</div>
        </div>
        <div className='profile-page-data'>
        <div className='profile-page-head'>Date of Birth:</div><div className='profile-page-info'>{user.DOB}</div>
      </div>
      <button className='bg-slate-900 text-white profile-edit' onClick={() => setIsEditing(true)}>Edit</button>
      </>}
     
      </div>
    </div>
  )
}

export default Profile;

