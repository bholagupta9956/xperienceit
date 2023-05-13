// This is the navbar component of the project ;

import React, { useState } from "react";
import Logo from "./NavbarImages/logo.svg";
import Search from "./NavbarImages/search.svg";
import Marker from "./NavbarImages/pin.svg";
import Home from "./NavbarImages/home.svg";
import Contact from "./NavbarImages/phone.svg";
import Login from "./NavbarImages/login.svg";
import Experiences from "./NavbarImages/rings.svg";
import Gifts from "./NavbarImages/giftbox.svg";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { openAuthenication, showLocationPopup } from "../../../actions/index";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
// import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import AuthPopup from "../Authenication/AuthPopup";
import Location from "../ChooseLocation/Location";
// import Menu from "./NavbarImages/menu.png";
import SidebarComponent from "../Sidebar/SidebarComponent";
import Profile from "../Profile/Profile";
import User from "../../../assets/icons/user.png";

const Navbars = (props) => {
  
  const { showSideBar, setShowSideBar } = props;

  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const { t } = useTranslation("translation");
  const userLocation = useSelector((state) => state.NormalRecord.location);

  const [openSideBar, setOpenSideBar] = useState(false);

  const handleSideBar = () => {
    setOpenSideBar(true);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar_left laptop_nav">
          <div className="navbar_logo">
            <img src={Logo} alt="logo icon" />
          </div>
          <div className="navbar_search">
            <input
              type="text"
              placeholder="Search decor , gifts , surprises etc."
            />
            <div className="navbar_search_img">
              <img src={Search} alt="search icon" />
            </div>
          </div>
          <div
            className="navbar_location"
            onClick={() => setShowLocation(true)}
          >
            <img src={Marker} alt="marker icon" />
            <h6>{userLocation}</h6>
          </div>

          <div className="navbar_left_login">
            <img src={Login} alt="login icon" />
            <span>{t("login")}</span>
          </div>
        </div>
        <div className="navbar_right laptop_nav">
          <NavLink to="/" style={{ textDecoration: "none" }}>
            <li>
              <img src={Home} alt="home icon" />
              <h5>{t("home")}</h5>
            </li>
          </NavLink>
          <NavLink to="/birthdayGifts" style={{ textDecoration: "none" }}>
            <li>
              <img src={Gifts} alt="gifts icon" style={{ width: "20px" }} />
              <h5>{t("gifts")}</h5>
            </li>
          </NavLink>

          <li>
            <img src={Experiences} alt="rings icon" style={{ width: "20px" }} />
            <h5>Marriage</h5>
          </li>

          <li>
            <img src={Contact} alt="contact icon" />
            <h5>{t("contacts")}</h5>
          </li>

          {/* <div
            className="navbar_right_login"
            onClick={() => setShowAuthPopup(true)}
          >
            <img src={Login} alt="login icon" />
            <span>{t("login")}</span>
          </div> */}

          <div className="userProfileImg" onClick={() => setShowProfile(true)}>
            <img src={User} alt="logo icon" />
          </div>
        </div>

       

        {/* here we are adding all the popup which is related to the navbar  */}

        <AuthPopup
          showAuthPopup={showAuthPopup}
          setShowAuthPopup={setShowAuthPopup}
        />
        <Location
          showLocation={showLocation}
          setShowLocation={setShowLocation}
        />

        <Profile showProfile={showProfile} setShowProfile={setShowProfile} />

        {/* here we are adding the sidebar  */}
        <SidebarComponent/>
      </div>
    </>
  );
};

// exporting the  navbar component ;
export default Navbars;
