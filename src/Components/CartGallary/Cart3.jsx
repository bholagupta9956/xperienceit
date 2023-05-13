import React from 'react'
import "./Cart2.css";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Cart3 = (props) => {
  const { productGalary } = props;
  
  return (
    <>
  <Carousel
      infiniteLoop
      preventMovementUntilSwipeScrollTolerance={true} swipeScrollTolerance={50}
      showArrows={true}
      renderIndicator={(onClickHandler, isSelected, index, label) => {
        const defStyle = { marginLeft: 20, color: "white", cursor: "pointer" };
        const style = isSelected
          ? { ...defStyle, color: "red" }
          : { ...defStyle };
      }}
    >
       {productGalary.map((item, index) => {
            return (
              <div className='CartCarousel'>
                <img alt="" src={item}  />
              </div>
            );
          })}
    
    </Carousel>
    </>
  )
}

export default Cart3;