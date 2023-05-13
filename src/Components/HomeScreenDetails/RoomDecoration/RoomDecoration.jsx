import React, { useState, useEffect } from "react";

import "./Room.css";
import Star from "./RoomImages/star.svg";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import Skeleton from "@mui/material/Skeleton";

const Card = (props) => {
  console.log(props.rating);
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

const RoomDecoration = () => {
  const breakPoints = [
    { width: 400, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 1050, itemsToShow: 4 },
    { width: 1100, itemsToShow: 5 },
  ];

  const [data, setData] = useState([1,2,3,4,5,6]);

  useEffect(() => {
    const api = endpoints.home.roomDecoration;

    axios
      .get(api)
      .then((res) => {
        if (res.data.success) {
          const val = res.data.body;
          setData(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error which we are getting here");
      });
  }, []);

  return (
    <>
      <div className="roomDecoration">
        <div className="coupleOffers_heading">
          <h3>Balloon & Room Decoration</h3>
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
           
            {data.map((item, index) => {
              
              return (
                <>
                  <Card
                    img={item.image_id}
                    heading={item.title}
                    price={item.outlay_price}
                    rating={item.rating}
                    review={item.review}
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

// exporting the component ;
export default RoomDecoration;
