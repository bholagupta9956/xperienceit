import React from "react";
import Star from "./star.svg";
import "./OfferPage.css";
import Skeleton from "@mui/material/Skeleton";
import { useHistory ,generatePath } from "react-router-dom";


const OfferCard = (props) => {

  const {offerName , offerId} = props ;
  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;
  const history = useHistory();


  const renderToOffer = (data) => {
   
    const name = data.heading ;
    const packageName = name.replaceAll(' ', '_');
    const path  = generatePath("/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id" ,
    {
      sub_category_name : offerName ,
      location : cityLocattion.name ,
      sub_category_id : offerId ,
      package_name : packageName ,
      package_id : data.id
    })

    history.push(path);
    
  };

  return (
    <div className="offerCards">
    <div className="offer_img">
      {props.img ? (
        <img
          class="card-img-top"
          src={props.img}
          alt="Card image cap"
          height="260"
        />
      ) : (
        <Skeleton height={260} variant="rectangular"  />
      )}
      </div>
      <div className="offerCards_box">
        <div className="offerCards_box_row1">
          <h6>{props.heading}</h6>
          {/* <div className="offerCards_box_row1_star">
            <span>Rating</span>
            <img src={Star} alt=" star icon " />
          </div> */}
        </div>
        <div className="offerCards_box_row2">
          <li className="pink_text">
            <span></span>
            <h5>₹ {props.discount}</h5>
          </li>
          <li className="text2">
            {/* <span>₹</span>
            <h6>outlayprice</h6> */}
          </li>
          <h6 className="text3">₹{props.prices}</h6>
        </div>
      </div>

      <button className="card_info_btn" onClick={() => renderToOffer(props)}>
        Book now
      </button>
    </div>
  );
};

const OfferPage = (props) => {

  const { offers, offerName , offerId} = props;

  return (
    <>
      <div className="offerTaskbar">
        <h6>
          <span
            style={{
              color: "var(--pink)",
              marginLeft: "40px",
              fontSize: "20px",
            }}
          >
            {offerName}
          </span>
        </h6>

        {offers.length != 0 ? 
        <div className="offer_gifts">
          {offers.map((item, index) => {
           
            return (
              <>
                <OfferCard
                  img={item.image_id}
                  heading={item.title}
                  prices={item.outlay_price}
                  // outlayprice={item.outlay_price}
                  discount={item.discounted_price}
                  // rating={item.rating}
                  // review={item.review}
                  key={index.key}
                  id={item.id}
                  offerName={offerName}
                  offerId={offerId}
                  data={item}
                />
              </>
            );
          })}
        </div> : <h5 style={{marginLeft : "40px" ,color : "grey" ,marginTop : "20px"}}>Sorry no offers available !</h5>}
      </div>
    </>
  );
};
export default OfferPage;
