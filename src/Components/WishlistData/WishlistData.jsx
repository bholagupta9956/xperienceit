import React, { useState } from "react";
import "./wishlistdata.css";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import { callWishListData, updateWishList } from "../../actions";
import { toast, ToastContainer } from "react-toastify";
import { endpoints } from "../../services/endpoints";
import "../../Components/HomeScreenDetails/Booking/Booking2.css";
import { useHistory, generatePath } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Loader from "../../utils/Loader";
import Favourite from "../../assets/images/favourite.png";

const AllPackagesCard = (props) => {
  const { wishtListArray } = props;

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;
  const history = useHistory();
  const { setLoading, loading } = props;

  const renderToAllPackagesDetails = (data) => {
    console.log(data, "Ddd");
    const sub_category_name = data.subcategoryName.replace(" ", "_");
    const name = data.heading;
    const packageName = data.heading.replaceAll(" ", "_");
    const path = generatePath(
      "/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id",
      {
        sub_category_name: sub_category_name,
        location: cityLocattion.name,
        sub_category_id: data.subcategoryId,
        package_name: packageName,
        package_id: data.id,
      }
    );
    history.push(path);
  };

  const dispatch = useDispatch();

  const handleFavourite = (data, isFav) => {
    const access_token = localStorage.getItem("access_token");
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
      image: selectedWishList[0]?.image,
      price: selectedWishList[0]?.price,
      discountedPrice: selectedWishList[0]?.discounted_price,
      title: selectedWishList[0]?.title,
      discount: selectedWishList[0]?.discounted_percent,
    };

    const wishLidta = [...filterWishList, daata];

    dispatch(updateWishList(wishLidta));
    localStorage.setItem("wishListArray", JSON.stringify(wishLidta));

    const val = {
      package_id: data.id,
      model_type: "package",
      is_fav: isFav,
      user_type: data.is_supplierId || 1,
    };

    if (access_token) {
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      setLoading(true);

      axios
        .post(wishListUrl, val, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.status) {
            dispatch(callWishListData());
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the error ");
        });
    } else {
      toast("Please Login !", { type: "warning" });
    }
  };

  // checking favourite package ;

  const checkWishList = wishtListArray.filter((itm, index) => {
    return itm.id === props.id;
  });

  const isFavourite = checkWishList[0];

  console.log(isFavourite?.is_fav, "isFavoutirte");

  return (
    <>
      {isFavourite?.is_fav == "true" && (
        <div class="col-lg-3 col-md-6 col-12">
          <div className="package-col">
            <div className="media-img  coman-img">
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
                  {props.price ? (
                    props.price
                  ) : (
                    <Skeleton variant="text" width={80} />
                  )}{" "}
                  <s>{props.outlayprice && `₹ ${props.outlayprice}`}</s>
                </h4>
                <button
                  className="btn"
                  onClick={() => renderToAllPackagesDetails(props)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const WishlistData = ({ wishtListArray }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="all-pack-slider inner-row-package">
        <div className="package-section-slider common-container">
          <div className="container-fluid whishlistRow">
            <div className="title-with-button">
              <div className="row">
                <div className="title-col">
                  <h2>
                    <span>Favourite</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="row comman-card">
              {wishtListArray.length != 0 &&
                wishtListArray.map((item, index) => {
                  console.log(item, "item");
                  return (
                    <>
                      <AllPackagesCard
                        img={item.image}
                        heading={item.title}
                        price={item.discounted_price}
                        outlayprice={item.price}
                        discount={item.discount_percent}
                        rating={item.rating}
                        review={item.review}
                        id={item.id}
                        categoryId={item.category}
                        categoryName={item.category_name}
                        subcategoryId={item.subcategory}
                        subcategoryName={item.subcategory_name}
                        isFav={item.is_fav}
                        wishtListArray={wishtListArray}
                        loading={loading}
                        setLoading={setLoading}
                      />
                    </>
                  );
                })}

              {wishtListArray.length == 0 && (
                <>
                  <div style={{ width: "100%" }} className="my-2">
                    <img src={Favourite} alt="" style={{ width: "100%" }} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </>
  );
};

export default WishlistData;
