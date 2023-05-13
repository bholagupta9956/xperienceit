// This is the birthday gifts screen which we are going to create ;

import React, { useState,useEffect } from "react";
// import Navbar2 from "../Components/Common/Navbar/Navbar2";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import BirthdayBanner from "../Components/BirthdayGiftsDetails/BirthdayBanner";
import BirthdayCategory from "../Components/BirthdayGiftsDetails/BirthdayCategory";
import BirthdayBestSeller from "../Components/BirthdayGiftsDetails/BirthdayBestSeller";
import ComboGifts from "../Components/BirthdayGiftsDetails/ComboGifts";
import SidebarComponent from "../Components/Common/Sidebar/SidebarComponent";
import DigitalGifts from "../Components/BirthdayGiftsDetails/DigitalGifts";
import Footer2 from "../Components/Common/Footer/Footer2";
import Flowers from "../Components/BirthdayGiftsDetails/Flowers";
import GiftsPart from "../Components/BirthdayGiftsDetails/GiftsPart";
import Info from "../Components/BirthdayGiftsDetails/Info";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";

const BirthdayGiftsScreen = () => {
  const [updateLocation , setUpdateLocation] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="birthdayGifts">
        {/* <Navbar2 /> */}
        <Navebar3 updateLocation={updateLocation} setUpdateLocation={setUpdateLocation}
         showSideBar={showSideBar}
         setShowSideBar={setShowSideBar}
         taskBarData={taskBarData}
        />
        <TaskBar updateLocation={updateLocation} setTaskBarData={setTaskBarData}/>
        <BirthdayBanner />
        <BirthdayCategory />
        <BirthdayBestSeller />
        <Flowers />
        <ComboGifts />
        <DigitalGifts />
        <GiftsPart />
        <Info />
        <SidebarComponent />
        <Footer2/>
      </div>
      {/* <StickyMenu/> */}
    </>
  );
};

// exporting the component ;
export default BirthdayGiftsScreen;
