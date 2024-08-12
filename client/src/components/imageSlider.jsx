import React, { useState } from "react";
import "./ImageSlider.css"; // Import your CSS file

const ImageSlider = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === props.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? props.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-block-image rounded-3xl buy-cart-img" style={{height:props.height,width:props.width}}>
         {console.log(props.height,props.width)}

      <div
        className="slider-image-blocks"
        style={{ backgroundImage: `url(${props.images[currentIndex]})` ,height:props.height,width:props.width}}
      ></div>
      <button className="left-arrow" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="right-arrow" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default ImageSlider;
