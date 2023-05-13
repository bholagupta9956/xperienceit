// This is the component where we will create all the extra offers ;

import React, { useEffect, useState } from "react";
import "./CoupleOffers.css";
import TeddyChoco from "./ExtraOfferImages/teddyChoco.svg";
import Flowers from "./ExtraOfferImages/flowers.svg";
import LabChoco from "./ExtraOfferImages/lap&choco.svg";
import Carousel from "react-elastic-carousel";
import Star from "./ExtraOfferImages/star.svg";
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import Skeleton from "@mui/material/Skeleton";


const Card = (props) => {
  return (
    <>
      <div className="card" data-aos="flip-left" data-aos-duration="600">
        <div className="card_img">
          {props.img ? <img src={props.img} alt="movie img" /> : <Skeleton height={250} variant="rectangular"/>}
          
        </div>
        <div className="card_info">
          <div className="card_info_1">
            <h5>{props.heading ? props.heading : <Skeleton variant="text"/>}</h5>
            <h6> {props.price ? `₹ ${props.price}` : <Skeleton  variant="text" width={80}/>}</h6>
            <span>Get It Today</span>
          </div>

          <div className="card_info_2">
          
            <div className="card_info_box">
              <h6>{props.rating}</h6>
              <img src={Star} alt="star icon" width="15px" />
            </div>
            <span>{props.review} Reviews</span>
          </div>
        </div>
      </div>
    </>
  );
};

const GiftsCategory = () => {

  const apiUrl = endpoints.home.gift;
  const [giftItem, setGiftItem] = useState([1,2,3,4,5,6]);


  const getGiftList = () => {

    const headers = {
      Accept: "application/json",
    };

    axios
      .get(apiUrl, { headers: headers })
      .then((res) => {
        console.log(res,"gift response")
        if (res.data.success) {
          const val = res.data.body;
          setGiftItem(val);
        } else if (!res.data.success) {
        }
      })
      .catch((err) => {
        console.log(err, "error banner");
        
      });
  };
  useEffect(() => {
    getGiftList();
  }, []);

  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 1050, itemsToShow: 4 },
    { width: 1100, itemsToShow: 5 },
  ];

  
  return (
    <>
      <div className="coupleOffers">
        <div className="coupleOffers_heading">
          <h3>Gifts</h3>
          <button
            style={{
              backgroundImage:
                " linear-gradient(to right, #1c1956 90%, #004e92  80%, #1c1956  90%)",
            }}
          >
            View all
          </button>
        </div>

        <div className="seller1">
          <Carousel breakPoints={breakPoints}>
           

            {giftItem.map((item, index) => {
           
              return (
                <>
                    <Card
                      img={item.image_path}
                      heading={item.name}
                      price={item.price}
                      review={item.review}
                      status={item.status}
                      rating={item.rating}
                      key={index}
                    />
                 
                </>
              );
            })}
          </Carousel>
        </div>
      </div>
    </>
  );
};

// exporting  the compnent ;
export default GiftsCategory;
