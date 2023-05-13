import React from 'react'
import { NavLink } from 'react-router-dom';
import Star from "./star.svg";
import "./allPackages.css";



const AllPackagesCard = (props) => {
  
    return (
      <>


        <div className="allPackCard" data-aos="flip-left">
          <img src="" alt="anniversary img" />
          <div className="allPackCard_box">
            <div className="allPack_box_row1">
              <h6>heading</h6>
              <div className="allPack_box_row1_star">
                <span>rating</span>
                <img src={Star} alt="star icon" />
              </div>
            </div>
            <div className="allPack_box_row2">
              <li className="pink_text">
                <span> ₹</span>
                <h5>prices</h5>
              </li>
              <li className="text2">
                <span>₹</span>
                <h6>outlayprice</h6>
              </li>
              <h6 className="text3">discount</h6>
            </div>
          </div>
          <NavLink to="productScreen" style={{ textDecoration: "none" }}>
            <button className="card_info_btn">Book now</button>
          </NavLink>
        </div>
      </>
    );
  };

const AllPackages = (props) => {

    const{showAllChildCategory}=props;

    // const breakPoints = [
    //     { width: 500, itemsToShow: 1 },
    //     { width: 600, itemsToShow: 2 },
    //     { width: 1050, itemsToShow: 3 },
    //     { width: 1100, itemsToShow: 4 },
    //   ];
    
  return (
    <>
       <div className="allPackTaskbar">
        <h6>
          <span
            style={{
              color: "var(--pink)",
              marginLeft: "40px",
              fontSize: "20px",
            }}
          >
            Home /
          </span>{" "}
         
        </h6>

        <div className="allPack_gifts">
        {showAllChildCategory.map((item,index)=>{
            return(
              <>
                <AllPackagesCard
                  img={item.image_path}
                  heading={item.title}
                  prices={item.wholesale_price}
                  outlayprice={item.outlay_price}
                  discount={item.discount}
                  rating={item.rating}
                  review={item.review}
                  key={index.key}
                />
              </>
            )
            })}
        </div>
      </div>
    </>
  )
}

export default AllPackages;
