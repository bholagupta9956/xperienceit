import React, { useState, useEffect } from "react";
import { BsWhatsapp } from "react-icons/bs";
import { BiCalendar, BiEdit } from "react-icons/bi";
import { MdOutlineWatchLater } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./BookNow.css";
// import logo from './logo.svg';
import Customization from "../Customization/Customization";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import { useHistory, useLocation } from "react-router-dom";
import Loader from "./../../utils/Loader";


const BookNow = () => {

  const history = useHistory();
  const location = useLocation();
  const loginInfo = localStorage.getItem("userDetails");
  const loginVal = JSON.parse(loginInfo);
  const trnsDta = location.state;

  useEffect(() => {
    if (trnsDta == undefined) {
      history.push("/");
    }
  }, []);

  const bookingData = trnsDta && trnsDta?.bookingDetails;
  const customizations = bookingData?.customizationDetails;

  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState(bookingData?.pincode);
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [aboutInfo, setAboutInfo] = useState("");
  const [occasion, setOccasion] = useState("");
  const [notes, setNotes] = useState("");
  const [states, setStates] = useState("");

  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState([]);
  const [selectedCustomizationId, setSelectedCustomizationId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const access_token = localStorage.getItem("access_token");


  useEffect(() => {
    if (customizations != undefined) {
      setSelectedCustomization(customizations);
      setSelectedCustomization(bookingData.selectedCustomization);
      setSelectedCustomizationId(bookingData.selectedCustomizationId);
      setTotalPrice(bookingData.totalPrice);
    }
  }, [customizations]);

  const packageIdd = bookingData?.packageIdd;

  const booking = () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      if (address === "") {
        setErrors({ address: "Address not must be blank" });
        toast("Please enter address", { type: "warning" });
      } else if (pincode === "") {
        setErrors({ pincode: "pincode not must be blank" });
        toast("Please enter pincode", { type: "warning" });
      } else if (city === "") {
        setErrors({ city: "city not must be blank" });
        toast("Please enter city", { type: "warning" });
      } else if (states === "") {
        setErrors({ state: "state not must be blank" });
        toast("Please enter state", { type: "warning" });
      } else if (aboutInfo === "") {
        toast("Please choose about information");
        toast("Please enter about info", { type: "warning" });
      } else if (occasion === "") {
        toast("Please choose a occasion");
        toast("Please choose a occassion", { type: "warning" });
      } else {
        setErrors({});
        setIsLoading(false);
        if (loginVal) {
         

          const headers = {
            Authorization: `Bearer ${access_token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          };

          displayRazorpay(parseInt(bookingData.totalPrice));
        }
      }
    } else {
      toast("Please login", { type: "info" });
      setIsLoading(false);
    }
  };

  const handleBookNow = () => {
    setShowCustomization(false);
  };

  // Payment Gateway Intigrations
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",

    minimumFractionDigits: 0,
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  

  const sendPaymentDataToBackend = () =>{

    const api = endpoints.home.bookingDetails;
    const data = {
      city_id: bookingData?.cityId,
      address: address,
      pincode: pincode,
      city: city,
      object_id: bookingData.objectId,
      customization_details: bookingData?.customizationDetails,
      timeslot_id: bookingData?.timeslotId,
      booking_date: bookingData?.booking_date,
      // customer_id: "",
      object_model: "package",
      start_date: bookingData?.booking_date,
      end_date: bookingData?.booking_date,
      status: "confirmed",
      email: loginVal.email,
      first_name: loginVal.first_name,
      last_name: loginVal.first_name,
      gateway: "COD",
      phone: loginVal.phone,
      address2: address,
      state: states,
      zip_code: pincode,
      country: "India",
      customer_notes: notes,
      vendor_id: "1",
      total_payable: bookingData?.totalPrice,
    };

    
    const headers = {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    setIsLoading(true)

    axios
      .post(api, data, { headers: headers })
      .then((res) => {
        if (res.data.status === true) {
          toast("Thanks for booking !", { type: "success" });
          setIsLoading(false);
          history.push("/");
        } else if (res.data.status === false) {
          toast(res.data.message, { type: "error" });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err, "booking details data not found");
        setIsLoading(false);
      });
  }

  const displayRazorpay = async (amount) => {

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      toast("You are offline ...Failed to load Razorpay SDK" , {type : "warning"});
      return;
    }
    else {
    const options = {
      // key: "rzp_test_2xp5hbZcfnYnT5", 
      key:"rzp_live_aQItc9wjdMGC69",
      currency: "INR",
      amount: amount * 100,
      name: "XperienceIt Private Limited",
      description: "Thanks for purchasing",
      
      handler : function (response) {
        // alert(response.razorpay_payment_id);
        // alert("Payment Successfully");
        console.log(response , "payment response heref")
        if(response){
          sendPaymentDataToBackend()
        }
        else {
          toast("Sorry payment failed" , {type : 'error'});
        }
      },
      prifill: {
        name: "XperienceIt Private Limited",
        description: "Thanks for purchasing",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  };

  // Payment Gateway Intigrations end;


  return (
    <>
      <div className="productPart2 booking-section">
        <div className="inner-booking-section common-container booknowContainer">
          <div className="container-fluid booknow">
            <div className="row">
              <div className="col-lg-7">
                <div className="booking_step_left">
                  <div className="product_cancellation" data-aos="fade-right">
                    <h4>Order Details</h4>
                    <div className="product_cancellation_text"></div>
                    <div className="bookingForm">
                      <form>
                        <div className="row">
                          <div className="form-group col-lg-6 col-md-6">
                            <label for="">Your Address?* (Max 200)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="Please Enter Your Address"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                            <span style={{ color: "red" }}>
                              {errors.address}
                            </span>
                          </div>
                          <div className="form-group col-lg-6 col-md-6">
                            <label for="">Pincode*</label>
                            <input
                              type="text"
                              className="form-control selectpin"
                              placeholder="Please Share Pincode"
                              value={pincode}
                              readOnly={true}
                            />
                            <span style={{ color: "red" }}>
                              {errors.pincode}
                            </span>
                          </div>

                          <div className="form-group col-lg-6 col-md-6">
                            <label for="">City*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Please Share City Name"
                              value={city}
                              onChange={(e) => setCity(e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.city}</span>
                          </div>
                          <div className="form-group col-lg-6 col-md-6">
                            <label for="">State*</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Please Share State Name"
                              value={states}
                              onChange={(e) => setStates(e.target.value)}
                            />
                            <span style={{ color: "red" }}>{errors.state}</span>
                          </div>

                          <div className="form-group">
                            <label for="">Description. (max : 50)</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Please enter description"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                            />
                          </div>
                        </div>
                      </form>

                      <div className="form2">
                        <div class="row mt-3">
                          <div class="col-sm-12">
                            <p>
                              * How did you come to know about xperience it?{" "}
                            </p>
                          </div>

                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="advertisement"
                              onChange={(e) => setAboutInfo("Advertisement")}
                            />
                            <label htmlFor="advertisement">Advertisement</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="friend"
                              onChange={(e) => setAboutInfo("Friend")}
                            />
                            <label htmlFor="friend">Friend</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="google"
                              onChange={(e) => setAboutInfo("Google")}
                            />
                            <label htmlFor="google">Google</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="insta"
                              onChange={(e) => setAboutInfo("Instagram")}
                            />
                            <label htmlFor="insta">Instagram</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="fb"
                              onChange={(e) => setAboutInfo("Facebook")}
                            />
                            <label htmlFor="fb">Facebook</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="email"
                              onChange={(e) => setAboutInfo("Email")}
                            />
                            <label htmlFor="email">Email</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="used"
                              onChange={(e) => setAboutInfo("Used Before")}
                            />
                            <label htmlFor="used">Used Before</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="amazon"
                              onChange={(e) => setAboutInfo("Amazon")}
                            />
                            <label htmlFor="amazon">Amazon</label>
                          </div>
                          <div class="form-inline col-lg-3 col-md-4 col-6">
                            <input
                              type="radio"
                              name="advert"
                              id="other"
                              onChange={(e) => setAboutInfo("Other")}
                            />
                            <label htmlFor="other">Other</label>
                          </div>
                        </div>
                        <div class="row mt-3">
                          <div class="col-sm-12">
                            <p>* What is the occasion?</p>
                          </div>

                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="anniversary"
                              onChange={(e) => setOccasion("Anniversary")}
                            />
                            <label htmlFor="anniversary">Anniversary</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="babys"
                              onChange={(e) => setOccasion("Baby Shower")}
                            />
                            <label htmlFor="babys">Baby Shower</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="frstbirth"
                              onChange={(e) => setOccasion("First Birthday")}
                            />
                            <label htmlFor="frstbirth">First Birthday</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="bachelorette"
                              onChange={(e) => setOccasion("Bachelorette")}
                            />
                            <label htmlFor="bachelorette">Bachelorette</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="festival"
                              onChange={(e) => setOccasion("Festival")}
                            />
                            <label htmlFor="festival">Festival</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="prtnrbirth"
                              onChange={(e) =>
                                setOccasion("Partner's Birthday")
                              }
                            />
                            <label htmlFor="prtnrbirth">
                              Partner's Birthday
                            </label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="casual"
                              onChange={(e) => setOccasion("Casual Outing")}
                            />
                            <label htmlFor="casual">Casual Outing </label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="formyPrtnr"
                              onChange={(e) => setOccasion("For my Parents")}
                            />
                            <label htmlFor="formyPrtnr">For my Parents</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="frmyKids"
                              onChange={(e) => setOccasion("For my Kids")}
                            />
                            <label htmlFor="frmyKids">For my Kids</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="brosis"
                              onChange={(e) =>
                                setOccasion("For Brother or Sister")
                              }
                            />
                            <label htmlFor="brosis">
                              For Brother or Sister
                            </label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="valentine"
                              onChange={(e) => setOccasion("Valentine's")}
                            />
                            <label htmlFor="valentine">Valentine's</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="karvachauth"
                              onChange={(e) => setOccasion("Karvachauth")}
                            />
                            <label htmlFor="karvachauth">Karvachauth</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="wlcmbaby"
                              onChange={(e) => setOccasion("Welcome Baby")}
                            />
                            <label htmlFor="wlcmbaby">Welcome Baby</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="home"
                              onChange={(e) => setOccasion("House Warming")}
                            />
                            <label htmlFor="home">House Warming</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="shopinog"
                              onChange={(e) => setOccasion("Shop Inauguration")}
                            />
                            <label htmlFor="shopinog">Shop Inauguration</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="office"
                              onChange={(e) => setOccasion("Office")}
                            />
                            <label htmlFor="office">Office</label>
                          </div>
                          <div class="form-inline col-lg-4 col-md-4 col-6">
                            <input
                              type="radio"
                              name="occas"
                              id="other"
                              onChange={(e) => setOccasion("Other")}
                            />
                            <label htmlFor="other">Other</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="product_About">
                    <h5 style={{ color: "green", fontSize: "30px" }}>
                      <a
                        href="https://api.whatsapp.com/send/?phone=917080581133&text&type=phone_number&app_absent=0"
                        className="whatsApplogo"
                      >
                        <BsWhatsapp />
                      </a>
                    </h5>
                    {"   "}
                    <h5 style={{ marginLeft: "15px", marginTop: "5px" }}>
                      Unable to login or facing Payment issue?{" "}
                      <a
                        href="https://api.whatsapp.com/send/?phone=917080581133&text&type=phone_number&app_absent=0"
                        className="whatsAppLink"
                      >
                        Click to connect on WhatsApp
                      </a>
                    </h5>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
                <div className="booking_step_right">
                  <div className="product_arrngmgnt" data-aos="fade-left">
                    <h5>Order Summary</h5>

                    <div className="product_details">
                      <div className="product_date">
                        <span>
                          <BiCalendar />
                        </span>
                        <h6>{bookingData?.booking_date}</h6>
                      </div>
                      <div className="product_times">
                        <span>
                          <MdOutlineWatchLater />
                        </span>
                        <h6>{bookingData?.timeslot}</h6>
                      </div>
                      <div className="product_edit" style={{display : "none"}}>
                        <span>
                          <BiEdit />
                        </span>
                        <h6>Edit</h6>
                      </div>
                    </div>

                    <div className="bookingimgdetails">
                      <div className="booksingimg1">
                        <img
                          src={bookingData?.img}
                          height="80px"
                          width="80px"
                          style={{ borderRadius: "5px" }}
                        />
                      </div>
                      <div className="booksingimg2">
                        <span>{bookingData?.productTitle}
                        <p className="bokinggstText">(Inc. {bookingData?.gstPercent}% GST)</p>
                        </span>
                        
                      </div>
                      <div className="booksingimg3">
                        <span> Rs {bookingData?.gstPrice}</span>
                      </div>
                    </div>
                    <div className="delaivery">
                      <div className="dilevcharge1">
                        <span>Delivery Charges</span>
                      </div>
                      <div className="dilevcharge1">
                        <span>Rs {bookingData?.deliveryCharge}</span>
                      </div>
                    </div>
                    <div className="customdetails">
                      <span
                        style={{ marginBottom: "10px" }}
                        onClick={() => setShowCustomization(true)}
                      >
                        Customization <BiEdit />
                      </span>
                      {selectedCustomization.length != 0 ? (
                        <div className="">
                          <div className="bkngDetails">
                            <h6 className="bkngTitle">Title</h6>
                            <h6 className="bkngQnty">Quantity</h6>
                            <h6 className="bkngPrice">Price</h6>
                          </div>
                          {selectedCustomization.map((item, index) => {
                            return (
                              <>
                                <div key={index} className="bkngDetails2">
                                  <h6 className="bkngTitle">{item.title}</h6>
                                  <h6 className="bkngQnty">{item.quantity}</h6>
                                  <h6 className="bkngPrice">
                                    Rs {item.price}{" "}
                                  </h6>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      ) : (
                        <p>No Customization Added</p>
                      )}
                    </div>
                    <div className="customtotal">
                      <div className="customtotal1">
                        <span>Total</span>
                      </div>
                      <div className="customtotal1">
                        <span>Rs {totalPrice}</span>
                      </div>
                    </div>

                    <div
                      className="checkout"
                      onClick={() => booking()}
                      isLoading={isLoading}
                    >
                      <button type="button" className="ckBtn">
                        {isLoading ? (
                          <div class="spinner-border text-light" role="status">
                            <span class="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Checkout"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <Customization
                  showCustomization={showCustomization}
                  setShowCustomization={setShowCustomization}
                  selectedCustomization={selectedCustomization}
                  setSelectedCustomization={setSelectedCustomization}
                  selectedCustomizationId={selectedCustomizationId}
                  setSelectedCustomizationId={setSelectedCustomizationId}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  handleBookNow={handleBookNow}
                  packageIdd={packageIdd}
                />
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookNow;
