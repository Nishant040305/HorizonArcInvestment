import React, { useState, useEffect } from 'react';
import './EditInfo.css';
import axios from 'axios';
import data from '../../../Constants/sorted_data.json';

let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB;

const Filter = (props) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${BACKWEB}/admin/lands/${searchTerm}`);
      props.setLandData(response.data.data);
      props.setType(response.data.type);
      
    } catch (error) {
      console.error("Error fetching land data", error);
    }
  };

  return (
    <div className="buyTabfilter" style={{ display: "flex", flexDirection: "row" }}>
      <input
        className="form-control mr-sm-2 search root"
        name="category"
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter Gata Number or ID or Location"
        aria-label="Search"
      />
      <button className="btn btn-outline-success submit-button" type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

const EditInfo = () => {
  const[type,setType] = useState(null);
  const [land, setLand] = useState(null);
  const [formData, setFormData] = useState({
    gataNumber: '',
    Area: { amount: 0, unit: 'sq.m' },
    State: '',
    District: '',
    Division: '',
    Village: '',
    Stocks:'',
    Images: [], // This will hold both file objects and URLs
    Price: [],
    Description: '',
    Highlights: [],
    Category: '',
    Property: 'LeaseHold',
    location: { latitude: 25.5507, longitude: 81.8416 }
  });
  const [highlightType, setHighlightType] = useState('');
  const [highlightText, setHighlightText] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [removedImages, setRemovedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]); // For previewing images locally

  useEffect(() => {
    if (land) {
      setFormData(land);
      setPreviewImages(land.Images || []); // Ensure land.Images is always an array
    }
  }, [land]);
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this data?")) {
      try {
        await axios.delete(`${BACKWEB}/admin/lands/${land._id}`);
        alert("Land data deleted successfully!");
        setLand(null); // Clear the form data after deletion
      } catch (error) {
        console.error("Error deleting land data", error);
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');

      setFormData((prevFormData) => ({
        ...prevFormData,
        [parentKey]: {
          ...prevFormData[parentKey],
          [childKey]: value
        }
      }));
    } else if(name==="Village"){
      setFormData({
        ...formData,
        [name]: value,
        location:{
          latitude:data[formData.State][formData.Division][formData.District][value].latitude,
          longitude:data[formData.State][formData.Division][formData.District][value].longitude
        }
      });
    }
    else if (name === "latitude" || name === "longitude") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          ...prevFormData.location,
          [name]: value
        }
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleAddHighlight = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      Highlights: [...prevFormData.Highlights, { type: highlightType, text: highlightText }]
    }));
    setHighlightType('Train');
    setHighlightText('');
  };

  const handleLocationChange = (e) => {
    console.log(formData);
    const {name,value} = e.target;
    if(value==""||value==undefined){
        return;
    }
    else if(value!="" &&value!=null&&value!=undefined&&name!="Village"){
        let variable = {
            ...location,
            [name]: value,
            ...(name === "State" && { Division: null, District: null, Village: null,location:{ latitude: null, longitude: null} }),
            ...(name === "Division" && { District: null, Village: null, location:{ latitude: null, longitude: null}  }),
            ...(name === "District" && { Village: null,location:{ latitude: null, longitude: null}  }),

        }
      
        setFormData({
            ...formData,
            ...variable
        })
    }
    else if(name=="Village"){
      console.log(data[formData.State][formData.Division][formData.District][value])
        let variable = {
            ...formData,
            [name]:value,
            location:{
                latitude: data[formData.State][formData.Division][formData.District][value].Latitude,
                longitude: data[formData.State][formData.Division][formData.District][value].Longitude
            }

        }
        setLand(((prev)=>(
           {
            ...prev,
            ...variable
           }

        )))
        
    }
    
};
useEffect(()=>{
  console.log(formData)
},[formData])
  const handleAddPrice = () => {
    if (newPrice) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Price: [...prevFormData.Price, newPrice],
      }));
      setNewPrice('');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const localImages = files.map(file => URL.createObjectURL(file)); // For previewing images locally

    setFormData((prevFormData) => ({
      ...prevFormData,
      Images: [...prevFormData.Images, ...files] // Store files for submission
    }));

    setPreviewImages((prevPreviewImages) => [
      ...prevPreviewImages,
      ...localImages
    ]); // Store preview URLs separately
  };

  const handleRemoveImage = (index) => {
    const removedImage = formData.Images[index];
    
    if (typeof removedImage === 'string') { 
      setRemovedImages([...removedImages, removedImage]); // Track removed URLs
    }
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      Images: prevFormData.Images.filter((_, i) => i !== index) // Remove image from formData
    }));

    setPreviewImages((prevPreviewImages) =>
      prevPreviewImages.filter((_, i) => i !== index)
    ); // Update preview images
  };

  const handleSubmit = async () => {
    try {
      // Filter out existing URLs from formData.Images, keeping only files for upload
      const newImages = formData.Images.filter(image => typeof image !== 'string');
      const uploadedImages = [];

      for (let image of newImages) {
        const formDataImage = new FormData();
        formDataImage.append('file', image);

        const response = await axios.post(`${BACKWEB}/admin/upload`, formDataImage);
        uploadedImages.push(response.data.url); // Assuming the response has the image URL in 'url' field
      }

      // Combine newly uploaded image URLs with existing URLs that were not removed
      const updatedImages = [
        ...formData.Images.filter(image => typeof image === 'string'), // Existing URLs
        ...uploadedImages // Newly uploaded URLs
      ];

      // Update formData with the new set of image URLs
      const updatedFormData = {
        ...formData,
        Images: updatedImages
      };

      // Submit the updated formData
      await axios.put(`${BACKWEB}/admin/lands/${land._id}`, {updatedFormData:updatedFormData,type:type});

      alert("Land data updated successfully!");
    } catch (error) {
      console.error("Error updating land data", error);
    }
  };

  return (
    <div>
      <Filter setLandData={setLand} setType={setType}/>

      {land && (
        <div className='flex_box p-10 bg-white m-10'>
          <div className="labels grid_secposition">
            <div className="labels">
              <h2 className="head2">UPLOAD PHOTOS</h2>
              <div className="file-uploading">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className='flex flex-col'>
                    {previewImages[index] && (
                      <button
                        className='btn btn-danger text-left w-20 ml-6'
                        onClick={() => handleRemoveImage(index)}
                      >
                        Remove
                      </button>
                    )}

                    <label className="file-upload-d">
                      <img
                        src={previewImages[index] || "/camera-icon-54.png"} // Use previewImages here
                        className={previewImages[index] ? "preview_image" : "w-10 h-8"}
                        alt="camera icon"
                      />
                      <input
                        className="file-upload"
                        type="file"
                        accept="image/jpg, image/jpeg, image/png"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div className='text-left'>
              <div className='heading_land_field'>Provide the GataNumber*</div>
              <input
                className="input_field"
                placeholder="Gata Number"
                required
                onChange={handleChange}
                value={formData.gataNumber}
                name='gataNumber'
              />
            </div>

            <div>
              <div className='heading_land_field'>Enter the location of the Area*</div>
              <div className='info_input_area'>
                <div>
                  <div>Enter the State*</div>
                  <select
                    className="input_field"
                    value={formData.State || ''}
                    onChange={handleLocationChange}
                    name='State'
                  >
                    <option value="">Select State</option>
                    {Object.keys(data || {}).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div>Enter the Division*</div>
                  <select
                    className="input_field"
                    value={formData.Division || ''}
                    onChange={handleLocationChange}
                    name='Division'
                  >
                    <option value="">Select Division</option>
                    {formData.State && Object.keys(data[formData.State] || {}).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <div>Enter the District*</div>
                  <select
                    className="input_field"
                    value={formData.District || ''}
                    onChange={handleLocationChange}
                    name='District'
                  >
                    <option value="">Select District</option>
                    {formData.Division && Object.keys(data[formData.State]?.[formData.Division] || {}).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
                <div>Enter the Village/City*</div>
                  <select
                    className="input_field"
                    value={formData.Village || ''}
                    onChange={handleLocationChange}
                    name='Village'
                  >
                    <option value="">Select village</option>
                    {formData.District && Object.keys(data[formData.State]?.[formData.Division]?.[formData.District] || {}).map(key => (
                      <option key={key} value={key}>{key}</option>
                    ))}
                  </select>
                </div>
              </div>

            <div className='info_input_area'>
              <div className="heading_land_field">Provide Latitude</div>
              <input
                className="input_field"
                placeholder="Latitude"
                required
                onChange={handleChange}
                value={formData.location.latitude}
                name='latitude'
              />
            </div>
            <div className='info_input_area'>
              <div className="heading_land_field">Provide Longitude</div>
              <input
                className="input_field"
                placeholder="Longitude"
                required
                onChange={handleChange}
                value={formData.location.longitude}
                name='longitude'
              />
            </div>
            <div className='info_input_area'>
              <div className='heading_land_field'>Provide Area and Unit*</div>
              <input
                className="input_field"
                placeholder="Amount"
                required
                onChange={handleChange}
                value={formData.Area.amount}
                name='Area.amount'
              />
              <select
                className="input_field"
                onChange={handleChange}
                value={formData.Area.unit}
                name='Area.unit'
              >
                <option value="sq.m">sq.m</option>
                <option value="acre">acre</option>
                <option value="sq.ft">sq.ft</option>
              </select>
            </div>
            <div className='info_input_area'>
              <div className='heading_land_field'>Provide Prices</div>
              <input
                className="input_field"
                placeholder="Add New Price"
                onChange={(e) => setNewPrice(e.target.value)}
                value={newPrice}
              />
              <button className="btn btn-primary" onClick={handleAddPrice}>
                Add Price
              </button>
              <div className='price-list'>
                {formData.Price.map((price, index) => (
                  <div key={index}>{price}</div>
                ))}
              </div>
            </div>

            <div className='info_input_area'>
              <div className="heading_land_field">Provide a Description*</div>
              <textarea
                className="input_field"
                placeholder="Description"
                required
                onChange={handleChange}
                value={formData.Description}
                name='Description'
              />
            </div>

            <div className='info_input_area'>
              <div className="heading_land_field">Add Highlights</div>
              <select
                className="input_field"
                value={highlightType}
                onChange={(e) => setHighlightType(e.target.value)}
              >
                <option value="">Select Highlight Type</option>
                <option value="Train">Train</option>
                <option value="Bus">Bus</option>
                <option value="Airport">Airport</option>
                <option value="Metro">Metro</option>
              </select>
              <input
                className="input_field"
                placeholder="Highlight Description"
                value={highlightText}
                onChange={(e) => setHighlightText(e.target.value)}
              />
              <button className="btn btn-primary" onClick={handleAddHighlight}>
                Add Highlight
              </button>
              <div className='highlight-list'>
                {formData.Highlights.map((highlight, index) => (
                  <div key={index}>
                    <strong>{highlight.type}: </strong>{highlight.text}
                  </div>
                ))}
              </div>
            </div>

            <div className='info_input_area'>
              <button className="btn btn-success" onClick={handleSubmit}>
                Update
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditInfo;
