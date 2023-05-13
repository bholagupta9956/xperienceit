import React from "react";
import "./BestSellar3.css";
import DrinkCouple from "./BestSellerImages/candleLightDinner.png";
import PartyDecore from "./BestSellerImages/partyDecoration.png";
import BalloonDecore from "./BestSellerImages/balloon decoration.png";
const BestSellar3 = () => {
  return (
    <>

    
      <div className="container-fluid p-1 best-sellar-bg-color">
      <div className="best-sellar-container">
        <div className="row no-gutters">
          <div className="col-md-4 col-6">
            <a>
              <div className="home-page-tag-category-main-tag move-above-on-hover">
                <div className="best-sellar-boxes">
                  <img
                    src={DrinkCouple}
                    decoding="async"
                    data-nimg="fill"
                    class="img-cover-no-stretch material-shadow-card-4 bestsellarImg"
                  />
                   <div className="best-sellarPackage-name">
                    <h6>Candle Night Dinner</h6>
                </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-md-4 col-6">
          <a>
              <div className="home-page-tag-category-main-tag move-above-on-hover">
                <div className="best-sellar-boxes">
                  <img
                    src={PartyDecore}
                    decoding="async"
                    data-nimg="fill"
                    class="img-cover-no-stretch material-shadow-card-4 bestsellarImg"
                  />
                  <div className="best-sellarPackage-name">
                    <h6>Party Decorations</h6>
                </div>
                </div>
                
              </div>
            </a>

          </div>
          <div className="col-md-4 col-12">
          <a>
              <div className="home-page-tag-category-main-tag move-above-on-hover">
                <div className="best-sellar-boxes">
                  <img
                    src={BalloonDecore}
                    decoding="async"
                    data-nimg="fill"
                    class="img-cover-no-stretch material-shadow-card-4 bestsellarImg"
                  />
                   <div className="best-sellarPackage-name">
                    <h6>Balloon Decorations</h6>
                </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default BestSellar3;
