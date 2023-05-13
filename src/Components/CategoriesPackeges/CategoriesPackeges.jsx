import React, { useState, useEffect } from "react";
import Star from "./star.svg";
import "./CategoriesPackeges.css";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useHistory, generatePath } from "react-router-dom";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import { callWishListData, updateWishList } from "../../actions";
import { AiOutlineStar, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import axios from "axios";
import NoPackages from "../../assets/images/noPackages.png";


const CategoryCard = (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const pkgLocation = localStorage.getItem("locationDetails");

  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;

  const { categoryName, category_id } = props;

  //  checking favourite package ;
  const wishtListArray = useSelector(
    (state) => state.handleWishtListData.wishListArray
  );

  const handleFavourite = (data, isFav) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      const wishListUrl = endpoints.wishlist.updateWishList;
      const filterWishList = wishtListArray.filter((itm, indx) => {
        return itm.id !== data.id;
      });

      const selectedWishList = wishtListArray.filter((itm, ind) => {
        return itm.id == data.id;
      });

      console.log(data, "data here");

      const daata = {
        id: data.id,
        is_fav: isFav,
        image: data.img,
        price: data.price,
        title: data?.heading,
      };

      const wishLidta = [...filterWishList, daata];

      dispatch(updateWishList(wishLidta));

      const val = {
        package_id: data.id,
        model_type: "package",
        is_fav: isFav,
        user_type: data.is_supplierId || 1,
      };

      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      axios
        .post(wishListUrl, val, { headers: headers })
        .then((res) => {
          console.log(res, "add wishlist response");
          if (res.data.status) {
            dispatch(callWishListData());
          }
        })
        .catch((err) => {
          console.log(err, "this is the error ");
        });
    } else {
      toast("Please Login !", { type: "warning" });
    }
  };

  const checkWishList = wishtListArray.filter((itm, index) => {
    return itm.id === props.id;
  });

  const isFavourite = checkWishList[0];

  const renderToProduct = (data) => {

    const name = data.title;
    const subCatName = data.subcat_name;
    const subCategoryName = subCatName.replaceAll(" ", "-");
    const packageName = name.replaceAll(" ", "-");
    const path = generatePath(
      "/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id",
      {
        sub_category_name: subCategoryName,
        location: cityLocattion.name,
        sub_category_id: data.subcat_id,
        package_name: packageName,
        package_id: data.id,
      }
    );

    history.push(path);
  };
  return (
    <>
      <div class="col-lg-3 col-md-6 col-12">
        <div className="package-col">
          <div className="media-img coman-img">
            {props.img ? (
              <img src={props.img} />
            ) : (
              <Skeleton height={250} variant="rectangular" />
            )}
            <div className="wishlist">
              <span>
                {isFavourite?.is_fav == "true" ? (
                  <AiTwotoneHeart
                    onClick={() => handleFavourite(props, "false")}
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => handleFavourite(props, "true")}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="details">
            <h3>{props.heading}</h3>
            <div className="rating-and-discount">
              <h5>
                <span>{props.discount}% off</span>
              </h5>
              <div className="rating">
                <span>{props.rating}</span>
                <AiOutlineStar />
              </div>
            </div>

            <div className="price-and-btn">
              <h4>
                <span>₹</span>
                {props.prices}

                <s>{props.outlayprice && `₹ ${props.outlayprice}`}</s>
              </h4>
              <button
                className="btn"
                onClick={() => renderToProduct(props.data)}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CategoriesPackeges = (props) => {

  const { showCategoryPack, categoryName, category_id, loading } = props;
  const [item, setItem] = useState([1, 2, 3, 4]);

  return (
    <>
      <div className="all-pack-slider inner-row-package">
        <div className="package-section-slider common-container">
          <div className="container-fluid">
            <div className="title-with-button">
              <div className="row">
                <div className="title-col">
                  <h2>
                    <span
                      style={{
                        color: "var(--pink)",
                      }}
                    >
                      Home
                    </span>
                    /<span> {categoryName.replaceAll("-", " ")}</span>
                  </h2>
                </div>
              </div>
            </div>
            {showCategoryPack.length != 0 && (
              <div className="row comman-card">
                {showCategoryPack.map((item, index) => {
                  console.log(item);
                  return (
                    <>
                      <CategoryCard
                        img={item.image_id}
                        heading={item.title}
                        prices={item.discounted_price}
                        outlayprice={item.outlay_price}
                        discount={item.discount_percnt}
                        rating={item.rating}
                        review={item.review}
                        key={index.key}
                        id={item.id}
                        data={item}
                        category_id={category_id}
                      />
                    </>
                  );
                })}
              </div>
            )}

            {loading && (
              <div class="row comman-card">
                {item.map((itm, ind) => {
                  return (
                    <>
                      <div className="col-lg-3 col-md-3 col-12 mb-3">
                        <Skeleton height={300} variant="rectangular" />
                      </div>
                    </>
                  );
                })}
              </div>
            )}

            {!loading && showCategoryPack.length == 0 && (
              <>
                <div style={{ width: "100%" }} className="my-2">
                  <img src={NoPackages} alt="" style={{ width: "100%" }} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPackeges;
