//  This is the taskbar component which will be used in this project ;

import React from "react";
import "./Taskbar.css";
import Arrow from "./TaskBarImages/arrow.svg";
import MegaMenu from "../../Common/MegaMenu/MegaMenu";
import { useState, useEffect } from "react";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";

const TaskBar = (props) => {

  const [filterCategoryData, setFilterCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  // const [childCategoryData, setChildCatagoryData] = useState([]);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [categoryName  , setCategoryName] = useState("false")

  const handleMegaMenu = (selectedMenu) => {
    setShowMegaMenu(true);
  };

  const hideMegaMenu = () => {
    setShowMegaMenu(false);
    setCategoryName("")
  };
 
  const api = endpoints.home.filterCategory;

  useEffect(() => {

    const pkgLocation = localStorage.getItem("locationDetails");
    const cityLocattion = JSON.parse(pkgLocation);
    const cityID = cityLocattion && cityLocattion.id;
  
    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "credentials": 'same-origin'
    };

    if(cityID){
    axios
      .post(api,{location_id:cityID,headers:headers})
      .then((res) => {
        console.log(res, "Filter Category api");
        if (res.data.status===true) {
          const val = res.data.body;
          setFilterCategoryData(val);
        }
      })
      .catch((err) => {
        console.log(err, "Filter Category api not response here...");
      })}

  }, [props.updateLocation]);


  const openCategory = (subCatgory , name) => {
    setSubCategoryData(subCatgory);
    setShowMegaMenu(true);
    setCategoryName(name)
  };

  return (
    <>
      <div className="menu-bar d-lg-block d-none">
        <div className="container-fluid">
          <div className="taskbar">
          <h4 className="shape_hd mr-0">Pick Our Xperiences</h4>
          {/* <div className="tsklistCont"> */}
          <ul className="d-flex ml-0  pl-0 tskList">
          {filterCategoryData.map((item, index) => {
            return (
              <>
                <li onMouseOver={() => openCategory(item.sub_category , item.name)} onClick={() => openCategory(item.sub_category , item.name)}>
                  <h5 style={{color : categoryName == item.name ? "var(--yellow)" : "var(--gray)"}}>{item.name}</h5>
                  <img src={Arrow} alt="arrow icon" />
                </li>
              </>
            );
          })}
          </ul>
          {/* </div> */}

          <div className="megaMenuCont" onMouseLeave={hideMegaMenu}>
            <MegaMenu
              showMegaMenu={showMegaMenu}
              setShowMegaMenu={setShowMegaMenu}
              subCategoryData={subCategoryData}
            />
            
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

// exporting the taskbar ;
export default TaskBar;
