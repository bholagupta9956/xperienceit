// This is the birthday best category ;
import React, { useEffect, useState } from "react";

import Carousel from "react-elastic-carousel";
import Star from "./BirthdayGiftsImages/star.svg";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import "./BirthdayBestSellar.css";

const Card = (props) => {
  return (
    <>
      <div
        className="card birthdayCard mt-5"
        data-aos="flip-left"
        data-aos-duration="600"
      >
        <div className="card_img">
          {props.img ? (
            <img src={props.img} alt="movie img" height="350" />
          ) : (
            <Skeleton height={350} variant="rectangular" />
          )}
        </div>
        <div className="card_info">
          <div className="card_info_1">
            <h5>
              {props.heading ? props.heading : <Skeleton variant="text" />}
            </h5>
            <h6>
              {" "}
              {props.price ? (
                `₹ ${props.price}`
              ) : (
                <Skeleton variant="text" width={80} />
              )}
            </h6>
            <span>Get It Today</span>
          </div>

          <div className="card_info_2">
            <div className="card_info_box">
              <h6>{props.rating}</h6>
              <img src={Star} alt="star icon" width="15px" />
            </div>
            <span>{props.review} </span>
          </div>
        </div>
      </div>
    </>
  );
};

const BirthdayBestSeller = () => {
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 1050, itemsToShow: 3 },
    { width: 1100, itemsToShow: 4 },
  ];

  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const api = endpoints.birthday.bestSeller;

    axios
      .get(api)
      .then((res) => {
        console.log(res, "best seller response");
        if (res.data.status === true) {
          const val = res.data.body;
          setData(val);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="brthbestSeller">
        <div className="coupleOffers_heading">
          <h3>Shop By Bestseller Categories</h3>
          <button>View all</button>
        </div>

        <div className="seller1">
          <Carousel breakPoints={breakPoints}>
            {data.map((item, index) => {
              console.log(item, "item here");
              return (
                <>
                  <Card
                    img={item.image_path}
                    heading={item.name}
                    price={item.price}
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
export default BirthdayBestSeller;
