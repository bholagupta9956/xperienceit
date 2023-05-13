// This is the component where we are  create best seller part of the project ;

import React from "react";
import "./BestSeller.css";
import DrinkCouple from "./BestSellerImages/drinkCouple.svg"

import Ballonhat from "./BestSellerImages/balloon&hat.svg"
import BallonGirl from "./BestSellerImages/balloon_girl.png"

const BestSeller = () =>{

    
    return (<>
        <div className="bestseller">
            <div className="bestseller_heading">
                <h4>Our Best Seller</h4>
            </div>
            <div className="bestseller_container">
                <div className="bestseller_box1">
                    <img src={DrinkCouple} alt="" />
                    <button>Cangle light dinner</button>
                </div>
                <div className="bestseller_box2">
                    <div className="bestseller_box2_box">
                        <div>
                        <h3>PARTY</h3>
                        <h5>decoration</h5>
                        </div>
                    </div>
                    <img src={BallonGirl} alt="balloon with girl" />
                </div>
                <div className="bestseller_box3">
                    <img src={Ballonhat} alt="ballon hat" />
                    <button>Balloon decorations</button>
                </div>
            </div>
          
        </div>
    </>)
}

// exporting the part ;
export default BestSeller ;