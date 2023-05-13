// This is the component which will show you the locations which you want to choos e;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Flag from "./locationImages/flag.svg";
import Search from "./locationImages/search.svg";
import Cut from "./locationImages/cut.svg";
import Left from "./locationImages/left.png";
import Right from "./locationImages/right.png";
import "./Location.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import {GrFormClose} from "react-icons/gr"
import { useHistory } from "react-router-dom";

const Location = (props) => {

  const { showLocation, setShowLocation , updateLocation , setUpdateLocation} = props;

  const history = useHistory();
  const dispatch = useDispatch();

  const [city, setCity] = useState([]);
  const [searchCity, setSearchCity] = useState("");

  const renderToLocation = (item) => {
    localStorage.setItem("locationDetails", JSON.stringify(item));
    setShowLocation(false);
    setUpdateLocation(!updateLocation);
    history.push("/")
    window.location.reload();
  };

  const getCity = () => {
    const cityUrl = endpoints.home.location;
    const headers = {
      "Content-Type": "application/json",
     
    };
    axios
      .get(cityUrl,{headers:headers})
      .then((res) => {
        console.log(res, " Location Available here....");
        if (res.data.status === true) {
          const value = res.data.body;
          setCity(value);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error which we are getting here");
      });
  };

  useEffect(() => {
    getCity();
  }, []);

  const changeHandler = (e) => {
    console.log(e.target.value);
    const value = e.target.value;
    dispatch(updateLocation(value));
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchCity(val);

    if (val === "") {
      getCity();
    } else {
      const filteredCity = city.filter((cityname, index) => {
        return cityname.name.toLowerCase().indexOf(val.toLowerCase()) !== -1;
      });
      setCity(filteredCity);
    }
  };


  const locationData = localStorage.getItem("locationDetails")
  return (
    <>
      <Modal
        show={showLocation}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <div className="chlocations">
          <div className="modal-location-header">
          <h3 className="chtxt">Choose City have XperienceIt</h3>
          </div>
          <div className="location_places">
        <div className="text-center"><span>Find more than 3000 decorations, gifts and surprises!</span></div>  
            <div className="_city-selection-container-flex">
            
            {city.map((item, index) => {
              return (
                <>
                  <div
                    className="_city-selection-container-row move-above-on-hover"
                    key={index}
                    name="location"
                    onClick={() => renderToLocation(item)}
                  >
                    <label htmlFor={item.name}>
                      <img
                        className="cityimg"
                        src={item.image_id}
                        height="50px"
                        width="50px"
                        alt=""
                      />
                      <h6 style={{ marginTop: "5px" }} className="location-city-name">{item.name}</h6>
                    </label>
                  </div>
                </>
              );
            })}
          </div>
          </div>

          {locationData && 
          <div
            className="location_cut"
            onClick={() => setShowLocation(false)}
            style={{ cursor: "pointer" }}
          >
            <GrFormClose size={29}/>
          </div>}

          {/* <img src={Left} alt="left icon" className="location_left" />
           <img src={Right} alt="right icon" className="location_right" /> */}
        
        


        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default Location;
