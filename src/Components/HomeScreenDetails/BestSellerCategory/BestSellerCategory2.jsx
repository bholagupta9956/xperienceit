import React, { useState } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { AiOutlineStar, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { useHistory, generatePath } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import { callWishListData, updateWishList } from "../../../actions";
import NoPackages from "../../../assets/images/noPackages.png";
import "./BestSellarCategory2.css";
const Card = (props) => {
  const dispatch = useDispatch();

  const pkgLocation = localStorage.getItem("locationDetails");
  const { title, titleId } = props;

  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;

  const history = useHistory();
  const renderToHomeData = (data) => {
    const sub_category_name = title.replaceAll(" ", "-");
    const name = data.heading;
    const packageName = name.replaceAll(" ", "-");
    const path = generatePath(
      "/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id",
      {
        sub_category_name: sub_category_name,
        location: cityLocattion.name,
        sub_category_id: titleId,
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
      <div class="item">
        <div className="package-col">
          <div className="media-img">
            <img src={props.img} alt="" />
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
            <h3>
              {props.heading ? props.heading : <Skeleton variant="text" />}
            </h3>
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
                <span></span>
                {props.discountPrice ? (
                  ` ₹${props.discountPrice}`
                ) : (
                  <Skeleton variant="text" width={80} />
                )}{" "}
                <s>₹{props.price}</s>
              </h4>
              <button className="btn-catgory-book" onClick={() => renderToHomeData(props)}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const BestSellerCategory2 = (props) => {

  const history = useHistory();
  const [item, setItem] = useState([1, 2, 3, 4]);

  const renderToPackagesDetails = (data) => {
    history.push(`/all_packages_details`, {
      homePackages: JSON.stringify(data),
    });
  };

  const { showListData, loading } = props;
  const options = {
    margin: 20,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
        margin: 10,
      },
      400: {
        items: 1,
        margin: 10,
      },
      600: {
        items: 1.5,
      },
      700: {
        items: 2,
      },
      768: {
        items: 2,
      },
      800:{
        items: 2,
      },
      820:{
        items: 2.5,
      },
      1000: {
        items: 4.5,
      },
      1024:{
        items: 3,
      },
      1100: {
        items: 4.2,
      },
      1280: {
        items: 3.2,
      },
      1300: {
        items: 4.5,
      },
      1366: {
        items: 4.2,
      },
      1440: {
        items: 4.2,
      },
    },
  };

  return (
    <>
      {!loading &&
        showListData.map((item, index) => {
         
          return (
            <div className="all-pack-slider">
              <div className="package-section-slider common-container">
                <div className="container-fluid">
                  {item.content && item?.content?.length != 0 && (
                    <>
                      <div className="title-with-button">
                        <div className="row">
                          <div className="title-col">
                            <h2>
                              Shop By <span> {item.heading}</span>
                            </h2>
                            <div className="more-btn">
                              <button
                                className="btn more-btn"
                                onClick={() => renderToPackagesDetails(item)}
                              >
                                View All <BsArrowRightCircleFill />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <OwlCarousel
                        className="owl-theme category"
                        id="category"
                        items={5}
                        loop
                        margin={10}
                        dots={false}
                        {...options}
                        nav
                      >
                        {item.content.map((itmm, idx) => {
                          return (
                            <>
                              <Card
                                img={itmm.image_id}
                                heading={itmm.title}
                                price={itmm.outlay_price}
                                discountPrice={itmm.discounted_price}
                                discount={itmm.discount_percnt}
                                key={index}
                                // review={item.review}
                                rating={itmm.rating}
                                id={itmm.id}
                                title={itmm.subcat_name}
                                titleId={itmm.subcat_id}
                              />
                            </>
                          );
                        })}
                      </OwlCarousel>
                    </>
                  )}

                  {!item.content && (
                    <div style={{ width: "100%" }} className="my-2">
                      <img src={NoPackages} alt="" style={{ width: "100%" }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

      {loading && (
        <div className="all-pack-slider">
          <div className="package-section-slider common-container">
            <div className="container-fluid row">
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
          </div>
        </div>
      )}
    </>
  );
};

export default BestSellerCategory2;
