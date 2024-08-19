import React, { useState,useEffect } from 'react'
import './addbuydata.css';
import data from '../../../Constants/sorted_data.json';
import axios from "axios"

let BACKWEB = import.meta.env.VITE_REACT_APP_BACKWEB


const AddBuyData = () => {
    const[land,setLand] = useState({
        Area:{amount:null,unit:'sq.m'},
        gataNumber:null, 
        State:null,
        District:null,
        Division:null,
        Village:null,
        Images:[],
        Price:null,
        Description:null,
        Highlights:[],
        Category:"Residential/plot",
        Property:'LeaseHold',
        location:{
            latitude:25.5507,
            longitude:81.8416
        }
    })
    const handleChange=(e)=>{
        if([e.target.name]=="Area"){
            setLand({
                ...land,
                Area:{
                    ...land.Area,
                    amount:e.target.value,
                }
            })
        }
        else if(e.target.name=="unit"){
            setLand({
                ...land,
                Area:{
                    ...land.Area,
                    unit:e.target.value,
                }
            })
        }
        else if(e.target.name=="latitude" || e.target.name=="longitude"){
            setLand({
                ...land,
                location:{
                    ...land.location,
                    [e.target.name]:e.target.value,
                }
            })
            setLocation((prev)=>({
                ...prev,
                [e.target.name]:e.target.value
            }))

            
        }
        else{
            setLand({
                ...land,
                [e.target.name]:e.target.value,
            })
        }
       
    }
    const[location,setLocation] = useState({
        State:null,
        Division:null,
        District:null,
        Village:null,
        location:{
            latitude:null,
            longitude:null,
        }
        
    })
    const [highlightText, setHighlightText] = useState('');
    const [highlightType, setHighlightType] = useState('Train');
    const [highlights, setHighlights] = useState([]);

    const handleAddHighlight = () => {
        if (highlightText) {
            let variable = highlights;
            variable = [...highlights, { text: highlightText, type: highlightType }]
            setHighlights(variable);
            setHighlightText('');
            setLand({
                ...land,
                Highlights:variable,
            })
        }
    };
    const icons ={
        Hospital:"fas fa-ambulance",
        Airport:"fas fa-helicopter",
        Train:"fas fa-subway",
        Highway:"fa fa-road"
    }
    const handleLocation = (e) => {
        const {name,value} = e.target;
        if(value==""){
            return;
        }
        else if(value!="" &&value!=null&&value!=undefined&&name!="Village"){
            console.log("hey")
            let variable = {
                ...location,
                [name]: value,
                ...(name === "State" && { Division: null, District: null, Village: null,location:{ latitude: null, longitude: null} }),
                ...(name === "Division" && { District: null, Village: null, location:{ latitude: null, longitude: null}  }),
                ...(name === "District" && { Village: null,location:{ latitude: null, longitude: null}  }),

            }
          
            setLocation(variable);
            setLand({
                ...land,
                ...variable
            })
        }
        else if(name=="Village"){
            console.log("pp")
            let variable = {
                ...location,
                [name]:value,
                location:{
                    latitude: data[location.State][location.Division][location.District][value].Latitude,
                    longitude: data[location.State][location.Division][location.District][value].Longitude
                }

            }
            setLocation(variable)
            setLand(((prev)=>(
               {
                ...prev,
                ...variable
               }

            )))
            
        }
        
    };
    const [images, setImages] = useState({});
    const [errors, setErrors] = useState({});
    const Delete=(e)=>{
        let variable = {
            ...images,
            [e+1]:null,
        }
        setImages(variable);
        setLand({
            ...land,
            Images:variable,
        })
    }
        const handleImageChange = (e) => {
            const { name, files } = e.target;
            if (files && files[0]) {
                const file = files[0];
                const validImageTypes = ['image/jpg', 'image/jpeg', 'image/png'];
        
                if (!validImageTypes.includes(file.type)) {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        [name]: 'Invalid file type. Please upload an image (jpg or png).',
                    }));
                    return;
                }
        
                // Preview the image using FileReader
                const reader = new FileReader();
                reader.onload = () => {
                    const previewUrl = reader.result;
                    setImages((prevImages) => ({
                        ...prevImages,
                        [name]: { file, previewUrl }, // Store the file and the preview URL
                    }));
                };
                reader.readAsDataURL(file);
        
                // Clear any previous errors for this field
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    [name]: null,
                }));
            }
        };
        
        
    
    const handleSubmit = async () => {
        try {
            const updatedImages = {};
    
            // Loop through each image in the images state and upload it
            for (let key in images) {
                if(!images[key]){
                    continue;
                }
                const formData = new FormData();
                formData.append('file', images[key].file);
    
                const response = await fetch(`${BACKWEB}/admin/upload`, {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error(`Server error: ${response.statusText}`);
                }
    
                const data = await response.json();
                updatedImages[key] = data.url; // Store the URL in updatedImages
            }
    
            // Update land.Images with the uploaded URLs
            const updatedLand = {
                ...land,
                Images: {
                    ...land.Images,
                    ...updatedImages,
                },
            };
    
            // Submit the updated land object
            const response = await axios.post(`${BACKWEB}/admin/landUpload`, {
               updatedLand, 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('Success:', result);
            } else {
                throw new Error(`Submission error: ${response.statusText}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    useEffect(() => {
        console.log(location);
        console.log(land)
        console.log(images)
    }, [location,land,images]); // Logs location when it changes

  return (
    <div className="bg-blue-50 ">
        <h1 className='h1-heading'>Add Buy Data</h1>
    <div className='flex_box p-10 bg-white m-10'>
        <div className="labels grid_secposition" >
        <div className="labels">
            <h2 className="head2">UPLOAD PHOTOS</h2>
            <div className="file-uploading">
                {[...Array(5)].map((_, index) => (
                    <div className='flex flex-col'>
                    {images[index + 1]&&<button className='btn btn-danger text-left w-20 ml-6'onClick={()=>Delete(index)}>Remove</button>}

                    <label key={index} className="file-upload-d">
                    <img
                                    src={images[index + 1]?.previewUrl || "/camera-icon-54.png"}
                                    className={images[index + 1]?.previewUrl ? "preview_image" : "w-10 h-8"}
                                    alt="camera icon"
                                />
                        <input
                            className="file-upload"
                            type="file"
                            name={index + 1}
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={handleImageChange}
                            required={index === 0}
                        />
                        {errors[index + 1] && <p className="error">{errors[index + 1]}</p>}
                    </label>
                    </div>
                ))}
            </div>
        </div>
                </div> 
        <div className='flex flex-col'>

        <div className=' text-left' >
            <div className='heading_land_field'>Provide the GataNumber*</div>
            <input className="input_field" placeholder="gataNumber:" required="true"onChange={(e)=>handleChange(e)} name='gataNumber'></input>

        </div >
        <div>
        <div className='heading_land_field'>Enter the location of the Area*</div>
        <div className='info_input_area '>
            
            <div style={{gridRow:1, gridColumn:1}}>
            <div >Enter the State*</div>
            <select className="input_field" value={location.State || ''} onChange={(e) => handleLocation(e)} name='State'>
            <option value="">Select State</option>

                {Object.keys(data).map(key => (
                    <option key={key} value={key}>{key}</option>
                ))}
            </select>

            </div>
            <div style={{gridRow:1, gridColumn:0}}>
            <div >Enter the Division*</div>
            <select className="input_field" value={location.Division} onChange={(e)=>handleLocation(e)}  name='Division'>
            <option value="">Select Division</option>

            {location.State&&Object.keys(data[location.State]).map(key => (
            <option value={key}>{key}</option>))}
            </select>
            </div>
            <div style={{gridRow:0, gridColumn:1}}>
            <div>Enter the District*</div>
            <select className="input_field" value={location.District}  onChange={(e)=>handleLocation(e)}  name='District'>
            <option value="">Select District</option>

            {location.Division&&Object.keys(data[location.State][location.Division]).map(key => (
            <option value={key}>{key}</option>))}
            </select>
            </div>
            <div style={{gridRow:0, gridColumn:0}}>
            <div>Enter the Village/City*</div>
            <select className="input_field"  onChange={(e)=>handleLocation(e)}  name='Village'>\
            <option value="">Select Village/City</option>

            {location.District&&Object.keys(data[location.State][location.Division][location.District]).map(key => (
            <option value={key}>{key}</option>))}
            </select>            </div>
        </div>
        </div>
        <div className='heading_land_field'>Enter the GeoLocation*</div>
        <div className='info_input_area'>
        <div className="flex flex-row items-center"><div className='w-20'>Latitude:</div><input className="input_field" placeholder="Latitude:"onChange={(e)=>handleChange(e)} value={location.location.latitude||''} name="latitude"></input>        </div>
        <div className="flex flex-row items-center"><div className='w-20'>Longitude:</div><input className="input_field"placeholder="Longitude:"onChange={(e)=>handleChange(e)} value={location.location.longitude||''}  name="longitude"></input>
        </div></div> 
        <div className='heading_land_field'>Description*</div>
        <textarea className="input_field description" required='true' placeholder="Description:"onChange={(e)=>handleChange(e)}  name="Description"></textarea>
        <div className='heading_land_field'>Category*</div>
        <select className="input_field form-control from plotCategory" name="Category" onChange={(e)=>handleChange(e)} >
            <option value="Residential/plot">Residential/plot</option>
            <option value="Commercial/plot">Commercial/plot</option>

        </select>
        <div className='highlights-field'>
        <div className='heading_land_field '>Highlights</div>
        <div className="Highlights">
            <div className="highlight-form flex flex-row items-baseline">
            <select
                    value={highlightType}
                    className='input_field form-control from plotCategory unit'
                    onChange={(e) => setHighlightType(e.target.value)}
                >
                    <option value="Train">Railway Station</option>
                    <option value="Highway">Highway</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Airport">Airport</option>
                </select>
                <input
                    type="text"
                    className='input_field h-12'
                    value={highlightText}
                    onChange={(e) => setHighlightText(e.target.value)}
                    placeholder="Enter highlight"
                />
           
                <button onClick={handleAddHighlight} className='btn btn-success h-12'>Add Highlight</button>
            </div>
            <div className="highlight-list">
                {highlights.map((highlight, index) => (
                    <div className='flex flex-row   highlight '>
                    <div key={index} className={`highlight ${highlight.type} `}>
                    <i className={icons[highlight.type]}></i>
                    </div>
                    <div key={index} className={`highlight ${highlight.type} `}>
                        {highlight.text}
                    </div>
                    </div>
                ))}
            </div>
        </div>

        </div>
        <div className='flex flex-row items-end'>
        <div className=' text-left ' >
            <div className='heading_land_field '>Area*</div>
            <input className="input_field h-12" type="number" placeholder="Area:"onChange={(e)=>handleChange(e)}   name='Area'></input>
        </div >
        <select className="input_field form-control from plotCategory unit "onChange={(e)=>handleChange(e)} name="unit">
            <option value="sq.m">sq.m</option>
            <option value="hectare">Hectare</option>
            <option value="sq.ft">Sq. Feet</option>
        </select>
        </div>
        <div className=' text-left ' >
            <div className='heading_land_field '>Price*</div>
            <input className="input_field h-12" required="true" type="number"placeholder="Price:" onChange={(e)=>handleChange(e)}   name='Price'></input>
        </div >
      
        <button className='btn btn-success w-20 mt-10' onClick={()=>handleSubmit()}>Submit</button>

        </div>
        
        </div>
   </div>
  )
}

export default AddBuyData
