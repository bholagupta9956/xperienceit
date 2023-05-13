import React from "react";
import "./postingCard.css";
import CardImg from "../../../assets/images/blogsimg.png";
import { GiPlainSquare } from "react-icons/gi";
import HtmlParser from "react-html-parser";

const PostingCard = (props) => {

  const {data , getBlogDetails} = props ;

  return (
    <>
      <div className="row postingCrdCont" onClick={() => getBlogDetails(data)}>
        <img src={data.image_id ? data.image_id : CardImg} alt="" className="mb-2" />
        <div className="col-12 d-flex align-items-center">
          <h6 className="text-secondary pr-2 fs-6 text-uppercase">{data.user_person}</h6>
          <h6 className="text-secondary pr-2 fs-6">
            <GiPlainSquare size={6} />
          </h6>
          <h6 className="text-secondary pr-2 fs-6 text-uppercase">{data.date}</h6>
          <h6 className="text-secondary pr-2 fs-6">
            <GiPlainSquare size={6} />
          </h6>
          <h6 className="text-secondary pr-2 fs-6 text-uppercase">LEAVE A COMMENT</h6>
        </div>
        <h3 className="fw-bold my-2 " style={{ width: "80%" }}>
          {data.title}
        </h3>
        <p className="text-secondary my-1 pstCardPara" style={{fontSize : "14px" }}>
          {HtmlParser(data.content)}
        </p>

        <button className="blogBtn ">Read More</button>
        
      </div>
     
    </>
  );
};

export default PostingCard;
