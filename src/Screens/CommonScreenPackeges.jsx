import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import CommanViewPages from "../Components/Anniversary/CommanViewPages";
import CommanViewPages2 from "../Components/Anniversary/CommanViewPages2";
import Footer2 from "../Components/Common/Footer/Footer2";
// import Navbar2 from "../Components/Common/Navbar/Navbar2";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import "./screen.css";

const CommonScreenPakeges = () => {
  
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [showPackeges, setShowPackeges] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  // const packges = location.state.allpackeges;
  // console.log(packges, "allpackeges");
  // const packgesID = packges.id;
  // console.log(packgesID,"packages available here...")
  // const packageName=packges.name;

  const {
    sub_category_id,
    sub_category_name,
    child_category_id,
    child_category_name,
  } = useParams();
  const packgesID = child_category_id;

  const packageName = child_category_name;
  
  useEffect(() => {
    const api = `https://admin.xperienceit.in/api/getPackageByChildCategory?package_child_id=${packgesID}`;
    // const api = `https://admin.xperienceit.in/api/getPackageBySubCategory?package_subcat_id=${packgesID}`;

    setLoading(true);

    axios
      .get(api)
      .then((res) => {
        if (res.data.status === true) {
          setLoading(false);
          const val = res.data.body;
          console.log(val, "Package Response hgjdgSKLdsflg;");
          setShowPackeges(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error(err, "Package Response Error");
      });

  }, [packgesID]);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);


  return (
    <>
      <div className="Aniversary_screen">
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
        <CommanViewPages2
          showPackeges={showPackeges}
          packageName={packageName}
          sub_category_id={sub_category_id}
          sub_category_name={sub_category_name}
          loading={loading}
        />
        <Footer2 />
      </div>
      {/* <StickyMenu /> */}
    </>
  );
};

export default CommonScreenPakeges;
