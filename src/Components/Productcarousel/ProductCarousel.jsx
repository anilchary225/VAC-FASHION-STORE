import React from "react";
import Slider from "react-slick";


function Fade({images}) {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };
  return (
    <div className="slider-container" style={{width:'80%'}}>
      <Slider {...settings}>
      {images&&images.length>0&&images.map(img=>{
                return <div className=" d-flex justify-content-center align-items-center">
                    <img src={img} alt='' height={'600px'}/>
                </div>
            })}
      </Slider>
    </div>
  );
}

export default Fade;
