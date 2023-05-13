// This is the category section in the birthday part ;
import React, { useEffect, useState } from "react";

import Gifts from "./BirthdayGiftsImages/gifts.svg";

import "./birthdayGifts.css";
import Carousel from "react-elastic-carousel";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import Skeleton from "@mui/material/Skeleton";

const Card = ({ img, text }) => {
  return (
    <>
      <div className="brthCatCard">
        <div className="brthCatCard_img">
          <img src={img} alt="cake img" />
        </div>
        <h2>{text}</h2>
      </div>
    </>
  );
};

const BirthdayCategory = () => {
  const breakPoints = [
    { width: 500, itemsToShow: 2 },
    { width: 600, itemsToShow: 2 },
    { width: 680, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1100, itemsToShow: 5 },
    { width: 1300, itemsToShow: 6 },
  ];

  const [data, setData] = useState([1, 2, 3, 4, 5, 6,7]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const api = endpoints.birthday.gitCategory;
    setLoading(true);
    axios
      .get(api)
      .then((res) => {
        if (res.data.success) {
          setLoading(false);
          const val = res.data.body;
          setData(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error wh");
      });
  },[]);

  return (
    <>
      <div className="birthdayCategory">
        <Carousel breakPoints={breakPoints}>
          {data.map((item, index) => {
            
            return (
              <>
                {loading ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Skeleton variant="circular" width={120} height={120} />
                      <Skeleton variant="text" width={150} height={40} />
                    </div>
                  </>
                ) : (
                  <Card img={item.image_path} text={item.name} key={index} />
                )}
              </>
            );
          })}
          <Card img={Gifts} text="new arriavals" />
        </Carousel>
      </div>
    </>
  );
};

// exporting the component ;
export default BirthdayCategory;
