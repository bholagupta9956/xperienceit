import React from "react";
import { AiOutlineStar, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { generatePath, useHistory } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import { callWishListData, updateWishList } from "../../actions";
import NoPackages from "../../assets/images/noPackages.png";
import { useState } from "react";

const SubCategoryCard = (props) => {

  const { subCatePackName, subCategory_id } = props;
  const dispatch = useDispatch();

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
               {props.discount && props.discount !=0? ( <span>{props.discount}% Off </span>):("")}
              </h5>
              <div className="rating">
               {props.rating && props.rating !=0? ( <span>{props.rating}</span>):("")}
                <AiOutlineStar />
              </div>
            </div>

            <div className="price-and-btn">
              <h4>
                <span>₹</span>
                {props.prices}

                <s>{props.outlayprice && `₹ ${props.outlayprice}`}</s>
              </h4>
              <button className="btn" onClick={() => renderToProduct(props)}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SubCategory2 = (props) => {

  const { subCatePack, subCatePackName, subCategory_id, loading } = props;
  const [item , setItem] = useState([1,2,3,4])

console.log(subCatePack,"subCatePackkjhflsdhgl")

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
                    /<span>{props.subCatePackName.replaceAll("-", " ")}</span>
                  </h2>
                </div>
              </div>
            </div>
            {subCatePack.length != 0 && (
              <div className="row comman-card">
                {subCatePack.map((item, index) => {
                  return (
                    <>
                      <SubCategoryCard
                        img={item.image_id}
                        heading={item.title}
                        prices={item.discounted_price}
                        outlayprice={item.outlay_price}
                         discount={item.discount_percnt}
                        rating={item.rating}
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

            {!loading && subCatePack.length == 0 && (
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

export default SubCategory2;
