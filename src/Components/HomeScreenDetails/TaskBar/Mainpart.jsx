// In this tutorial we will just add a image which will cover the upper screen ;

import React from "react";
import "./Taskbar.css";
import RightArrow from "./TaskBarImages/rightarrow.svg";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { endpoints } from "../../../services/endpoints";
import { useState } from "react";
import Carousel from "react-elastic-carousel";
import Skeleton from "@mui/material/Skeleton";
import XperienceSelect from "../XperienceSelect/XperienceSelect";


const MainPart = ({updateLocation}) => {

  const dispatch = useDispatch();

  const [bannerImg, setBannerImg] = useState([1, 2, 3]);
  const [loading, setLoading] = useState(false);
  const [showXperienceSelect , setShowXperienceSelect] = useState(false);


  const getBanner = () => {
    const bannerUrl = endpoints.home.banner;
    const headers = {
      Accept: "application/json",
    };
    setLoading(true);
    axios
      .get(bannerUrl, { headers: headers })
      .then((res) => {
       
        if (res.data.status===true) {
          setLoading(false);
          const val = res.data.body;
          setBannerImg(val);
        } else if (res.data.status===false) {
        }
      })
      .catch((err) => {
        console.log(
          err,
          "this is the error which we  are getting here by default"
        );
      });
  };

  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 600, itemsToShow: 1 },
    { width: 1050, itemsToShow: 1 },
    { width: 1100, itemsToShow: 1 },
  ];

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      <div className="main main-banner">
        <div className="main_right">
          <Carousel breakPoints={breakPoints}>
            {bannerImg.map((item, index) => {
              
              return (
                <>
                  {loading ? (
                    <Skeleton variant="rectangular" height={350}/>
                  ) : (
                    <img src={item.bg_images} alt="mainimg" key={index} />
                  )}
                </>
              );
            })}
          </Carousel>

          {/* <div className="main_right_box"></div> */}
        </div>

        <div className="main_bottom_bar">
          <div className="main_bottom_bar_1">
            <h5>Search your</h5>
            <h3>Xperiences</h3>
          </div>
          <div
            className="main_bottom_bar_2"
            onClick={() => setShowXperienceSelect(true)}
          >
            <h4>
              Occasion
              <br /> <span>Anniversary</span>
            </h4>
            <img src={RightArrow} alt="arrow icon" />
          </div>
          <div className="main_bottom_bar_3" style={{ background: "#1c1956" }}>
            <h5>Find Surprises</h5>
          </div>
        </div>

        {/* here we are giving Xperience Select */}
          <XperienceSelect showXperienceSelect={showXperienceSelect} setShowXperienceSelect={setShowXperienceSelect} updateLocation={updateLocation}/>
      </div>
    </>
  );
};

export default MainPart;
