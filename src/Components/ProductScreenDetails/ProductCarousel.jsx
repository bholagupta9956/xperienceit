// IN this component we will build the carousel for the productScreen ;
import React, { useRef } from "react";
import "./product.css";
import Carousel from "react-elastic-carousel";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import { BsArrowRightCircleFill } from "react-icons/bs";
import HomePageImg from "../../assets/images/HomePageimg1.png";
import Skeleton from "@mui/material/Skeleton";


const ProductCarousel = (props) => {

  const { productBanner } = props;

  const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  return (
    <>
      <div className="package-details-banner">
        <OwlCarousel className="owl-theme" {...options}  >
          {productBanner.length != 0 ? (
            productBanner.map((item, index) => {
              return (
                <div class="item">
                  <div className="package-col">
                    <div className=" resultbner">
                      <img src={item} alt="" />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div class="item">
                <div className="media-img">
                  <Skeleton height={350} variant="rectangular" />
                </div>
              </div>
          )}
        </OwlCarousel>
      </div>
    </>
  );
};

export default ProductCarousel;
