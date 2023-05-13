// This is the product screen ;
import React, { useEffect, useState } from "react";
// import Navbar2 from "../Components/Common/Navbar/Navbar2";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import ProductCarousel from "../Components/ProductScreenDetails/ProductCarousel";
import ProductPart2 from "../Components/ProductScreenDetails/ProductsPart2";
import Footer2 from "../Components/Common/Footer/Footer2";
import PopupHandler from "./PopupHandler";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generatePath, useLocation, useParams } from "react-router-dom";
import Enquiry from "../Components/Enquiry/Enquiry";
import Customization from "../Components/Customization/Customization";
import { useHistory } from "react-router-dom";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import ProductStickBar from "../Components/ProductScreenDetails/ProductStickBar";


const ProductScreen = () => {

  const [productDetails, setProductDetails] = useState([]);
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
  const [pincode, setPincode] = useState([]);
  const [timeSlot, setTimeSlot] = useState([]);
  const [offerAmount, setOfferAmount] = useState();
  const [deliveryCharge, setDeliveryCharge] = useState();
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelecetedTimeSlot] = useState("");
  const [selectedTimeSlotId, setSelecetedTimeSlotId] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState([]);
  const [customization, setCustomization] = useState([]);
  const [selectedCustomizationId, setSelectedCustomizationId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [packagePrice, setPackagePrice] = useState(0);
  const [showMoreReview , setShowMoreReview] = useState(false)
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [gstPrice, setGstPrice] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [allReviews,setAllReviews]=useState([]);
  const history = useHistory();
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const [experienceVideo, setExperienceVideo] = useState("");
  const [reviewCount, setReviewCount] = useState("");
  const [poductCategoryTitle, setPoductCategoryTitle] = useState("");
  const [gstPercent , setGstPercent] = useState("");
  const location = useLocation();

  const { sub_category_name, sub_category_id, package_name, package_id } =
    useParams();

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const cityID = cityLocattion && cityLocattion.id;

  const [updateLocation, setUpdateLocation] = useState(false);

  const api = `https://admin.xperienceit.in/api/getDetailPackage?id=${package_id}`;

 // here we are getting the customization data ;

  const getCustomization = () => {
    const data = {
      package_id: package_id,
    };

    const api = "https://admin.xperienceit.in/api/customization-details";
    axios
      .post(api, data)
      .then((res) => {
        if (res.data.status === true) {
          const val = res.data.body;
          setCustomization(val);
        } else if (res.data.status === false) {
          toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, " Customize data not found");
      });
  };


  useEffect(() => {
    axios
      .get(api)
      .then((res) => {
        if (res.data.status === true) {
          console.log(res , "response here")
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
          setGstPercent(res.data.body[0]?.gst)
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

    getCustomization();
  }, []);

  const pincodeapi = ` https://admin.xperienceit.in/api/get-pincode`;

  useEffect(() => {
    const data = {
      package_id: package_id,
      city_id: cityID,
    };

    axios
      .post(pincodeapi, data)
      .then((res) => {
        console.log(res, "pincode response here");
        if (res.data.status === true) {
          const val = res.data.body;
          setPincode(val);
          // toast(res.data.message, { type: "success" });
        } else if (res.data.status === false) {
          toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  }, []);

  const timesApi = `https://admin.xperienceit.in/api/package-timeslot`;

  useEffect(() => {

    const tsData = {
      package_id: package_id,
      pincode: selectedPincode,
    };

    if (selectedPincode) {
      axios
        .post(timesApi, tsData)
        .then((res) => {
          if (res.data.status === true) {
            const val = res.data.body[0].time;
            setTimeSlot(val);
            // toast(res.data.message, { type: "success" });
          } else if (res.data.status === false) {
            // toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          console.log(err, "Timse Slot not found");
        });
    }
  }, [selectedPincode]);


  //package booking procedure ;

  const bookPackage = () => {
    if (selectedPincode === "") {
      toast("Pincode is required", { type: "warning" });
    } else if (selectedDate === "") {
      toast("Date is required", { type: "warning" });
    } else if (selectedTimeSlot === "") {
      toast("Time is required", { type: "warning" });
    } else {
      setShowCustomization(true);
    }
  };

  //here we are going through the booking procedure ;
  const handleBookNow = () => {

    const val = {
      cityId: cityID,
      objectId: package_id,
      pincode: selectedPincode,
      customizationDetails: selectedCustomization,
      timeslotId: selectedTimeSlotId,
      booking_date: selectedDate,
      offer_amount: offerAmount,
      totalPrice: totalPrice,
      timeslot: selectedTimeSlot,
      packagePrice: packagePrice,
      gstPrice: gstPrice,
      productTitle: productTitle,
      deliveryCharge: deliveryCharge,
      gstPrice: gstPrice,
      gstPercent : gstPercent,
      productTitle: productTitle,
      deliveryCharge: deliveryCharge,
      img: productGalary[0],
      packageIdd: package_id,
      selectedCustomization: selectedCustomization,
      selectedCustomizationId: selectedCustomizationId,
    };

    const path = generatePath(
      "/experiences/booking/:location/:parent_name/:parent_id/:package_name/:package_id",
      {
        location: cityLocattion.name,
        parent_name: sub_category_name,
        parent_id: sub_category_id,
        package_name: package_name,
        package_id: package_id,
      }
    );

    history.push(path, { bookingDetails: val });
  };

  //Review api intigration;

  const reviewapi = `https://admin.xperienceit.in/api/review-by-package?package_id=${package_id}`;

  const getReview = () => {
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
    getReview();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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

  return (
    <>
      <div className="productScreens">
        {/* <Navbar2 /> */}
        <Navebar3
          updateLocation={updateLocation}
          setUpdateLocation={setUpdateLocation}
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          taskBarData={taskBarData}
        />
        <TaskBar
          updateLocation={updateLocation}
          setTaskBarData={setTaskBarData}
        />
        <ProductCarousel productBanner={productBanner} />
        <ProductPart2
          productTitle={productTitle}
          titleContent={titleContent}
          cancellationPolicy={cancellationPolicy}
          refundPolicy={refundPolicy}
          termCondition={termCondition}
          faq={faq}
          readLessReview={readLessReview}
          showMoreReview={showMoreReview}
          productRating={productRating}
          productGalary={productGalary}
          readMoreReview={readMoreReview}
          arrangment={arrangment}
          note={note}
          setTimeSlot={setTimeSlot}
          pincode={pincode}
          selectedPincode={selectedPincode}
          setDeliveryCharge={setDeliveryCharge}
          setSelectedPincode={setSelectedPincode}
          timeSlot={timeSlot}
          selectedTimeSlotId={selectedTimeSlotId}
          bookPackage={bookPackage}
          getReview={getReview}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTimeSlot={selectedTimeSlot}
          setSelecetedTimeSlot={setSelecetedTimeSlot}
          setSelecetedTimeSlotId={setSelecetedTimeSlotId}
          reviews={reviews}
          deliveryCharge={deliveryCharge}
          packagePrice={packagePrice}
          packageIdd={package_id}
          discountedPrice={discountedPrice}
          setTotalPrice={setTotalPrice}
          totalPrice={totalPrice}
          gstPrice={gstPrice}
          exclusion={exclusion}
          reviewCount={reviewCount}
          experienceVideo={experienceVideo}
          poductCategoryTitle={poductCategoryTitle}
        />

        <Customization
          showCustomization={showCustomization}
          setShowCustomization={setShowCustomization}
          customization={customization}
          selectedCustomization={selectedCustomization}
          setSelectedCustomization={setSelectedCustomization}
          selectedCustomizationId={selectedCustomizationId}
          setSelectedCustomizationId={setSelectedCustomizationId}
          totalPrice={totalPrice}
          setTotalPrice={setTotalPrice}
          handleBookNow={handleBookNow}
          packageIdd={package_id}
        />

        <Footer2 />
        <PopupHandler />
        <ToastContainer limit={1} />
        <Enquiry showEnquiry={showEnquiry} setShowEnquiry={setShowEnquiry} />
      </div>
     {/* <StickyMenu/> */}
    </>
  );
  }
  
export default ProductScreen;
