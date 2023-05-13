// This is the birthday surprises which we are going to design here ;
import React, { useState,useEffect } from "react" ;
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import BirthdayBanner from "../Components/BirthdaySurprises/BirthdayBanner";
import BirthdayTaskBar from "../Components/BirthdaySurprises/BirthdayTaskBar";
import PopupHandler from "./PopupHandler";
import Footer2 from "../Components/Common/Footer/Footer2";
import "./screen.css";
// import Location from "../Components/Common/ChooseLocation/Location";
// import Navbar2 from "../Components/Common/Navbar/Navbar2";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";


const BirthdayScreen = () =>{
    const [updateLocation , setUpdateLocation] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

    return (<>
    <div className="BirthdayScreen">
    {/* <Navbar2/> */}
    <Navebar3 updateLocation={updateLocation} setUpdateLocation={setUpdateLocation}
    showSideBar={showSideBar}
    setShowSideBar={setShowSideBar}
    taskBarData={taskBarData}
    />
    <TaskBar updateLocation={updateLocation}  setTaskBarData={setTaskBarData}/>
    <BirthdayBanner/>
    <BirthdayTaskBar/>
    <Footer2/>
    <PopupHandler/>
    </div>
    {/* <StickyMenu/> */}
    </>)
}


// exporting the birthday screen ;
export default BirthdayScreen ;