import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CategoriesPackeges from "../Components/CategoriesPackeges/CategoriesPackeges";
import "./screen.css";
import Footer2 from "../Components/Common/Footer/Footer2";

import Banner from "../Components/HomeScreenDetails/Banner/Banner";
import Booking from "../Components/HomeScreenDetails/Booking/Booking";
import Services2 from "../Components/HomeScreenDetails/Services/Services2";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import Testimonial2 from "../Components/HomeScreenDetails/Testimonial/Testimonial2";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import Banner2 from "../Components/HomeScreenDetails/Banner/Banner2";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import Booking2 from "../Components/HomeScreenDetails/Booking/Booking2";


const CategoriesPackegesScreen = () => {

  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [showCategoryPack, setShowCategoryPack] = useState([]);
  const [loading , setLoading ] = useState(false);
  const location = useLocation();

  const { category_name, category_id,package_child_id } = useParams();


  useEffect(() => {

    setLoading(true)

    const api = `https://admin.xperienceit.in/api/getPackageByCategory?package_parent_id=${category_id}`;
    
    // const api = `https://admin.xperienceit.in/api/getPackageByCategory?package_child=${packageChildId}`;
    axios
      .get(api)
      .then((res) => {
        setLoading(false)
        if (res.data.status === true) {
          const val = res.data.body;
          setShowCategoryPack(val);
        }
      })
      .catch((err) => {
        setLoading(false)
        console.log(err, "Category Api All Packages Failed");
      });
  }, [category_id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  return (
    <>
      <div className="Category_screen">
        {/* <Navbar2 /> */}
        <Navebar3
          updateLocation={updateLocation}
          setUpdateLocation={setUpdateLocation}
          showSideBar={showSideBar}
            setShowSideBar={setShowSideBar}
            taskBarData={taskBarData}
        />
        <TaskBar updateLocation={updateLocation} setTaskBarData={setTaskBarData} />
       
        <Booking2 updateLocation={updateLocation}/>

        <CategoriesPackeges
          showCategoryPack={showCategoryPack}
          categoryName={category_name}
          category_id={category_id}
          package_child_id={package_child_id}
          loading={loading}
        />

        <Banner2/>
        <Testimonial2 />
        <Services2/>
        <Footer2 />
      </div>
      {/* <StickyMenu/> */}
    </>
  );
};

export default CategoriesPackegesScreen;
