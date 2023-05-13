import React, { useEffect, useState } from "react";
import Footer2 from "../Components/Common/Footer/Footer2";
import Services2 from "../Components/HomeScreenDetails/Services/Services2";
import TaskBar from "../Components/HomeScreenDetails/TaskBar/TaskBar";
import Testimonial from "../Components/HomeScreenDetails/Testimonial/Testimonial";
import OfferPage from "../Components/Offer/OfferPage";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Navebar3 from "../Components/Common/Navbar/Navebar3";
import OfferPage2 from "../Components/Offer/OfferPage2";
import Testimonial2 from "../Components/HomeScreenDetails/Testimonial/Testimonial2";
import StickyMenu from "../Components/Common/Navbar/StickyMenu";

const OfferScreen = () => {
  
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);
  const [offers, setOffers] = useState([]);
  const [updateLocation, setUpdateLocation] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  const { offerName, offerId } = useParams();

  const api = `https://admin.xperienceit.in/api/offers-by-package?offer_id=${offerId}`;

  useEffect(() => {
    setLoading(true);

    axios
      .get(api)
      .then((res) => {
        setLoading(false);
        if (res.data.status === true) {
          const val = res.data.body[0].services;
          setOffers(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "offers Api  data not found");
      });
  }, [offerId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <div className="OfferScreens">
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

        <OfferPage2
          offers={offers}
          offerName={offerName}
          offerId={offerId}
          updateLocation={updateLocation}
          loading={loading}
        />

        <Testimonial2 />
        <Services2 />
        <Footer2 />
      </div>
      {/* <StickyMenu /> */}
    </>
  );
};
export default OfferScreen;
