// This is the gifts part ;

import React from "react";
import Gifts1 from "./BirthdayGiftsImages/xpit/gifts1.png"
import Gifts2 from "./BirthdayGiftsImages/xpit/gifts2.png"
import "./birthdayGifts.css"

const GiftsPart = () => {
  return <>
  <div className="brthbestSeller gfttCont">
        <div className="gifts" data-aos="flip-left" data-aos-duration="600">
            <img src={Gifts1} alt="" />
            <h3>GIFTS FOR HIM</h3>
        </div>
        <div className="gifts">
            <img src={Gifts2} alt="" data-aos="flip-left" data-aos-duration="600"/>
            <h3>GIFTS FOR HER</h3>
        </div>
    </div></>;
};

export default GiftsPart;
