import React, { useState, useEffect } from "react";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import { useSelector, useDispatch } from "react-redux";
import Mainpart2 from "../Components/HomeScreenDetails/TaskBar/Mainpart2";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";
import WishlistData from "../Components/WishlistData/WishlistData";
import PastComingcomp from "../Components/PastComingcomp/PastComingcomp";
import axios from "axios";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";

const PastBookingScreen = () => {

  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const [updateLocation, setUpdateLocation] = useState(false);
  const dispatch = useDispatch();
 

  const [allBookings, setAllBookings] = useState([]);

  const url = "https://admin.xperienceit.in/api/past-bookings";

  const access_token = localStorage.getItem("access_token");

  const getPastBookingList = () => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    axios
      .get(url, { headers: headers })
      .then((res) => {
        console.log(res , "response here")
        if (res.data.status === true) {
          const val = res.data.body;
          setAllBookings(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is upcoming error");
      });
  };

  useEffect(() => {
    getPastBookingList();
  },[]);

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
          taskBarData={taskBarData}
          updateLocation={updateLocation}
          setUpdateLocation={setUpdateLocation}
        />
        <TaskBar updateLocation={updateLocation} setTaskBarData={setTaskBarData}/>
      </header>
      <PastComingcomp allBookings={allBookings} />
    </div>
   {/* <StickyMenu/> */}
    </>
  );
};

export default PastBookingScreen;
