
import React from "react";
import {generatePath, useHistory} from "react-router-dom";
import Star from "./star.svg";
import "./CommanViewPackeges.css";
import Skeleton from "@mui/material/Skeleton";


const DinnerCard = (props) => {

  const {sub_category_id ,sub_category_name} = props ;

  const history=useHistory();
  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;

  const renderToCommanPackage=(data)=>{
    
    const name = data.heading ;
    const packageName = name.replaceAll(' ', '_');
    const path  = generatePath("/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id" ,
    {
      sub_category_name : sub_category_name ,
      location : cityLocattion.name ,
      sub_category_id : sub_category_id ,
      package_name : packageName ,
      package_id : data.id
    })

    history.push(path , );
  }

  return (
    <>
      <div className="dinnerCard" data-aos="flip-left" onClick={() => renderToCommanPackage(props)}>
      <div className="dcard_img">
          {props.img ? <img src={props.img} alt="movie img" height="250" /> : <Skeleton height={250} variant="rectangular"/>}
          
        </div>
        <div className="dinnerCard_box">
          <div className="dinner_box_row1">
            <h6>{props.heading}</h6>
            <div className="dinner_box_row1_star">
              <span>{props.rating}</span>
              <img src={Star} alt="star icon" />
            </div>
          </div>
          <div className="dinner_box_row2">
            <li className="pink_text">
              <span> ₹</span>
              <h5>{props.prices}</h5>
            </li>
            <li className="text2">
              <span>₹</span>
              <h6>{props.outlayprice && `₹ ${props.outlayprice}`}</h6>
            </li>
            <h6 className="text3">{props.discount}</h6>
          </div>
        </div>
        
          <button className="card_info_btn" onClick={() => renderToCommanPackage(props)}>Book now</button>
       
      </div>
    </>
  );
};


const CommanViewPages = (props) => {
  const { showPackeges, packageName , sub_category_id , sub_category_name } = props;

  return (
    <>
      <div className="dinnerTaskbar">
        <h6>
          <span
            style={{
              color: "var(--pink)",
              marginLeft: "40px",
              fontSize: "20px",
            }}
          >
            Home /
          </span>{" "}
          {packageName}
        </h6>

      {showPackeges.length !== 0 ? 
        <div className="dinner_gifts">
          {showPackeges.map((item, index) => {
            return (
              <>
                <DinnerCard 
                  img={item.image_id}
                  heading={item.title}
                  prices={item.discounted_price}
                  outlayprice={item.outlay_price}
                  discount={item.discount}
                  rating={item.rating}
                  review={item.review}
                  key={index.key}
                  id={item.id}
                  sub_category_id={sub_category_id}
                  sub_category_name={sub_category_name}
                />
              </>
            );
          })}
        </div> : <h5 style={{marginLeft : "40px" ,color : "grey" ,marginTop : "20px"}}>Sorry no package available !</h5>}
      </div>
    </>
  );
};

export default CommanViewPages;
