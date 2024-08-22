import React,{useState} from 'react'
import './profile.css';
import { register } from '../../../Store/UserAuthSlice';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios";
const Profile=()=> {
  const user = useSelector(state=>state.user);
  const dispatch = useDispatch();
  let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB
  const [editForm, setEditForm] = useState({
    location: user.location || '',
    DOB: user.dob || '',
    fullName: user.fullName || '',
  });
  const [errorsI,setErrorI] = useState(null)
  const [imageToUpload,setImage] = useState({image:user.image})
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
    
  const handleEditSubmit = async () => {
    if (validateForm()) {
        try {
            let image = user.image;

            // Check if a new image is selected and differs from the current image
            if (imageToUpload && imageToUpload.image !== user.image) {
                const formData = new FormData();
                formData.append('file', imageToUpload.file); // Correctly append the file

                // Upload the image
                const responseImage = await fetch(`${BACKWEB}/admin/upload`, {
                    method: 'POST',
                    body: formData,
                });

                if (responseImage.ok) {
                    const responseData = await responseImage.json();
                    image = responseData.url; // Get the image URL from the response
                } else {
                    throw new Error('Image upload failed');
                }
            }

            // Update user profile
            const response = await axios.post(`${BACKWEB}/changeProfile`, {
                _id: user._id,
                fullName:editForm.fullName,
                location:editForm.location,
                dob:editForm.DOB,
                image: image,
            });

            if (response.status === 200) {
                dispatch(register({ ...user, ...editForm,dob:editForm.DOB, image: image })); // Dispatch action to update user
                setIsEditing(false); // Exit editing mode
                alert("Profile Updated")
            } else {
                throw new Error('Profile update failed');
            }

        } catch (err) {
            console.error(err);
            alert('There was an error updating your details');
        }
    }
};

const handleImageChange = (e) => {
  const file = e.target.files[0]; // Access the first file from the file input

  if (file) {
      const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];

      // Check if the file type is valid
      if (!validImageTypes.includes(file.type)) {
          setErrorI('Invalid file type. Please upload an image (jpg or png).');
          return;
      }

      // Check if the file size is within the limit (1MB)
      const maxSizeInBytes = 200 * 1024; // 1MB in bytes
      if (file.size > maxSizeInBytes) {
          setErrorI('File size exceeds 200KB. Please upload a smaller image.');
          return;
      }

      // Preview the image using FileReader
      const reader = new FileReader();
      reader.onload = () => {
          const previewUrl = reader.result;
          setImage({ file: file, image: previewUrl });
      };
      reader.readAsDataURL(file);

      // Clear any previous errors for this field
      setErrorI(null);
  }
};

  return (
    <div className='profile-page p-10'>
      <div className='profile-page-content'>
      {!isEditing?<img className='rounded-circle w-48 h-48 mb-9 ml-20' src={user.image}></img>:
      <label className="file-upload-d relative">
      <div className="image-container relative">
        <img
          src={imageToUpload.image}
          className="rounded-circle w-48 h-48 mb-9 ml-20"
          alt="current image"
        />
        <div className="overlay absolute inset-0 flex justify-center items-center bg-slate-900 bg-opacity-50 rounded-circle w-48 h-48 mb-9 ml-20">
          <img
            src="camera-icon-54.png"
            alt="Upload Icon"
            className="w-12 h-12 opacity-50"
          />
        </div>
      </div>
      <input
        className="file-upload"
        type="file"
        name="image"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleImageChange}
      />
      {errorsI && <p className="error">{errorsI}</p>}
    </label>
    }
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
        <div className='profile-page-head'>Date of Birth:</div><div className='profile-page-info'>{user.dob}</div>
      </div>
      <button className='bg-slate-900 text-white profile-edit' onClick={() => setIsEditing(true)}>Edit</button>
      </>}
     
      </div>
    </div>
  )
}

export default Profile;

