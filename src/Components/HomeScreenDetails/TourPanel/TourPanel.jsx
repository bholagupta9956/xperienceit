// In this component we will create the  tour panel ;
import React, { useEffect } from "react";
import "./TourPanel.css";
import Carousel from "react-elastic-carousel";

import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import { useState } from "react";
import Skeleton from "@mui/material/Skeleton";

const Card = (props) => {
  return (
    <>
      <div className="card_tour" data-aos="fade-up" data-aos-duration="600">
        {props.img ? <img src={props.img} alt="first tour" /> : <Skeleton variant="rectangular" height={400}/>}
        
        <div
          className="card_tour_info"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <h3>{props.text1 ? props.text1 : <Skeleton variant="text" width={100}/>}</h3>
          <h2>{props.text2 ? props.text2 : <Skeleton variant="text" width={160}/> }</h2>
        </div>
      </div>
    </>
  );
};

const TourPanel = () => {
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 700, itemsToShow: 2 },
    { width: 1050, itemsToShow: 3 },
    { width: 1100, itemsToShow: 4 },
  ];

  const [data, setData] = useState([1,2,3,4,5,6]);

  useEffect(() => {
    const api = endpoints.home.tour;
    axios
      .get(api)
      .then((res) => {
        // console.log(res, "this is the response ");
        if (res.data.status===true) {
          const val = res.data.body;
          setData(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error ");
      });
  }, []);

  return (
    <>
      <div className="tourPanel mt-2">
        <div className="tourPanel_heading">
          <h3>
            Our <span style={{ color: "#1c1956" }}>Xperience</span> Tour
          </h3>
          <button
            style={{
              backgroundImage:
                " linear-gradient(to right, #1c1956 90%, #004e92  80%, #1c1956  90%)",
            }}
          >
            View all
          </button>
        </div>
        <div className="tourPanel_container">
          <Carousel
            breakPoints={breakPoints}
            autoPlaySpeed={1000}
            enableAutoPlay={true}
          >
            {data.map((item, index) => {
              return (
                <>
                  <Card
                    img={item.image_path}
                    text1={item.name}
                    text2={item.title}
                   
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
export default TourPanel;
