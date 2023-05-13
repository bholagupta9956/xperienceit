// This is the component where we are  create best seller part of the project ;

import React, { useEffect } from "react";
import "./BestSeller2.css";
import DrinkCouple from "./BestSellerImages/candlelightdinnerwebsiteimg.svg"
import Ballonhat from "./BestSellerImages/ballondecorations.svg"
import BallonGirl from "./BestSellerImages/partydecoration.svg";
import { generatePath , useHistory } from "react-router-dom";


const BestSeller2 = () =>{

    const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const cityID = cityLocattion && cityLocattion.id;
  const history = useHistory();


    const getCandleLightDinner = () =>{
        const path = generatePath(
            "/experiences/:location/subCategory/:subCategory_name/:subCategory_id",
            {
              subCategory_name: "Candlelight-Dinner",
              location: cityLocattion.name,
              subCategory_id: 40,
            }
          );
      
          history.push(path);
    }

    const getBallonDecoration = () =>{
        const path = generatePath(
            "/experiences/:location/subCategory/:subCategory_name/:subCategory_id",
            {
              subCategory_name: "Balloon-Decoration",
              location: cityLocattion.name,
              subCategory_id: 72,
            }
          );
      
          history.push(path);
    }


    const partyDecoration = () =>{
        const path = generatePath(
            "/experiences/:location/subCategory/:subCategory_name/:subCategory_id",
            {
              subCategory_name: "birthday-theme-decoration",
              location: cityLocattion.name,
              subCategory_id: 90,
            }
          );
      
          history.push(path);
    }
    
    return (<>
        <div className="Offer-slider">
            <div className="offer-section-slider common-container ">
                <div className="container-fluid ourbestSeller">
                    <h4 className="ourBestSellar">Our Best Seller</h4>
               
                <div className="bestseller_container_area">
                    <div className="row">
                        <div className="col-lg-3 col-md-6" onClick={getCandleLightDinner}>
                            <div className="seller_box1">
                                <img src={DrinkCouple} alt="" />
                                <button>Candle light dinner</button>
                            </div>
                        </div>
                        <div className="col-lg-5 offset-lg-1 col-md-6" onClick={partyDecoration}>
                            <div className="seller_box2">
                                <img src={BallonGirl} alt="balloon with girl" />
                                <div className="content_aria">
                                    <div>
                                    <h3>PARTY</h3>
                                    <h5>decoration</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-12" onClick={getBallonDecoration}>
                            <div className="seller_box3">
                                <img src={Ballonhat} alt="ballon hat" />
                                <button>Balloon decorations</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>)
}

// exporting the part ;
export default BestSeller2;