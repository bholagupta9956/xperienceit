import React, { useState,useEffect } from "react";
import AllPackagesDetails from "../Components/AllPackagesDetails/AllPackagesDetails";
import Footer2 from "../Components/Common/Footer/Footer2";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import Banner from "../Components/HomeScreenDetails/Banner/Banner";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";
import Services2 from "../Components/HomeScreenDetails/Services/Services2";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";


const AllPackageDetailsScreens = () => {
  
  const [updateLocation, setUpdateLocation] = useState(false);
  const pkgLocation = localStorage.getItem("locationDetails");
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const cityLocattion = JSON.parse(pkgLocation);
  const city = cityLocattion && cityLocattion.name;
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="AllPkgDetails_Screen">
        <Navebar3
          updateLocation={updateLocation}
          setUpdateLocation={setUpdateLocation}
          showSideBar={showSideBar}
          setShowSideBar={setShowSideBar}
          taskBarData={taskBarData}
        />
        <TaskBar updateLocation={updateLocation} 
         setTaskBarData={setTaskBarData}
        />
        <Booking2 updateLocation={updateLocation}/>
        <AllPackagesDetails updateLocation={updateLocation} />
        {/* <Banner/> */}
        <Services2 />
        <Footer2 />
      </div>
      {/* <StickyMenu/> */}
    </>
  );
};

export default AllPackageDetailsScreens;
