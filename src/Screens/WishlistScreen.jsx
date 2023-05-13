import React, { useState, useEffect } from "react";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import { useSelector, useDispatch } from "react-redux";
import Mainpart2 from "../Components/HomeScreenDetails/TaskBar/Mainpart2";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";
import WishlistData from "../Components/WishlistData/WishlistData";
import { callWishListData, updateWishList } from "../actions";
import axios from "axios";
import Footer2 from "../Components/Common/Footer/Footer2";

import { endpoints } from "../services/endpoints";
import Loader from "../utils/Loader";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";

const WishlistScreen = () => {

  const [showSideBar, setShowSideBar] = useState(false);
  const [updateLocation, setUpdateLocation] = useState(false);
  const dispatch = useDispatch();
  const [taskBarData, setTaskBarData] = useState([]);
  const dispath = useDispatch();
  const [wishListArray, setWishListArray] = useState([]);
  const [loading , setLoading] = useState(false);
  const access_token = localStorage.getItem("access_token");
  // const wishtListArray = useSelector(
  //   (state) => state.handleWishtListData.wishListArray
  // );

  // const wishListData = localStorage.getItem("wishListArray")
  // const wishtListArray = JSON.parse(wishListData);

  window.onload = function () {
    dispatch(callWishListData());
  };

  const wishListState = useSelector(
    (state) => state.handleWishtListData.status
  );

  useEffect(() => {
    const allWishtListUrl = endpoints.wishlist.allWishtList;

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${access_token}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://admin.xperienceit.in/api/user-wishlist", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res, "wishlist array here");
        if (res.status === true) {
          const val = res.body;
          setWishListArray(val);
          dispatch(updateWishList(val));
          localStorage.setItem("wishListArray", JSON.stringify(val));
        }
      })
      .catch((error) => console.log("error", error));
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
          <Booking2 updateLocation={updateLocation} />
          <WishlistData wishtListArray={wishListArray} />
        </header>
        <Footer2 />
      </div>
      {/* <StickyMenu /> */}
    </>
  );
};

export default WishlistScreen;
