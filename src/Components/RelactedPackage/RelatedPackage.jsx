// This is the component of the related package which i will show on the final screen;

import React, { useEffect, useState } from "react";
import "./relatedPackage.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useHistory, generatePath } from "react-router-dom";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import { toast, ToastContainer } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineStar, AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { callWishListData, updateWishList } from "../../actions";
import { useParams } from "react-router-dom";

// card to be shown ;

const Card = (props) => {
  const dispatch = useDispatch();
  const pkgLocation = localStorage.getItem("locationDetails");
  const location = useLocation();
  const { title, titleId, subCategoryName, subCategoryId } = props;

  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;

  const history = useHistory();
  const renderToHomeData = (data) => {
    const sub_category_name = subCategoryName.replaceAll(" ", "-");
    const name = data.heading;
    const packageName = name.replaceAll(" ", "-");
    const path = generatePath(
      "/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id",
      {
        sub_category_name: sub_category_name,
        location: cityLocattion.name,
        sub_category_id: subCategoryId,
        package_name: packageName,
        package_id: data.id,
      }
    );

    history.push(path);
    window.location.reload();
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
                {props.discount && props.discount != 0 ? (
                  <span>{props.discount}% off</span>
                ) : (
                  ""
                )}
              </h5>

              <div className="rating">
                {props.rating && props.rating != 0 ? (
                  <span>{props.rating}</span>
                ) : (
                  ""
                )}
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
                <s>{props.price !== 0 && `₹${props.price}`}</s>
              </h4>
              <button className="btn" onClick={() => renderToHomeData(props)}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const RelatedPackage = (props) => {
  const { sub_category_name, sub_category_id, package_name, package_id } =
    useParams();

  const [allPackage, setAllPackage] = useState([]);

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
        // margin: 10,
      },
      400: {
        items: 1,
        // margin: 10,
      },
      600: {
        items: 1.7,
      },
      700: {
        items: 2,
      },
      800:{
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
        items: 4,
      },
      1440: {
        items: 4,
      },
    },
  };

  const getAllRelatedPackage = () => {
    const url = `${endpoints.home.packageBySubCategory}${sub_category_id}`;

    axios
      .get(url)
      .then((res) => {
        if (res.data.status) {
          const val = res.data.body;
          setAllPackage(val);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  useEffect(() => {
    getAllRelatedPackage();
  }, []);

  return (
    <>
      {allPackage.length != 0 && (
        <div className="all-pack-slider relatedPkgCont">
          <div className="package-section-slider common-container">
            <div className="container-fluid">
              <div className="title-with-button">
                <div className="row">
                  <div className="title-col">
                    <h2 className="shopbyRelatedPackagesbookingscren">
                      Shop By <span> Related Package</span>
                    </h2>
                    <div className="more-btn"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                {allPackage.length < 5 ? (
                  allPackage.map((itmm, idx) => {
                    return (
                      <>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                          <Card
                            data={itmm}
                            img={itmm.image_id}
                            heading={itmm.title}
                            price={itmm.outlay_price}
                            discountPrice={itmm.discounted_price}
                            discount={itmm.discount_percnt}
                            rating={itmm.rating}
                            id={itmm.id}
                            key={idx}
                            subCategoryName={itmm.subcat_name}
                            subCategoryId={itmm.subcat_id}
                          />
                        </div>
                      </>
                    );
                  })
                ) : (
                  <OwlCarousel
                    className="owl-theme category"
                    id="category"
                    items={3}
                    loop
                    margin={10}
                    dots={false}
                    {...options}
                    nav
                  >
                    {allPackage.map((itmm, idx) => {
                      return (
                        <>
                          <Card
                            data={itmm}
                            img={itmm.image_id}
                            heading={itmm.title}
                            price={itmm.outlay_price}
                            discountPrice={itmm.discounted_price}
                            discount={itmm.discount_percnt}
                            rating={itmm.rating}
                            id={itmm.id}
                            key={idx}
                            subCategoryName={itmm.subcat_name}
                            subCategoryId={itmm.subcat_id}
                          />
                        </>
                      );
                    })}
                  </OwlCarousel>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedPackage;
