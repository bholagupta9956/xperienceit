// here we will design the below section of the ProductsScreen ;

import React, { useState, useEffect, useRef } from "react";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import ReactPlayer from "react-player";
import YellowStar from "./images/yellowstar.svg";
import Marker from "./images/marker.svg";
import CalenderIcon from "./images/calendar.svg";
import User from "../../assets/icons/user.png";
import parse from "html-react-parser";
import { ImCross } from "react-icons/im";
import "./product.css";
import ProductReview from "./ProductReview";
import CartGallary from "../CartGallary/CartGallary";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Button, ToggleButton } from "react-bootstrap";
import axios from "axios";
import Cart3 from "../CartGallary/Cart3";
import RelatedPackage from "../RelactedPackage/RelatedPackage";
import ProductStickBar from "./ProductStickBar";
import ReadMoreAndLess from "react-read-more-less";


const ProductPart2 = (props) => {

  const {
    productTitle,
    titleContent,
    cancellationPolicy,
    refundPolicy,
    termCondition,
    productRating,
    productGalary,
    arrangment,
    note,
    pincode,
    setDeliveryCharge,
    setSelectedPincode,
    selectedPincode,
    timeSlot,
    bookPackage,
    setTimeSlot,
    getReview,
    selectedDate,
    packagePrice,
    selectedTimeSlotId,
    setSelecetedTimeSlotId,
    setSelectedDate,
    selectedTimeSlot,
    setSelecetedTimeSlot,
    setTotalPrice,
    faq,
    showCustomization,
    setShowCustomization,
    readLessReview,
    readMoreReview,
    reviews,
    packageIdd,
    totalPrice,
    showMoreReview,
    exclusion,
    reviewCount,
    experienceVideo,
    discountedPrice,
    gstPrice,
    poductCategoryTitle,
  } = props;

  // console.log(pincode,"available pincode")

  const [errors, setErrors] = useState({});
  const [writeReview, setWriteReview] = useState([]);
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(1);
  const [showSearchPincodegBox, setShowSearchPincodegBox] = useState(false);
  const [allNumbers, setAllNumbers] = useState([]);
  const [filteredPincodeNumber, setFilteredPincodeNumbers] = useState([]);
  const [additionalCharge, setAdditionalCharge] = useState("");
  const [pincodeAvailbleText, setPincodeAvailableText] = useState(false);

  var dtToday = new Date();

  var month = dtToday.getMonth() + 1;
  var day = dtToday.getDate();
  var year = dtToday.getFullYear();
  if (month < 10) month = "0" + month.toString();
  if (day < 10) day = "0" + day.toString();

  var minDate = year + "-" + month + "-" + day;

  const handleTimeSlot = (data) => {
    setSelecetedTimeSlot(data.slots);
    setSelecetedTimeSlotId(data.id);
  };

  const submitReview = () => {
    const access_token = localStorage.getItem("access_token");
    const writeReviewApi = `https://admin.xperienceit.in/api/customer-review`;

    const reviewData = {
      package_id: packageIdd,
      model_type: "package",
      rating: rating,
      description: description,
    };

    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    };

    if (access_token) {
      axios
        .post(writeReviewApi, reviewData, { headers: headers })
        .then((res) => {
          console.log(res, "Review Details data here..");

          if (res.data.status === true) {
            getReview();
            toast("Review Submitted successfully", { type: "success" });
          } else if (res.data.status === false) {
            toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          console.log("Review details data not found", err);
        });
    } else {
      toast("please login", { type: "warning" });
    }
  };

  useEffect(() => {
    const getAllPincode = "https://admin.xperienceit.in/api/get-all-pincode";
    axios
      .get(getAllPincode)
      .then((res) => {
        if (res.data.status == true) {
          const val = res.data.body;
          console.log(val, "pincoee vale");
          setAllNumbers(val);
          setFilteredPincodeNumbers(val);
        }
      })
      .catch((err) => {
        console.log(err, "getall pin code api data error");
      });

    setFilteredPincodeNumbers(pincode);
  }, []);

  const handelPincode = (e) => {
    const limit = 6;
    setPincodeAvailableText(false);
    setShowSearchPincodegBox(true);
    const val = e.target.value.slice(0, limit);
    setSelectedPincode(val);
    // setAdditionalCharge(true);
    // setDeliveryCharge(additional_charge);
    var filteredPincode = pincode.filter((itm, ind) => {
      return itm.pincode.toString().includes(val);
    });

    setFilteredPincodeNumbers(filteredPincode);
    if (val.length != 6) {
      setFilteredPincodeNumbers(pincode);
      setTimeSlot([]);
      setAdditionalCharge();
      setPincodeAvailableText(false);
      setSelecetedTimeSlot("");
    }
  };

  const handlePincodeSelection = (item) => {
    const pin = item.pincode;

    var filterAvailablePincode = pincode.filter((itm, ind) => {
      return itm.pincode.toString().indexOf(pin) != -1;
    });

    if (filterAvailablePincode.length != 0) {
      var ddd = filterAvailablePincode[0];

      setPincodeAvailableText(false);
      setAdditionalCharge(item.additional_charge);
      setDeliveryCharge(item.additional_charge);
      setTotalPrice(
        parseFloat(totalPrice) + parseFloat(item.additional_charge)
      );
    } else {
      setPincodeAvailableText(true);
    }
    setSelectedPincode(item.pincode);
    setShowSearchPincodegBox(false);
  };

  document.addEventListener("click", () => {
    if (window.innerWidth > 800) {
      setShowSearchPincodegBox(false);
    }
  });

  const reviewRef = useRef();
  const inclusionRef = useRef();
  const overviewRef = useRef();
  const videoRef = useRef();

  const review = () => {
    reviewRef.current.focus();
  };

  const inclusions = () => {
    inclusionRef.current.focus();
  };
  const Overviews = () => {
    overviewRef.current.focus();
  };

  const showVideo = () => {
    videoRef.current.focus();
  };

  return (
    <>
      <div className="package-details-page">
        <div className="inner-package-section common-container">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-8">
                <div className="package-left-area">
                  <div className="productLeft_heading">
                    <div className="row">
                      <div className="col-lg-9 col-md-8">
                        <h5>
                          <span>{props.poductCategoryTitle}</span>
                        </h5>
                        <h3>{props.productTitle}</h3>
                        <div className="product_star">
                          {props.productRating && props.productRating != 0 ? (
                            <img src={YellowStar} alt="star" />
                          ) : (
                            ""
                          )}

                          {props.productRating && props.productRating != 0 ? (
                            <h6 className="prdctrtng">
                              {props?.productRating}
                            </h6>
                          ) : (
                            ""
                          )}

                          {reviewCount && reviewCount != 0 ? (
                            <span>{props.reviewCount} review</span>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-4"></div>
                    </div>
                  </div>

                  <div className="product_left_para2"></div>

                  <div className="product_left_para gallery_slider common-card">
                    <Cart3 productGalary={productGalary} />
                  </div>

                  {titleContent && (
                    <div className="product_left_details common-card ">
                      <h4>Product Details: </h4>
                      <input
                        type="radio"
                        ref={overviewRef}
                        className="reference"
                        style={{ width: "0px", height: "0px" }}
                      />
                      <div className="product_left_details_box">
                        {/* <ReadMoreAndLess
                          className="read-more-content"
                          charLimit={10}
                          readMoreText="Read more"
                         
                        > */}
                        <h6 className="prdctDetails">
                          {titleContent && parse(props.titleContent)}
                        </h6>
                        {/* </ReadMoreAndLess> */}
                      </div>
                    </div>
                  )}
                  {cancellationPolicy && (
                    <div className="product_cancellation common-card">
                      <h5>Cancellation Policy:</h5>
                      <div className="product_cancellation_text cancellationPolicy">
                        <h6>
                          {cancellationPolicy &&
                            parse(props.cancellationPolicy)}
                        </h6>
                      </div>
                    </div>
                  )}
                  {refundPolicy && (
                    <div className="product_cancellation common-card">
                      <h5>Refund Policy:</h5>
                      <div className="product_cancellation_text refundPolicy">
                        <h6>{refundPolicy && parse(props.refundPolicy)}</h6>
                      </div>
                    </div>
                  )}

                  {note && (
                    <div className="product_cancellation common-card">
                      <h5>Need To Know</h5>
                      <div className="product_cancellation_text needToKnowText">
                        <h6 className="needToKnow">
                          {note && parse(props.note)}
                        </h6>
                      </div>
                    </div>
                  )}

                  {arrangment && (
                    <div className="product_arrngmgnt common-card">
                      <h5>Arrangements</h5>

                      <div className="product_arrngmgnt_text">
                        {/* <img src={Hand} alt="Hand icon" /> */}
                        <h6 className="arrangmentsIcon">
                          {arrangment && parse(props.arrangment)}
                        </h6>
                      </div>
                    </div>
                  )}
                  {termCondition && (
                    <div className="product_trust">
                      <h5>Terms & Condition</h5>

                      <div className="product_trust_text termCondition">
                        {/* <img src={Hand} alt="Hand icon" /> */}
                        <h6>{termCondition && parse(props.termCondition)}</h6>
                      </div>
                    </div>
                  )}

                  {faq && (
                    <div className="product_trust">
                      <h5>FAQ</h5>

                      <div className="product_trust_text faqcontent">
                        {/* <img src={Hand} alt="Hand icon" /> */}
                        <h6>
                          {faq.map((itm, idx) => {
                            return (
                              <>
                                <span>{itm.title}</span>
                                <br />
                                <span className="answr">{itm.content}</span>
                              </>
                            );
                          })}
                        </h6>
                      </div>
                    </div>
                  )}

                  {exclusion && (
                    <div className="product_trust_exclusion">
                      <h5>Exclusion</h5>
                      <input
                        type="radio"
                        ref={inclusionRef}
                        className="reference"
                        style={{ width: "0px", height: "0px" }}
                      />
                      <div className="product_trust_text_exclusion">
                        {/* <img src={Hand} alt="Hand icon" /> */}
                        <h6 className="productExclusion">
                          {exclusion && parse(props.exclusion)}
                        </h6>
                      </div>
                    </div>
                  )}
                  {experienceVideo && (
                    <div className="product_trust_vedio">
                      <h5>Xperience Video</h5>
                      <input
                        type="radio"
                        ref={videoRef}
                        className="reference"
                        style={{ width: "0px", height: "0px" }}
                      />
                      <div className="product_trust_text_vedio">
                        <ReactPlayer
                          className="reactplayer"
                          url={props.experienceVideo}
                          playsInline
                          controls="true"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="package-right-area">
                  <div className="product_booking common-card">
                    <div className="product_booking_input_price">
                      <h6>Packages Price</h6>₹{packagePrice} 
                      {(discountedPrice && discountedPrice != 0) && <> /  <s> ₹{discountedPrice} </s></>}
                      <hr />
                    </div>
                    <div style={{ position: "relative" }}>
                      <div className="product_booking_input">
                        <input
                          type="number"
                          maxLength={5}
                          className="searchPincode"
                          placeholder="Enter Pincode"
                          id="numberField"
                          value={selectedPincode}
                          min="1"
                          onChange={(e) => handelPincode(e)}
                        />

                        {/* <select
                        value={selectedPincode}
                        onChange={(e) => setSelectedPincode(e.target.value)}
                        id="pincode"
                      >
                        <option value="">Select your pincode</option>
                        {pincode.map((item, index) => {
                          return (
                            <option value={item.pincode}>{item.pincode}</option>
                          );
                        })}
                      </select> */}

                        {/* <input type="text" placeholder="Enter pin code" /> */}
                        <img src={Marker} alt="marker icon" />
                      </div>

                      {showSearchPincodegBox === true && (
                        <div className="pinCodeData">
                          <ul>
                            {filteredPincodeNumber.length != 0 ? (
                              filteredPincodeNumber.map((item, index) => {
                                var dta = pincode.filter((itm, ind) => {
                                  return itm.pincode == item.pincode;
                                });
                                dta = dta[0];
                                var backgroundColor;
                                var colors;
                                if (dta) {
                                  backgroundColor = "#fe6684";
                                  colors = "#fff";
                                } else {
                                  backgroundColor = "white";
                                  colors = "gray";
                                }

                                return (
                                  <li
                                    onClick={() => handlePincodeSelection(item)}
                                    style={{
                                      background: backgroundColor,
                                      color: colors,
                                    }}
                                  >
                                    {item.pincode}
                                  </li>
                                );
                              })
                            ) : (
                              <h6 className="pinNotAvlbl">
                                Pincode not available
                              </h6>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>

                    {pincodeAvailbleText && (
                      <h6 className="pkgAvilability">
                        Package is not available for this pincode
                      </h6>
                    )}

                    {!pincodeAvailbleText && additionalCharge ? (
                      <h6 className="packageCharges">
                        For this pincode you have to pay delivery charge of Rs{" "}
                        {additionalCharge}
                      </h6>
                    ) : null}

                    <div className="product_calendar" htmlFor="date">
                      <label htmlFor="date">
                        {" "}
                        <img
                          src={CalenderIcon}
                          alt=" calendar"
                          htmlFor="date"
                          style={{ cursor: "pointer" }}
                        />
                      </label>
                      <input
                        type="date"
                        id="date"
                        placeholder="pick date.."
                        min={minDate}
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                      />
                    </div>

                    <div className="product_time">
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "18px",
                        }}
                      >
                        Select Time
                      </span>
                      &nbsp;
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "20",

                          marginBottom: "2px",
                        }}
                      >
                        <AiOutlineClockCircle />
                      </span>
                      {/* <img src={Clock} alt="clock icon" /> */}
                    </div>

                    <div className="product_select_time">
                      {timeSlot.map((item, index) => {
                        return (
                          <div key={index}>
                            <input
                              type="radio"
                              id={item.slots}
                              name="time"
                              // onChange={() => setSelecetedTimeSlot(item.id)}
                              onChange={() => handleTimeSlot(item)}
                              checked={
                                selectedTimeSlotId === item.id ? true : false
                              }
                            />
                            <label htmlFor={item.slots}>{item.slots}</label>
                          </div>
                        );
                      })}
                    </div>
                    <button className="product_btn" onClick={bookPackage}>
                      Book Now
                    </button>
                  </div>

                  {/* adding another box  */}
                  {/* <div className="product_trust" data-aos="fade-left">
                      <h5>
                        Why{" "}
                        <img
                          src={Chat}
                          alt="chat icon"
                          style={{ width: "35px", margin: "0px 4px" }}
                        />{" "}
                        Us ?
                      </h5>

                      <div className="product_trust_text">
                        <img src={Hand} alt="Hand icon" />
                        <h6>Trusted Platform - More Than 10,000 Celebrations</h6>
                      </div>
                      <div className="product_trust_text">
                        <img src={Hand} alt="Hand icon" />
                        <h6>Trusted Platform - More Than 10,000 Celebrations</h6>
                      </div>
                      <div className="product_trust_text">
                        <img src={Hand} alt="Hand icon" />
                        <h6>
                          Trusted Platform - More Than 10,000 Celebrations Every month
                        </h6>
                      </div>
                    </div> */}

                  {/* another box */}

                  <div className="reiview_product common-card">
                    <h5>Write Reviews</h5>

                    <div className="product_review_text">
                      <h6> Select Star</h6>
                      <ProductReview setRating={setRating} />
                      <div className="rieview_form mt-2">
                        <lavel className="font-weight-900">
                          Write Description :
                        </lavel>
                        <textarea
                          className="form-control mt-2"
                          rows="4"
                          cols="50"
                          placeholder="Write message ..."
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <Button
                          className="review_submit mt-3"
                          onClick={submitReview}
                        >
                          Submit Review
                        </Button>
                      </div>
                    </div>
                  </div>
                  {reviews.length != 0 && (
                    <div className="product_reviews">
                      <input
                        type="radio"
                        ref={reviewRef}
                        style={{ width: "0px", height: "0px" }}
                      />
                      <div className="product_Revews_header">
                        <h5>Reviews</h5>
                      </div>
                      <div className="product_revew_details">
                        {reviews.map((item, index) => {
                          return (
                            <>
                              <div className="row no-gutters revwDtlsBox">
                                <div className="col-auto review_customer_img">
                                  <img
                                    src={
                                      item.icon_image ? item.icon_image : User
                                    }
                                    alt="user image"
                                  />
                                </div>
                                <div className="col rivewDetls">
                                  <p className="review-customer-name">
                                    {item.user_name}
                                  </p>
                                  <h6
                                    style={{
                                      display: "inline-block",
                                      direction: "ltr",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <span className="rivewDetls_rating">
                                      {" "}
                                      {item.rating}{" "}
                                    </span>
                                    <img src={YellowStar} alt="star" />
                                  </h6>
                                  <p className="review-cutomer-content">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                            </>
                          );
                        })}
                        {!showMoreReview ? (
                          <span onClick={readMoreReview}>Read more..</span>
                        ) : (
                          <span onClick={readLessReview}>Read less...</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
        <RelatedPackage />
      </div>
      <ProductStickBar
        reviews={reviews}
        packagePrice={packagePrice}
        discountedPrice={discountedPrice}
        review={review}
        inclusions={inclusions}
        Overviews={Overviews}
        showVideo={showVideo}
        experienceVideo={experienceVideo}
        exclusion={exclusion}
        titleContent={titleContent}
      />
    </>
  );
};

// exporting the component ;
export default ProductPart2;
