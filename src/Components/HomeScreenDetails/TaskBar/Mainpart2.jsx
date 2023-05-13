import { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Mainpart2.css";
import XperienceSelect from "../XperienceSelect/XperienceSelect";
import { useDispatch } from "react-redux";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import RightArrow from "./TaskBarImages/rightarrow.svg";
import HomePageImg from "../../../assets/images/HomePageimg1.png";
import { endpoints } from "../../../services/endpoints";


const Mainpart2 = ({ updateLocation }) => {

  const dispatch = useDispatch();
  const [showXperienceSelect, setShowXperienceSelect] = useState(false);
  const [bannerImg, setBannerImg] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBanner = () => {
    const bannerUrl = endpoints.home.banner;
    const headers = {
      Accept: "application/json",
    };
    setLoading(true);
    axios
      .get(bannerUrl, { headers: headers })
      .then((res) => {
        if (res.data.status === true) {
          setLoading(false);
          const val = res.data.body;
          setBannerImg(val);
        } else if (res.data.status === false) {
        }
      })
      .catch((err) => {
        console.log(
          err,
          "this is the error which we  are getting here by default"
        );
      });
  };

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <>
      <div className="main-banner-section">
        <div className="inner-slider">
          <OwlCarousel
            className="owl-theme"
            items={1}
            loop={true}
            autoplay={true}
            margin={10}
            nav={false}
          >
            {bannerImg.length != 0 ? (
              bannerImg.map((item, index) => {
                return (
                  <div class="item main-part-carousel">
                    <div className="media-img main-part-carousel-img-box">
                      <img src={item.bg_images} key={index}  className="main-part-carousel-img"/>
                    </div>
                  </div>
                );
              })
            ) : (
              <div class="item">
                <div className="media-img">
                  <Skeleton height={300} variant="rectangular" />
                </div>
              </div>
            )}
          </OwlCarousel>
        </div>
        {/* <div className="main_bottom_bar">
          <div className="main_bottom_bar_1">
            <h5>Search your</h5>
            <h3>Xperiences</h3>
          </div>
          <div
            className="main_bottom_bar_2"
            onClick={() => setShowXperienceSelect(true)}
          >
            <h4>
              Occasion
              <br /> <span>Anniversary</span>
            </h4>
            <img src={RightArrow} alt="arrow icon" />
          </div>
          <div className="main_bottom_bar_3" style={{ background: "#1c1956" }}>
            <h5>Find Surprises</h5>
          </div>
        </div> */}
      </div>
      <XperienceSelect
        showXperienceSelect={showXperienceSelect}
        setShowXperienceSelect={setShowXperienceSelect}
        updateLocation={updateLocation}
      />
    </>
  );
};

export default Mainpart2;
