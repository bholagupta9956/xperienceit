import React from "react";
import "./guidesCard.css";
import BannerImg from "../../../assets/images/chrismtmas.png";

const GuidesCard = () => {
  return (
    <div className="row my-4">
      <div className="col-4">
        <img src={BannerImg} alt="" style={{ width: "100%", height: "100%" }} />
      </div>
      <div className="col-7 pl-1">
        <h6
          style={{ fontSize: "14px", lineHeight: "20px", wordSpacing: "4px" }}
        >
          ChristmasSpecials: Christmas Office Decoration Ideas That No One Will
          Tell You
        </h6>
        <span className="text-secondary " style={{ fontSize: "13px" }}>
          December 19, 2022
        </span>
      </div>
    </div>
  );
};

export default GuidesCard;
