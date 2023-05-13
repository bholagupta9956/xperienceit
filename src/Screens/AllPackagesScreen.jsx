import axios from "axios";
import React, { useEffect, useState } from "react";
import AllPackages from "../Components/AllPackages/AllPackages";
import Footer2 from "../Components/Common/Footer/Footer2";
// import Navbar2 from "../Components/Common/Navbar/Navbar2";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import Banner from "../Components/HomeScreenDetails/Banner/Banner";
import Banner2 from "../Components/HomeScreenDetails/Banner/Banner2";
import Booking from "../Components/HomeScreenDetails/Booking/Booking";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";
import Services2 from "../Components/HomeScreenDetails/Services/Services2";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import { endpoints } from "../services/endpoints";


const AllPackagesScreen=()=>{
    const [showSideBar, setShowSideBar] = useState(false);
    const [taskBarData, setTaskBarData] = useState([]);
    const [updateLocation , setUpdateLocation] = useState(false);
    const [showAllChildCategory,setShowAllChildCategory]=useState([]);
    const api=endpoints.home.getAllChildCategory;
    
     useEffect(()=>{
    axios
    .get(api)
    .then((res)=>{
       // console.log(res,"Show All Child  Category Data ")
        if(res.data.status===true){
            const val=res.data.body;
            setShowAllChildCategory(val);
        }
    })
    .catch((err)=>{
        console.error(err,"All Child Category Data Not Found")
    })

     },[])

     useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);

    return(
        <>
    <div className="AllPackges_Screen">
       
        <Navebar3 updateLocation={updateLocation} setUpdateLocation={setUpdateLocation}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        taskBarData={taskBarData}
        />
        <TaskBar updateLocation={updateLocation}  setTaskBarData={setTaskBarData}/>
        {/* <Booking/> */}
        <Booking2 updateLocation={updateLocation}/>
        <AllPackages showAllChildCategory={showAllChildCategory}/>
        {/* <Banner/> */}
        <Banner2/>
        <Services2/>
        <Footer2/>
    </div>
{/* <StickyMenu/> */}
        </>
    );
}
export default AllPackagesScreen;