// In the component a model will be created which will allow the user for selecting the booking types ;

import React, { useEffect, useState } from "react";
import "./Xperience.css";
import { Modal } from "react-bootstrap";
import Cut from "./XperienceImages/cut.svg";
import { useHistory } from "react-router-dom";
import Search from "./XperienceImages/search.svg";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { toast } from "react-toastify";
import { generatePath } from "react-router-dom";

const XperienceSelect = (props) => {
  const [subcategory, setsubCategory] = useState([]);
  const [allSubCategory, setAllSubCategory] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const history = useHistory();
  const [filterCategoryData, setFilterCategoryData] = useState([]);
  const { showXperienceSelect, setShowXperienceSelect } = props;
  const [inputValue, setInputValue] = useState("");

  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const cityID = cityLocattion && cityLocattion.id;

  const renderToSubCategory = (data) => {
    const name = data.name;
    const subCategoryName = name.replaceAll(" ", "-");

    const path = generatePath(
      "/experiences/:location/subCategory/:subCategory_name/:subCategory_id",
      {
        subCategory_name: subCategoryName,
        location: cityLocattion.name,
        subCategory_id: data.id,
      }
    );

    history.push(path);

    //  history.push('/subcategories_packages', {subcatData: data});
  };

  const api = endpoints.home.filterCategory;

  useEffect(() => {
    const pkgLocation = localStorage.getItem("locationDetails");
    const cityLocattion = JSON.parse(pkgLocation);
    const cityID = cityLocattion && cityLocattion.id;

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      credentials: "same-origin",
    };

    if (cityID) {
      setsubCategory([]);
      axios
        .post(api, { location_id: cityID, headers: headers })
        .then((res) => {
          if (res.data.status === true) {
            const val = res.data.body;
            console.log(val , "value here")
            setFilterCategoryData(val);
            val.map((itm, idx) => {
              {
                itm.sub_category.length != 0 &&
                  itm.sub_category.map((item, index) => {
                    setsubCategory((itmm, index) => {
                      return [...itmm, item];
                    });

                    setAllSubCategory((itmm, index) => {
                      return [...itmm, item];
                    });
                  });
              }
            });
          } else if (res.data.status === false) {
            // toast("", { type: "errors" });
          }
        })
        .catch((err) => {
          console.log(
            err,
            "Select Experince Filter Category api not response here..."
          );
        });
    }
  }, [props.updateLocation]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInputValue(val);

    const filterSubCategory = allSubCategory.filter((itm, index) => {
      return itm.name.toLowerCase().includes(val.toLowerCase());
    });
    setsubCategory(filterSubCategory);
  };

  return (
    <>
      <Modal
        show={showXperienceSelect}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <div className="xperience">
          <div className="xperience_header">
            <h5>Select Xperience</h5>
            <div className="xperience_header_search">
              <img src={Search} alt="search icon" />
              <input
                type="text"
                placeholder="Search Xperience"
                value={inputValue}
                onChange={(e) => handleInput(e)}
              />
            </div>
          </div>

          <div className="xperience_main">
            {}

            {subcategory.length != 0 &&
              subcategory.map((item, index) => {
                return (
                  <>
                    <div
                      className="xperience_main_row"
                      onClick={() => renderToSubCategory(item)}
                    >
                      <img src={item.image_id} alt="icons" />
                      <h6>{item.name}</h6>
                    </div>
                  </>
                );
              })}

            {/* adding cut options here */}
            <div
              className="xperience_cut"
              onClick={() => setShowXperienceSelect(false)}
            >
              <img src={Cut} alt="cut icon " />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default XperienceSelect;
