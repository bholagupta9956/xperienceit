import React, { useEffect, useState } from "react";
import "./Banner.css";
import Carousel from "react-elastic-carousel";

import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import Skeleton from "@mui/material/Skeleton";
// import Star from "./star.svg";
import { generatePath, useHistory } from "react-router-dom";


const Card = (props) => {

  const { data } = props;
  const history = useHistory();

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const cityID = cityLocattion && cityLocattion.id;

  const renderToOffer = (data) => {
    
    const name = data.offer_name ;
    const offerName = name.replaceAll(' ', '_')
   
    const offerId = data.id;

    const path = generatePath("/experiences/offer/:location/:offerName/:offerId" , {
        location : cityLocattion.id ,
        offerName : offerName ,
        offerId : offerId
    });

     history.push(path);
  };

  return (
    <>
   
          <div
            class="card border-dark offerCard"
            onClick={() => renderToOffer(data)}
          >
           {props.img ? (
            <div className="bannercard_img">
           
                <img
                  class="bcard-img-top"
                  src={props.img}
                  alt="Card  cap"
                  
                />
           
            </div>
            ) : null
         
      }
              
          </div>
       
                
     
    </>
  );
};

const Banner = () => {
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 600, itemsToShow: 1 },
    { width: 1050, itemsToShow: 2 },
    { width: 1100, itemsToShow: 2 },
  ];

  const [data, setData] = useState([1, 2]);

  useEffect(() => {
    const api = endpoints.home.bannerOffers;

    axios
      .get(api)
      .then((res) => {
        // console.log(res, "banner response here");
        if (res.data.status === true) {
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
   
      <div className="banners">
        <Carousel breakPoints={breakPoints}>
       
          {data.map((item, index) => {
            return (
              <>
           
                <Card
                  img={item.image_id}
                  heading={item.offer_name}
                  price={item.amount}
                  discount={item.discount_type}
                  key={index}
                  data={item}
                />
             
              </>
            );
          })}
        
        </Carousel>
      </div>
    
    </>
  );
};

export default Banner;
