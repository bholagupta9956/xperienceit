import React from "react";
import { useHistory, generatePath } from "react-router-dom";

import Star from "./star.svg";
import Skeleton from "@mui/material/Skeleton";
import "./SubCategory.css";

const SubCategoryCard = (props) => {
  const { subCatePackName, subCategory_id } = props;

  const history = useHistory();
  const pkgLocation = localStorage.getItem("locationDetails");

  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;

  const renderToProduct = (data) => {
    const name = data.heading;
    const packageName = name.replaceAll(" ", "-");
    const path = generatePath(
      "/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id",
      {
        sub_category_name: subCatePackName,
        location: cityLocattion.name,
        sub_category_id: subCategory_id,
        package_name: packageName,
        package_id: data.id,
      }
    );
    history.push(path);
  };

  return (
    <>
      <div className="subCategoryCard" onClick={() => renderToProduct(props)}>
        <div className="card_img">
          {props.img ? (
            <img
              class="card-img-top"
              src={props.img}
              alt="Card image cap"
              height="270"
            />
          ) : (
            <Skeleton height={270} variant="rectangular" />
          )}
        </div>
        <div className="subCategoryCard_box">
          <div className="subCategory_box_row1">
            <h6>{props.heading}</h6>
            <div className="subCategory_box_row1_star">
              <span>Rating</span>
              <img src={Star} alt="star icon" />
            </div>
          </div>
          <div className="subCategory_box_row2">
            <li className="pink_text">
              <span> ₹</span>
              <h5>{props.prices}</h5>
            </li>
            <li className="text2">
              {props.outlayprice && (
                <>
                  <span>₹</span>
                  <h6>{props.outlayprice}</h6>
                </>
              )}
            </li>
            <h6 className="text3">discount</h6>
          </div>
        </div>

        <button
          className="card_info_btn"
          onClick={() => renderToProduct(props)}
        >
          Book now
        </button>
      </div>
    </>
  );
};
const SubCategory = (props) => {
  const { subCatePack, subCatePackName, subCategory_id } = props;

  return (
    <>
      <div className="subCategoryTaskbar">
        <h6>
          <span
            style={{
              color: "var(--pink)",
              marginLeft: "40px",
              fontSize: "20px",
            }}
          >
            Home
          </span>{" "}
          {props.subCatePackName.replaceAll("-", " ")}
        </h6>

        {subCatePack.length != 0 ? (
          <div className="SubCategory_gifts">
            {subCatePack.map((item, index) => {
              return (
                <>
                  <SubCategoryCard
                    img={item.image_id}
                    heading={item.title}
                    prices={item.discounted_price}
                    outlayprice={item.outlay_price}
                    // discount={item.discount}
                    // rating={item.rating}
                    // review={item.review}
                    key={index.key}
                    id={item.id}
                    subCatePackName={subCatePackName}
                    subCategory_id={subCategory_id}
                  />
                </>
              );
            })}
          </div>
        ) : (
          <h5 style={{ marginLeft: "40px", color: "grey", marginTop: "20px" }}>
            Sorry no package available !
          </h5>
        )}
      </div>
    </>
  );
};

export default SubCategory;
