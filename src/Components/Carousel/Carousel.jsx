import React from "react";
import Slider from "react-slick";
import { Carousel } from "react-bootstrap";
import '../Carousel/Carousel.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function VacCarousel() {
  // const settings = {
  //   className: "",
  //   dots: true,
  //   infinite: true,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   adaptiveHeight: true,
  //   autoplay: true,
  //   speed: 500,
  // };

  return (
    // <div className="slider-container">
    //   <Slider {...settings}>
    //     <div>
          
    //       <img
    //         src="public/shopping.jpg"
    //         alt="Shopping"
    //         height={"700px"}
    //         width={"100%"}
    //         style={{ objectFit: "cover", objectPosition: "center" }}
    //       />
    //       <div
    //         className="overlay-text"
    //         style={{
    //           width:'20%',
    //           position: "absolute",
    //           top: "50%",
    //           left: "50%",
    //           transform: "translate(-50%, -50%)",
    //           color: "white",
    //           backgroundColor: "rgba(0, 0, 0, 0.3)",
    //           padding: "20px",
              
    //           textAlign: "center",
    //           fontFamily:'copperplate'
    //         }}
    //       >
    //         <h2>Welcome to VAC Fashion</h2>
    //         <p>Shop your favorite styles now!</p>
    //       </div>
    //     </div>
    //     <div>
    //       <img
    //         src="public/Couple_Shopping.jpg"
    //         alt="Shopping"
    //         height={"700px"}
    //         width={"100%"}
    //         style={{ objectFit: "cover", objectPosition: "bottom" }}
    //       />
          
    //     </div>
    //   </Slider>
    // </div>






    <Carousel className="mt-5">
      {/* Slide 1 */}
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="shopping.jpg"
          alt="Men"
          height={"700px"}
          width={"100%"}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <div className="carousel-overlay " style={{fontFamily:'copperplate'}}>
          <h2>Welcome to VAC FASHION</h2>
          <p>Explore the latest styles.</p>
          <button className="btn btn-light">Shop Now</button>
        </div>
      </Carousel.Item>

      {/* Slide 2 */}
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="Couple_Shopping.jpg"
          alt="Women"
          height={"700px"}
            width={"100%"}
            style={{ objectFit: "cover", objectPosition: "bottom" }}
        />
        <div className="carousel-overlay " style={{fontFamily:'copperplate'}}>
          <h2>Shop for the perfect outfit</h2>
          <p>Fresh arrivals for every season.</p>
          <button className="btn btn-light">Lets Go</button>
        </div>
      </Carousel.Item>

      {/* Slide 3 */}
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="banner1.jpg"
          alt="Women"
          height={"700px"}
            width={"100%"}
            style={{ objectFit: "cover", objectPosition: "bottom" }}
        />
        <div className="carousel-overlay" style={{fontFamily:'copperplate'}}>
          <h2>time to shop</h2>
          <p>no time to waste</p>
          <button className="btn btn-light">time to party</button>
        </div>
      </Carousel.Item>

      {/* Slide 4 */}
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="banner2.jpg"
          alt="Women"
          height={"700px"}
            width={"100%"}
            style={{ objectFit: "cover", objectPosition: "bottom" }}
        />
        <div className="carousel-overlay " style={{fontFamily:'copperplate'}}>
          <h2>shop for the best</h2>
          <p>fashion at its best.</p>
          <button className="btn btn-light">collect your items</button>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default VacCarousel;
