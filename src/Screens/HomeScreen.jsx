// This is home page of the project ;

import React, { useState, useEffect } from "react";
import "./screen.css";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import Services2 from "../Components/HomeScreenDetails/Services/Services2";
import { endpoints } from "../services/endpoints";
import axios from "axios";
import Footer2 from "../Components/Common/Footer/Footer2";
import Mainpart2 from "../Components/HomeScreenDetails/TaskBar/Mainpart2";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";
import BestSellerCategory2 from "../Components/HomeScreenDetails/BestSellerCategory/BestSellerCategory2";
import Banner2 from "../Components/HomeScreenDetails/Banner/Banner2";
import TourPanel2 from "../Components/HomeScreenDetails/TourPanel/TourPanel2";
import Testimonial2 from "../Components/HomeScreenDetails/Testimonial/Testimonial2";
import BestSeller2 from "../Components/HomeScreenDetails/BestSeller/BestSeller2";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import { updateWishList } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../utils/Loader";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import Booking from "../Components/HomeScreenDetails/Booking/Booking";
import BestSellar3 from "../Components/HomeScreenDetails/BestSeller/BestSellar3";

const HomeScreen = () => {
  const [showListData, setShowListData] = useState([]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [updateLocation, setUpdateLocation] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [taskBarData, setTaskBarData] = useState([]);

  const api = endpoints.home.homeScreen;

  useEffect(() => {
    const pkgLocation = localStorage.getItem("locationDetails");
    const cityLocattion = JSON.parse(pkgLocation);
    const cityID = cityLocattion && cityLocattion.id;

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
    };

    setLoading(true);

    if (cityID) {
      axios
        .post(api, { location_id: cityID, headers: headers })
        .then((res) => {
          setLoading(false);
          if (res.data.status === true) {
            const val = res.data.body;
            setShowListData(val);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, " home Screen Listed Api data not found");
        });
    }
  }, [updateLocation]);

  // writing code for getting the wishlist data and will be store in the redux ;

  const access_token = localStorage.getItem("access_token");

  const wishListState = useSelector(
    (state) => state.handleWishtListData.status
  );

  useEffect(() => {
    const allWishtListUrl = endpoints.wishlist.allWishtList;

    if (access_token) {
      const headers = {
        Authorization: `Bearer ${access_token}`,
      };

      axios
        .post(allWishtListUrl, { headers: headers })
        .then((res) => {
          if (res.data.status === true) {
            const val = res.data.body;
            dispatch(updateWishList(val));
            localStorage.setItem("wishListArray", JSON.stringify(val));
          }
        })
        .catch((err) => {
          console.log(err, "this is the error");
        });
    }
  }, [wishListState]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="homeScreen">
        <header className="header">
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
        </header>
        <Mainpart2 updateLocation={updateLocation} />
        {/* <Booking updateLocation={updateLocation}/> */}
        <Booking2 updateLocation={updateLocation} />
        {/* <BestSeller2 /> */}
        <BestSellar3 />
        <BestSellerCategory2 showListData={showListData} loading={loading} />
        <Banner2 />
        <TourPanel2 />
        <Testimonial2 />
        <Services2 />
        <Footer2 />
        {/* {loading && <Loader/>} */}
      </div>
      {/* <StickyMenu /> */}
    </>
  );
};

// exporting the homebar component ;
export default HomeScreen;
