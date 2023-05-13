import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./upcoming.css";
import { AiOutlineStar, AiOutlineHeart } from "react-icons/ai";
import Skeleton from "@mui/material/Skeleton";
import Loader from "../../utils/Loader";
import { useHistory, generatePath } from "react-router-dom";
import NoBookings from "../../assets/images/noBookings.png";
import CancelModal from "../../Screens/BookingDetails/CancelModal";
import { endpoints } from "../../services/endpoints";

const UpcomingComp = (props) => {
  const { allBookings, getUpcomingBookingList, loading, setLoading } = props;

  const history = useHistory();
  const [item, setItem] = useState([1, 2, 3, 4]);
  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const [showFinalCancel, setShowFinalCancel] = useState(false);
  const access_token = localStorage.getItem("access_token");
  const [isOpen, setIsOpen] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState({});
  const [cancelReason, setCancelReason] = useState("");

  const handleBookingDetails = (data) => {
    var subCatName = data.subcategory_name;
    subCatName = subCatName.replaceAll(" ", "-");
    var packageName = data.title;
    packageName = packageName.replaceAll(" ", "-");

    const path = generatePath(
      "/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id/booking-details/:booking_id",
      {
        sub_category_name: subCatName,
        sub_category_id: data.subcategory,
        location: cityLocattion.name,
        package_name: packageName,
        package_id: data.id,
        booking_id: data.booking_id,
      }
    );

    history.push(path);
  };

  const handleCancelBtn = (dta) => {
    setSelectedPackage(dta);
    setIsOpen(true);
  };

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
        package_id: selectedPackage.id,
        status: "cancelled",
        booking_id: selectedPackage.booking_id,
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
            getUpcomingBookingList();
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
      <div className="all-pack-slider inner-row-package">
        <div className="package-section-slider common-container">
          <div className="container-fluid">
            <div className="title-with-button">
              <div className="row">
                <div className="title-col">
                  <h2>
                    <span> Upcomings Bookings</span>
                  </h2>
                </div>
              </div>
            </div>

            <div className="row comman-card">
              {allBookings.length != 0 &&
                allBookings.map((itm, ind) => {
                  return (
                    <>
                      <div class="col-lg-3 col-md-6 col-12">
                        <div className="package-col">
                          <div className="media-img  coman-img">
                            {itm.image_id ? (
                              <img src={itm.image_id} />
                            ) : (
                              <Skeleton height={250} variant="rectangular" />
                            )}
                          </div>
                          <div className="details">
                            <h3>{itm.title}</h3>
                            <div className="rating-and-discount">
                              <h5>
                                <span>{itm.discount_percent} % off </span>
                              </h5>
                              <div className="rating">
                                <span>{itm.rating}</span>
                                <AiOutlineStar />
                              </div>
                            </div>
                            <div className="price-and-btn">
                              <h4>
                                <span>₹</span>
                                {itm.discounted_price}
                                <s>₹{itm.purchased_price}</s>
                              </h4>
                            </div>
                            <div className="upcomingDte">
                              <button
                                className="btn bokking-details"
                                onClick={() => handleBookingDetails(itm)}
                              >
                                Booking Details
                              </button>
                              <button
                                className="bokking-details"
                                onClick={() => handleCancelBtn(itm)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>

            {!loading && allBookings.length == 0 && (
              <>
                <div style={{ width: "100%" }} className="my-2">
                  <img src={NoBookings} alt="" style={{ width: "100%" }} />
                </div>
              </>
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
          </div>
          {/* <Loader /> */}
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
      <ToastContainer />
    </>
  );
};

export default UpcomingComp;
