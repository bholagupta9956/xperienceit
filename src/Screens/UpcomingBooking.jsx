import React, { useState, useEffect } from "react";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import { useSelector, useDispatch } from "react-redux";
import Mainpart2 from "../Components/HomeScreenDetails/TaskBar/Mainpart2";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";
import WishlistData from "../Components/WishlistData/WishlistData";
import axios from "axios";
import UpcomingComp from "../Components/UpcomingComp/UpcomingComp";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import Footer2 from "../Components/Common/Footer/Footer2";

const UpcomingBooking = () => {
  
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);

  const [updateLocation, setUpdateLocation] = useState(false);
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://admin.xperienceit.in/api/upcoming-bookings";

  const access_token = localStorage.getItem("access_token");

  const getUpcomingBookingList = () => {
    const headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    };

    setLoading(true);

    axios
      .get(url, { headers: headers })
      .then((res) => {
        setLoading(false);
        if (res.data.status === true) {
          const val = res.data.body;
          setAllBookings(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is upcoming error");
      });
  };

  useEffect(() => {
    getUpcomingBookingList();
  }, []);

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
        <UpcomingComp
          allBookings={allBookings}
          getUpcomingBookingList={getUpcomingBookingList}
          loading={loading}
          setLoading={setLoading}
        />
        <Footer2 />
      </div>
      {/* <StickyMenu /> */}
    </>
  );
};

export default UpcomingBooking;
