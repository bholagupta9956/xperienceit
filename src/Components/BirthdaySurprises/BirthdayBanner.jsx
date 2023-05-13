// In this file we will just add the banner of the birthday with the carousel ;

import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Banner from "./BirthdayImages/banner2.png";
import "../../fonts/NuevaStd-Bold.otf";
import "./Birthday.css";

const BirthdayBanner = () => {
  return (
    <>
      <div className="banner">
        <Carousel
          autoPlay={true}
          infiniteLoop={true}
          showArrows={false}
          showThumbs={false}
          transitionTime={500}
          interval={3000}
          showStatus={false}
        >
          <div className= "banner-img">
            <img src={Banner} alt="banner img" />
            <div className="banner_text" data-aos="fade-right">
                <h2>Birthday surprises</h2>
                <h3>For your love ones</h3>
                <button>book now</button>
            </div>
          </div>
          <div className= "banner-img">
            <img src={Banner} alt="banner img" />
            <div className="banner_text" data-aos="fade-right">
                <h2>Birthday surprises</h2>
                <h3>For your love ones</h3>
                <button>book now</button>
            </div>
          </div>
          <div className= "banner-img">
            <img src={Banner} alt="banner img" />
            <div className="banner_text" data-aos="fade-right">
                <h2>Birthday surprises</h2>
                <h3>For your love ones</h3>
                <button>book now</button>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

// exporting the component ;
export default BirthdayBanner;
