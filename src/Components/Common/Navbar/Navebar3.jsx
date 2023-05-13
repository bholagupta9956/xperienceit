
import React, { useEffect, useState } from "react";
import Logo from "./NavbarImages/Layer2.png";
import User from "../../../assets/icons/user.png";
import { useTranslation } from "react-i18next";
import AuthPopup from "../Authenication/AuthPopup";
import Location from "../ChooseLocation/Location";
import SidebarComponent from "../Sidebar/SidebarComponent";
import Profile from "../Profile/Profile";
import { useHistory, generatePath } from "react-router-dom";
import i18n from "../../../i18n";
import { HiOutlineLogout } from "react-icons/hi";
import { toast } from "react-toastify";
import { BiMap } from "react-icons/bi";
import "./Navbar3.css";
import { FaSearch, FaUser } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineHome, AiOutlineGift } from "react-icons/ai";
import { GiBigDiamondRing } from "react-icons/gi";
import { IoMdLogIn, IoIosCall } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import $ from "jquery";
import Navbar2 from "./Navbar2";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import TaskBar from "../../HomeScreenDetails/TaskBar/TaskBar";
import { HiClock } from "react-icons/hi";
import { HiClipboardCopy } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import StickyMenu from "./StickyMenu";
import MarriageForm from "../../MarriageForm/MarriageForm";
import MarriageEnquiry from "../../MarriageForm/MarriageEnquiry";


const Navebar3 = (props) => {

  const { updateLocation, setUpdateLocation, taskBarData } = props;
  const history = useHistory();
  const sLocat = localStorage.getItem("locationDetails");
  const selectedLocation = JSON.parse(sLocat);
  const [userProfile, setUserProfile] = useState("");
  const [showMarriageForm , setShowMarriageForm] = useState(false)
  const { showSideBar, setShowSideBar } = props;

  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [mapIconColor , setMapIconColor] = useState("#663399");
  const [showLocation, setShowLocation] = useState(
    selectedLocation ? false : true
  );
  const [showProfile, setShowProfile] = useState(false);
  const { t } = useTranslation("translation");
  const [userLogedIn, setUserLogedIn] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [authScreen, setAuthScreen] = useState("loginWithOtp");
  const [allPackage, setAllPackage] = useState([]);
  const [allPackageData, setAllPackageData] = useState([]);
  const [packageName, setPackageName] = useState("");
  const [showSearchPkgBox, setShowSearchPkgBox] = useState(false);
  const pkgLocation = localStorage.getItem("locationDetails");
  const cityLocattion = JSON.parse(pkgLocation);
  const [userImg, setUserImg] = useState("");

  const accessToken = localStorage.getItem("access_token");
  const [openSideBar, setOpenSideBar] = useState(false);

  const handleSideBar = () => {
    setShowSideBar(true);
  };

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  

  document.addEventListener("click", () => {
    if(window.innerWidth > 992){
    setIsHovering(false);
    }
  });

  const logOut = () => {
    localStorage.removeItem("access_token");
    setUserLogedIn(false);
    toast("Logout Successfully" , {type : "success"});
    history.push("./");
    setAuthScreen("loginWithOtp");
  };

  useEffect(() => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
        $("#header-container").addClass("fixed-header");
      } else {
        $("#header-container").removeClass("fixed-header");
      }
    });
  });

  useEffect(() => {
    const allPackageUrl = endpoints.home.filterCategory;
    const cityID = cityLocattion && cityLocattion.id;

    const val = {
      location_id: cityID,
    };

    axios
      .post(allPackageUrl, val)
      .then((res) => {
        if (res.data.status === true) {
          const val = res.data.body;

          const subCategory = val.map((itm, index) => {
            return itm.sub_category;
          });

          var childCateryArry = [];

          for (var i = 0; i < subCategory.length; i++) {
            const childCategory = subCategory[i];
            for (var l = 0; l < childCategory.length; l++) {
              const chldCategory = childCategory[l];
              for (var j = 0; j < chldCategory.child_category.length; j++) {
                const ddd = chldCategory.child_category[j];
                if (ddd) {
                  // console.log(ddd , "ddd ")
                  childCateryArry.push(ddd);
                }
              }
            }
          }

          setAllPackage(childCateryArry);
          setAllPackageData(childCateryArry);
        }
      })
      .catch((err) => {
        console.log(err, "all package error");
      });
  }, [updateLocation]);

  const handlePackageSearch = (e) => {
    setShowSearchPkgBox(true);

    setPackageName(e.target.value);
    const val = e.target.value.toLowerCase();

    const filterPkg = allPackage.filter((itm, ind) => {
      return itm.name.toLowerCase().includes(val);
    });

    setAllPackageData(filterPkg);

    if (val === "") {
      setAllPackageData(allPackage);
    }
  };

  document.addEventListener("click", () => {
    setShowSearchPkgBox(false);
  });

  const handleSelectedPackage = (data) => {

    const name = data.subcategory_nm
    ;
    const subCategoryName = name.replaceAll(" ", "-");
    const path = generatePath(
      "/experiences/:location/subCategory/:subCategory_name/:subCategory_id",
      {
        subCategory_name: subCategoryName,
        location: cityLocattion.name,
        subCategory_id: data.subcategory_id ,
      }
    );

    history.push(path, { allpackeges: data });
  };

  // handing gifts part;

  const handleGifts = () => {
    const path = generatePath(
      "/experiences/:location/category/:category_name/:category_id",
      {
        category_name: "Gifts-&-Surprises",
        location: selectedLocation.name,
        category_id: "7",
      }
    );

    history.push(path);
  };


  return (
    <>
      <div className="container-fluid header-container" id="header-container">
        <div className="header-section">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-2">
              <div className="seach-with-log">
                <a className="navbar-brand" href="/">
                  <img
                    src={Logo}
                    alt="logo icon"
                    height={70}
                    width={70}
                    className="logo"
                    onClick={() => history.push("/")}
                    style={{zIndex : 1000}}
                  />
                </a>
                <div className="form-inline for_desktop">
                  <div className="input-group search">
                    <input
                      type="text"
                      class="form-control serchPackages"
                      placeholder="Search..."
                      value={packageName}
                      onChange={(e) => handlePackageSearch(e)}
                    />
                    <span className="input-group-btn srchBtn">
                      <button className="btn btn-default srchBtn" type="button">
                        <i
                          className="glyphicon  srchBtn"
                        >
                          <FaSearch />
                        </i>
                      </button>
                    </span>

                    {showSearchPkgBox === true && (
                      <div className="searchRslt">
                        {allPackageData.length != 0 ? allPackageData.map((itm, ind) => {
                          return (
                            <>
                              <span onClick={() => handleSelectedPackage(itm)}>
                                {itm.name}
                              </span>
                            </>
                          ) 
                        } ) : <span >No package found !</span>}
                        <h6></h6>
                      </div>
                    ) }
                  </div>
                </div>
              </div>
            </div>

            {/* Menu For Descktop view */}

            <div className="col-md-4 d-lg-block d-none">
              <nav className="navbar navbar-expand-lg navbar-light ">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ml-5 topnav">
                    <li
                      className="nav-item ml-4 d-flex"
                      style={{ background: "white" }}
                    >
                      <a className="nav-link active font-weight-900" href="/">
                        <span className="nav-icon">
                          <AiOutlineHome />
                        </span>
                        <span className="sp" style={{ fontWeight: "600" }}>
                          {t("home")}
                        </span>
                      </a>
                    </li>

                    <li
                      className="nav-item active ml-4 d-flex"
                      onClick={() => handleGifts()}
                    >
                      <a className="nav-link font-weight-900" >
                        <span className="nav-icon">
                          <AiOutlineGift />
                        </span>
                        <span className="sp" style={{ fontWeight: "600" }}>
                          {t("gifts")}
                        </span>
                      </a>
                    </li>
                    <li className="nav-item active ml-4 d-flex" onClick={() => setShowMarriageForm(true)}>
                      <a className="nav-link font-weight-900" href="#">
                        <span className="nav-icon">
                          <GiBigDiamondRing />
                        </span>
                        <span className="sp" style={{ fontWeight: "600" }}>
                          {t("Marriage")}
                        </span>
                      </a>
                    </li>

                    <li className="nav-item ml-4 d-flex active" >
                      <a className="nav-link font-weight-900" href="/contact">
                        <span className="nav-icon">
                          <IoIosCall />
                        </span>
                        <span className="sp" style={{ fontWeight: "600" }}>
                          {t("Contact")}
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="col-lg-4 col-md-6 col-10 mobile-col">
              <div className="login-and-location">
                <div className="location_pick_btn" >
                  <button
                    className="loc-btn"
                    onClick={() => setShowLocation(true)}
                    style={{ background : mapIconColor == "#663399" ? "white" : "#fe6684" }}
                    onMouseOver={() => setMapIconColor("white")}
                    onMouseOut={()=> setMapIconColor("#663399")}
                  >
                    <span className="locImg" style={{ cursor: "pointer" }}>
                      <BiMap color={mapIconColor} />
                    </span>
                    <span className="lkn " style={{color : mapIconColor}}>
                      {selectedLocation
                        ? selectedLocation.name
                        : "Accross India"}
                    </span>
                  </button>
                </div>
                {accessToken ? (
                  <div
                    className="form-inline my-2  d-flex userBox"
                    onMouseOver={() => setIsHovering(true)}
                    onClick={() => setIsHovering(!isHovering)}
                  >
                    <a
                      className="nav-link btn btn-danger text-grey bg-white userProfile "
                      type="button"
                      href="#"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      <img
                        src={userImg ? userImg : User}
                        alt="logo icon"
                        height={40}
                        width={40}
                       
                      />
                    </a>
                    {isHovering === true && (
                      <div className="logout">
                        <div
                          className="user_profile"
                          onClick={() => setShowProfile(true)}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            <FaUser />
                          </span>
                          <span
                            style={{ marginLeft: "10px", fontWeight: "600" }}
                          >
                            Profile
                          </span>{" "}
                        </div>

                        <div
                          className="user_profile"
                          onClick={() => history.push("/wishlist")}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            <FaHeart />
                          </span>{" "}
                          <span
                            style={{ marginLeft: "10px", fontWeight: "600" }}
                          >
                            WishList
                          </span>{" "}
                        </div>
                        <div
                          className="user_profile"
                          onClick={() => history.push("/upcoming-bookings")}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            <HiClipboardCopy size={19} />
                          </span>{" "}
                          <span
                            style={{ marginLeft: "10px", fontWeight: "600" }}
                          >
                            Upcoming bookings
                          </span>{" "}
                        </div>
                        <div
                          className="user_profile"
                          onClick={() => history.push("/past-bookings")}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            <HiClock size={19} />
                          </span>{" "}
                          <span
                            style={{ marginLeft: "10px", fontWeight: "600" }}
                          >
                            Past bookings
                          </span>{" "}
                        </div>
                        <div className="user_profile" onClick={logOut}>
                          <span style={{ fontWeight: "bold" }}>
                            <HiOutlineLogout size={19} />
                          </span>{" "}
                          <span
                            style={{ marginLeft: "10px", fontWeight: "600" }}
                            onClick={()=>history.push("/")}
                          >
                            Logout
                          </span>{" "}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="logIn">
                    <a
                      className="button"
                      type="button"
                      href="#"
                      data-toggle="modal"
                      data-target="#myModal"
                      onClick={() => setShowAuthPopup(true)}
                    >
                      <span>
                        <IoMdLogIn />
                      </span>{" "}
                      <span className="login-txt d-lg-block d-none"  onClick={() => setShowAuthPopup(true)}>Login</span>
                    </a>
                  </div>
                )}
              </div>
              <div className="toggle-menu-for-tb-mb d-lg-none">
                <Navbar2
                  taskBarData={taskBarData}
                  updateLocation={updateLocation}
                  handleGifts={handleGifts}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-inline divSerch for_mobile">
          <div className="input-group search">
            <input
              type="text"
              class="form-control"
              placeholder="Search..."
              value={packageName}
              onChange={(e) => handlePackageSearch(e)}
            />
            <span className="input-group-btn srchBtn">
              <button className="btn btn-default srchBtn" type="button">
                <i className="glyphicon  srchBtn">
                  <FaSearch />
                </i>
              </button>
            </span>
            {showSearchPkgBox === true && (
              <div className="searchRslt">
                {allPackageData.map((itm, ind) => {
                  return (
                    <>
                      <span onClick={() => handleSelectedPackage(itm)}>
                        {itm.name}
                      </span>
                    </>
                  );
                })}
              </div>
            )}{" "}
          </div>
        </div>
        <AuthPopup
          showAuthPopup={showAuthPopup}
          setShowAuthPopup={setShowAuthPopup}
          userLogedIn={userLogedIn}
          setUserLogedIn={setUserLogedIn}
          authScreen={authScreen}
          setAuthScreen={setAuthScreen}
        />
        <Location
          showLocation={showLocation}
          setShowLocation={setShowLocation}
          updateLocation={updateLocation}
          setUpdateLocation={setUpdateLocation}
        />

        <Profile
          showProfile={showProfile}
          setShowProfile={setShowProfile}
          setUserImg={setUserImg}
        />

        {/* here we are adding the sidebar  */}
        <SidebarComponent />
      </div>
      {/* 
      <div className="stiky_header_menu d-lg-none">
        <div className="row">
          <div className="col-3">
            <div className="link">
              <a className="nav-link active font-weight-900" href="/">
                <span className="nav-icon">
                  <AiOutlineHome />
                </span>
                <span className="sp" style={{ fontWeight: "600" }}>
                  {t("home")}
                </span>
              </a>
            </div>
          </div>
          <div className="col-3">
            <div className="link">
              <a className="nav-link font-weight-900" href="#">
                <span className="nav-icon">
                  <AiOutlineGift />
                </span>
                <span className="sp" style={{ fontWeight: "600" }}>
                  {t("gifts")}
                </span>
              </a>
            </div>
          </div>
          <div className="col-3">
            <div className="link">
              <a className="nav-link font-weight-900" href="#">
                <span className="nav-icon">
                  <GiBigDiamondRing />
                </span>
                <span className="sp" style={{ fontWeight: "600" }}>
                  {t("Marriage")}
                </span>
              </a>
            </div>
          </div>
          <div className="col-3">
            <div className="link">
              <a className="nav-link font-weight-900" href="#">
                <span className="nav-icon">
                  <BsTelephone />
                </span>
                <span className="sp" style={{ fontWeight: "600" }}>
                  {t("Contact")}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div> */}
      {/* <StickyMenu handleGifts={handleGifts} /> */}

      {/* Marriage form */}

      <MarriageEnquiry showMarriageForm={showMarriageForm} setShowMarriageForm={setShowMarriageForm}/>
    </>
  );
};

export default Navebar3;
