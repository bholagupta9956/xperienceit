// This is the component where we will create all the extra offers ;

import React, { useState } from "react";
import "./ExtraOffers.css";
import Carousel from "react-elastic-carousel";
import Star from "./ExtraOfferImages/star.svg";
// import axios from "axios";
import { useHistory , generatePath } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { FiHeart } from 'react-icons/fi';

const Card = (props) => {

  const pkgLocation = localStorage.getItem("locationDetails");
  const {title , titleId} = props;
 
  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;

  const history = useHistory();
  const renderToHomeData = (data) => {

    const sub_category_name = title.replace(' ' ,'_')
    const name = data.heading ;
    const packageName = name.replaceAll(' ', '_');
    const path  = generatePath("/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id" ,
    {
      sub_category_name : sub_category_name ,
      location : cityLocattion.name ,
      sub_category_id : titleId ,
      package_name : packageName ,
      package_id : data.id
    })

    history.push(path )
   
  };

  return (
    <>
      <div class="sellCard">
        <div class="card mb-4 sellingCard"  onClick={() => renderToHomeData(props)}>
        {/* <div className="heart"> <FiHeart/> </div> */}
          <div className="sells_img">
            {props.img ? (
              <img
                class="slcard-img-top"
                src={props.img}
                alt="movie img"
                height="270px"
              />
            ) : (
              <Skeleton height={270} variant="rectangular" />
            )}
          </div>
       
          <div className="bscard_info">
            <div className="scard_info_1">
              <h5>
                {props.heading ? props.heading : <Skeleton variant="text" />}
              </h5>
              <h6>
                {" "}
                {props.discountPrice ? (
                  `₹ ${props.discountPrice}`
                ) : (
                  <Skeleton variant="text" width={80} />
                )}
              </h6>
              <li>₹{props.price}</li>
              <span>{props.discount} % off</span>
            </div>

            <div className="scard_info_2">
              <div className="scard_info_box">
                <h6>{props.rating}</h6>
                <img src={Star} alt="star icon" width="15" height="20" />
              </div>
              <span>{/* {props.discount}  */}</span>
            </div>
          </div>

          <button
            className="card_info_btn"
            onClick={() => renderToHomeData(props)}
          >
            Book Now
          </button>
        </div>
      </div>
    </>
  );
};

const BestSellerCategory = (props) => {

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 768, itemsToShow: 2 },
    { width: 800, itemsToShow: 3 },
    { width: 1050, itemsToShow: 4 },
    { width: 1100, itemsToShow: 4 },
  ];

 
  const history = useHistory();

  const renderToPackagesDetails = (data) => {
    history.push(`/all_packages_details` , {homePackages : JSON.stringify(data)});
  };
  
  const { showListData } = props;
  console.log(showListData, "Show Listed Data Here...");
  return (
    <>
      {showListData.map((item, index) => {
        return (
          <div className="extraOffers">
            <div className="extraoffers_heading">
              <h3>
                Shop By{" "}
                <span style={{ color: "#1c1956", fontWeight: 600 }}>
                  {item.heading}
                </span>{" "}
                Categories
              </h3>
              <button
                className="bestSels"
                onClick={()=>renderToPackagesDetails(item)}
                style={{
                  backgroundImage:
                    " linear-gradient(to right, #1c1956 90%, #004e92  80%, #1c1956  90%)",
                }}
              >
                View all
              </button>
            </div>

            <div className="salse">
              <Carousel breakPoints={breakPoints}>
                {item.content ? (
                  item.content.map((itmm, idx) => {
                    return (
                      <>
                        <Card
                          img={itmm.image_id}
                          heading={itmm.title}
                          price={itmm.outlay_price}
                          discountPrice={itmm.discounted_price}
                          discount={itmm.discount_percnt}
                          key={index}
                          // review={item.review}
                          rating={itmm.rating}
                          id={itmm.id}
                          title={item.heading}
                          titleId={index}
                        />
                      </>
                    );
                  })
                ) : (
                  <h6>Sorry ! No package available</h6>
                )}
              </Carousel>
            </div>
          </div>
        );
      })}
    </>
  );
};

// exporting  the compnent ;
export default BestSellerCategory;
