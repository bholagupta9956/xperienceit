import React, { useState } from "react";
import { AiOutlineHome, AiOutlineGift } from "react-icons/ai";
import { GiBigDiamondRing } from "react-icons/gi";
import "./Navbar3.css";
import { IoMdLogIn, IoIosCall } from "react-icons/io";
import { BsTelephone } from "react-icons/bs";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { useHistory, generatePath } from "react-router-dom";
import MarriageEnquiry from "../../MarriageForm/MarriageEnquiry";
const StickyMenu = () => {
  const { t } = useTranslation("translation");
  const history = useHistory();
  const sLocat = localStorage.getItem("locationDetails");
  const selectedLocation = JSON.parse(sLocat);
  const [showMarriageForm , setShowMarriageForm] = useState(false)
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
              <a
                className="nav-link font-weight-900"
              
                onClick={() => handleGifts()}
              >
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
              <a className="nav-link font-weight-900"  onClick={() => setShowMarriageForm(true)}>
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
      </div>
      <MarriageEnquiry showMarriageForm={showMarriageForm} setShowMarriageForm={setShowMarriageForm}/>
    </>
  );
};

export default StickyMenu;
