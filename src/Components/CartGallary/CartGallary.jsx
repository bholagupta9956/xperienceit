import React from "react";
import { Carousel } from 'react-responsive-carousel';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import "./CartGallary.css";


const CartGallary = (props) => {
  const { productGalary } = props;
  

  return (
   <>
 <div className="gallary">
        <Carousel
       
        slideImageFit="cover"
       
        >
          {productGalary.map((item, index) => {
            return (
              <div className="cartShow">
                <img alt="" src={item}  />
              </div>
            );
          })}

        </Carousel>
      </div>
   </>
  )
  
 


};

export default CartGallary;
