import Navebar3 from "../../Components/Common/Navbar/Navebar3";
import Mainpart2 from "../../Components/HomeScreenDetails/TaskBar/Mainpart2";
import TaskBar from "../../Components/HomeScreenDetails/TaskBar/TaskBar";
// import "./BookingDetails.css";
import OwlCarousel from "react-owl-carousel";
import Skeleton from "@mui/material/Skeleton";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import YellowStar from "./BookingDetailsImages/yellowstar.svg";
import Close from "./BookingDetailsImages/close24.png";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "video-react/dist/video-react.css";
import ReactPlayer from "react-player";
import User from "../../assets/icons/user.png";
// import Marker from "./images/marker.svg";
// import CalenderIcon from "./images/calendar.svg";
import { BiCalendar, BiEdit } from "react-icons/bi";
import parse from "html-react-parser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClockCircle } from "react-icons/ai";
import { Button, ToggleButton } from "react-bootstrap";
import axios from "axios";
import ProductReview from "../../Components/ProductScreenDetails/ProductReview";
import Footer2 from "../../Components/Common/Footer/Footer2";
import CancelModal from "./CancelModal";
import { useParams, useLocation } from "react-router-dom";
import ProductCarousel from "../../Components/ProductScreenDetails/ProductCarousel";
import { endpoints } from "../../services/endpoints";


const BookingDetails = (props) => {

  const {
    sub_category_name,
    sub_category_id,
    package_name,
    package_id,
    booking_id,
  } = useParams();

  const location = useLocation();

  const [showSideBar, setShowSideBar] = useState(false);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const cityID = cityLocattion && cityLocattion.id;

  // let's get all the data of the package and update it;
  const [bookingData, setBookingData] = useState({});
  const [productGalary, setProductGalary] = useState([]);
  const [productBanner, setProductBanner] = useState([]);
  const [productTitle, setProductTitle] = useState([]);
  const [titleContent, setTitleContent] = useState(" ");
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [refundPolicy, setRefundPolicy] = useState("");
  const [faq, setFaq] = useState([""]);
  const [termCondition, setTermCondition] = useState("");
  const [arrangment, setArrangment] = useState("");
  const [exclusion, setExclusion] = useState("");
  const [note, setNote] = useState("");
  const [productRating, setProductRating] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [packagePrice, setPackagePrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [gstPrice, setGstPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [allReviews, setAllReviews] = useState([]);
  const [rating, setRating] = useState(1);
  const [showMoreReview , setShowMoreReview] = useState(false)
  const [experienceVideo, setExperienceVideo] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [poductCategoryTitle, setPoductCategoryTitle] = useState("");
  const [description, setDescription] = useState("");
  const access_token = localStorage.getItem("access_token");
  const [loading , setLoading] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState({});
  const [cancelReason, setCancelReason] = useState("");
  const [showFinalCancel, setShowFinalCancel] = useState(false);

  //  getting the package data through the api;

  const getPackageData = () => {
    const api = `https://admin.xperienceit.in/api/getDetailPackage?id=${package_id}`;

    axios
      .get(api)
      .then((res) => {
        if (res.data.status === true) {
          const galleryImg = res.data.body[0].gallery;
          setProductGalary(galleryImg);
          const productBannerImg = res.data.body[0].banner_image_id;
          setProductBanner([productBannerImg]);
          const productName = res.data.body[0].title;
          setProductTitle(productName);
          setPoductCategoryTitle(res.data.body[0]?.category_name);
          setPoductCategoryTitle(res.data.body[0]?.category_name);
          const headContent = res.data.body[0].content;
          setTitleContent(headContent);
          const cancel = res.data.body[0].cancellation;
          setCancellationPolicy(cancel);
          const refund = res.data.body[0].refund_policy;
          setRefundPolicy(refund);
          const termsCondtn = res.data.body[0].termcondition;
          setTermCondition(termsCondtn);
          const rating = res.data.body[0].rating;
          setProductRating(rating);
          setReviewCount(res.data.body[0]?.review_count);
          setReviewCount(res.data.body[0]?.review_count);
          const arrangmgnt = res.data.body[0].arrangments;
          setExclusion(res.data.body[0]?.exclusion);
          setExclusion(res.data.body[0]?.exclusion);
          setArrangment(arrangmgnt);
          const FAQ = res.data.body[0].faqs;
          setFaq(FAQ);
          const notes = res.data.body[0].points_note;
          setNote(notes);
          const price = res.data.body[0].discounted_price;
          setTotalPrice(res.data.body[0]?.gst_price.replaceAll(",", ""));
          setTotalPrice(res.data.body[0]?.gst_price.replaceAll(",", ""));
          setPackagePrice(price);
          setDiscountedPrice(res.data.body[0]?.outlay_price);
          setGstPrice(res.data.body[0]?.gst_price.replaceAll(",", ""));
          setExperienceVideo(res.data.body[0]?.video);
          setDiscountedPrice(res.data.body[0]?.outlay_price);
          setGstPrice(res.data.body[0]?.gst_price.replaceAll(",", ""));
          setExperienceVideo(res.data.body[0]?.video);
        } else if (res.data.success === false) {
          toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, "Get Details Packages Data Not Found");
      });
  };

  const getBookingData = () => {
    const url = endpoints.booking.bookingDetailsUrl;
    const access_token = localStorage.getItem("access_token");

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    const dta = {
      booking_id: booking_id,
    };

    axios
      .post(url, dta, { headers: headers })
      .then((res) => {
        console.log(res, "this is the response");
        if (res.data.status) {
          var data = res.data.body;
          data = data[0];
          setBookingData(data);
        }
      })
      .catch((err) => {
        console.log(err, "booking details errors");
      });
  };

  const getReview = () => {

    const reviewapi = `https://admin.xperienceit.in/api/review-by-package?package_id=${package_id}`;

    axios
      .get(reviewapi)
      .then((res) => {
        if (res.data.status === true) {
          var val = res.data.body;
          val = val.reverse();

          if(val.length == 1) {
           var dta = [val[0]]
           setReviews(dta)
          }
          else {
            var dta = [val[0] , val[1]]
            setReviews(dta)
          }
        
          setAllReviews(val)
          
        } else if (res.data.status === false) {
          // toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, "Review Details Not Found");
      });
  };

  useEffect(() => {
    getPackageData();
    getBookingData();
    getReview();
  }, []);

  const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "600px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "99",
      backgroundColor: "white",
    },
  };


  const submitReview = () => {
    
    const access_token = localStorage.getItem("access_token");
    const writeReviewApi = `https://admin.xperienceit.in/api/customer-review`;

    const reviewData = {
      package_id: package_id,
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


  const readMoreReview = () =>{
    setReviews(allReviews)
    setShowMoreReview(true)
  }

  const readLessReview = () =>{
    setShowMoreReview(false)
    if(allReviews.length == 1) {
      var dta = [allReviews[0]]
      setReviews(dta)
     }
     else {
       var dta = [allReviews[0] , allReviews[1]]
       setReviews(dta)
     }
  }

  const CancelOrder = () => {

    if (cancelReason == "") {
      toast("Please give cancel reason", { type: "warning" });
    } else {
      const cancelUrl = endpoints.booking.cancelBooking;

      const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      };

      const val = {
        package_id: package_id,
        status: "cancelled",
        booking_id: booking_id,
        cancel_reason: cancelReason,
      };

      setLoading(true);
      axios
        .post(cancelUrl, val, { headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.status === true) {
            toast("Booking cancelled Successfully", { type: "success" });
            setShowFinalCancel(true);
            setIsOpen(false);

          } else if (res.data.status === false) {
            toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "this is the eror");
        });
    }
  };


  return (
    <>
      <div className="BokkingDetails">
        <Navebar3
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          updateLocation={updateLocation}
          setUpdateLocation={setUpdateLocation}
          taskBarData={taskBarData}
        />
        <TaskBar
          updateLocation={updateLocation}
          setTaskBarData={setTaskBarData}
        />
        <div className="booking-details-banner">
          <ProductCarousel productBanner={productBanner} />
          <div className="package-details-page">
            <div className="inner-package-section common-container">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-7 ">
                    <div className="package-left-area ">
                      <div className="productLeft_heading">
                        <div className="row">
                          <div className="col-lg-9 col-md-8">
                            <h5>
                              Home/Experiences/{" "}
                              <span>{poductCategoryTitle}</span>
                            </h5>
                            <h3>{productTitle}</h3>
                            <div className="product_star">
                              {productRating && productRating != 0 ? (
                                <img src={YellowStar} alt="star" />
                              ) : (
                                ""
                              )}

                              {productRating && productRating != 0 ? (
                                <h6 className="prdctrtng">{productRating}</h6>
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

                    

                      {titleContent && (
                        <div className="product_left_details common-card">
                          <h4>Product Details: </h4>

                          <div className="product_left_details_box">
                            <h6>{titleContent && parse(titleContent)}</h6>
                          </div>
                        </div>
                      )}

                      {cancellationPolicy && (
                        <div className="product_cancellation common-card">
                          <h5>Cancellation Policy:</h5>
                          <div className="product_cancellation_text cancellationPolicy">
                            <h6>
                              {cancellationPolicy && parse(cancellationPolicy)}
                            </h6>
                          </div>
                        </div>
                      )}

                      {refundPolicy && (
                        <div className="product_cancellation common-card">
                          <h5>Refund Policy:</h5>
                          <div className="product_cancellation_text refundPolicy">
                            <h6>{refundPolicy && parse(refundPolicy)}</h6>
                          </div>
                        </div>
                      )}

                      {note && (
                        <div className="product_cancellation common-card">
                          <h5>Need To Know</h5>
                          <div className="product_cancellation_text needToKnowText">
                            <h6 className="needToKnow">
                              {note && parse(note)}
                            </h6>
                          </div>
                        </div>
                      )}

                      {arrangment && (
                        <div className="product_arrngmgnt common-card">
                          <h5>Arrangements</h5>

                          <div className="product_arrngmgnt_text">
                            {/* <img src={Hand} alt="Hand icon" /> */}
                            <h6 className="arrangmentsIcon">{arrangment && parse(arrangment)}</h6>
                          </div>
                        </div>
                      )}

                      {termCondition && (
                        <div className="product_trust">
                          <h5>Terms & Condition</h5>

                          <div className="product_trust_text termCondition">
                            <h6>{termCondition && parse(termCondition)}</h6>
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
                                    <li>{itm.title}</li>
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

                          <div className="product_trust_text_exclusion">
                            {/* <img src={Hand} alt="Hand icon" /> */}
                            <h6 className="productExclusion">
                              {exclusion && parse(exclusion)}
                            </h6>
                          </div>
                        </div>
                      )}

                      {experienceVideo && (
                        <div className="product_trust_vedio">
                          <h5>Xperience Video</h5>

                          <div className="product_trust_text_vedio">
                            <ReactPlayer
                              className="reactplayer"
                              url={experienceVideo}
                              playsInline
                              controls="true"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="package-right-area">
                      <div className="product_booking common-card bookings-details-card">
                        <div className="product_booking_input_price">
                          <h6 className="Bookig-details-heading">
                            Booking Details
                          </h6>
                          <div className="booking-pakages-time-slot">
                            <span> {bookingData.dateMonth}</span>{" "}
                            <span>Time : {bookingData.time}</span>
                          </div>
                          <hr />
                          <div className="bokking-pakage-details">
                            <span className="pr-2">{bookingData.title}</span>
                            <span> {`₹${bookingData.gst_price}`}</span>
                          </div>
                          <div className="bokking-pakage-details">
                            <span>additional charge</span>
                            <span> {`₹${bookingData.additional_charge}`}</span>
                          </div>
                          <div className="customdetails">
                            <span style={{ marginBottom: "10px" }}>
                              {/* Customization <BiEdit /> */}
                            </span>

                            {bookingData?.customization &&
                              bookingData.customization.length != 0 &&
                              bookingData.customization.map((itm, ind) => {
                                return (
                                  <>
                                    <div className="">
                                      <div className="bkngDetails">
                                        <h6 className="bkngTitle">Title</h6>
                                        <h6 className="bkngQnty">Quantity</h6>
                                        <h6 className="bkngPrice">Price</h6>
                                      </div>

                                      <div className="bkngDetails2">
                                        <h6 className="bkngTitle">
                                          {itm.title}
                                        </h6>
                                        <h6 className="bkngQnty">
                                          {itm.quantity}
                                        </h6>
                                        <h6 className="bkngPrice">
                                        ₹ {itm.price}
                                        </h6>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                          </div>

                          <hr />
                          <div className="booking-pakage-details-price">
                            <span>Total Cost</span>
                            <span>{`₹ ${bookingData.purchased_price}`}</span>
                          </div>
                        </div>

                        <button
                          className="product_btn"
                          onClick={() => setIsOpen(true)}
                        >
                          Cancel Booking
                        </button>
                      </div>

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

                      <div className="product_reviews">
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

                              {/* <div className="product_review_user">
                                <div className="product_review_user_box">
                                  <img
                                    src={
                                      item.icon_image ? item.icon_image : User
                                    }
                                    alt="user image"
                                  />
                                  <ul>
                                    <h6>{item.user_name}</h6>
                                  </ul>
                                  <div className="product_review_star">
                                    <span>{item.rating}</span>&nbsp;
                                    <img src={YellowStar} alt="star" />
                                  </div>
                                </div>
                                <p>{item.description}</p>
                              </div> */}
                            </>
                          );
                        })}
                        {reviews.length > 2 && (!showMoreReview  ? (
                          <span onClick={readMoreReview}>Read more..</span>
                        ) : (
                          <span onClick={readLessReview}>Read less...</span>
                        ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </div>
        <CancelModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        CancelOrder={CancelOrder}
        setCancelReason={setCancelReason}
        cancelReason={cancelReason}
        showFinalCancel={showFinalCancel}
        setShowFinalCancel={setShowFinalCancel}
      />
        <Footer2 />
      </div>
    </>
  );
};

export default BookingDetails;
