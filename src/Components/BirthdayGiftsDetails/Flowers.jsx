// This is the flowers part ;
import React from "react";
import Flower1 from "./BirthdayGiftsImages/xpit/flower1.png";
import Flower2 from "./BirthdayGiftsImages/xpit/flower2.png";
import Flower3 from "./BirthdayGiftsImages/xpit/flower3.png";
import Plants from "./BirthdayGiftsImages/xpit/plants.png";

const Flowers = () => {
  return (
    <div className="brthbestSeller">
      <div className="coupleOffers_heading">
        <h3 style={{ fontSize: "32px", marginBottom: "20px" }}>
          All Fresh Flowers
        </h3>
      </div>
      <div className="flowersCont">
        <div
          className="flowers flowers1"
          data-aos="flip-left"
          data-aos-duration="600"
        >
          <img src={Flower1} alt="" />
          <div className="flowers1Text" data-aos="flip-bottom">
            <h3>ROSES</h3>
            <h4>Perfect For Conveying Love & Care</h4>
          </div>
        </div>
        <div className="flowers flowers2" data-aos="flip-left">
          <img src={Flower2} alt="" />
          <div className="flowers2text" data-aos="flip-bottom">
            <h3>ALL FLOWERS</h3>
            <h4>Explore Beautiful Flowers</h4>
          </div>
        </div>
        <div className="flowers flowers3" data-aos="flip-left">
          <img src={Flower3} alt="" />
          <div className="flowers3text" data-aos="flip-bottom">
            <h3>ALL FLOWERS</h3>
            <h4>Explore Beautiful Flowers</h4>
          </div>
        </div>
      </div>
      <div className="plants">
        <img src={Plants} alt="" />
      </div>
    </div>
  );
};

export default Flowers;
