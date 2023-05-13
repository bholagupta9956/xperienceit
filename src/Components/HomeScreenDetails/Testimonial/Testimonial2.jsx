import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { ImQuotesRight } from "react-icons/im";
import Skeleton from "@mui/material/Skeleton";

import "./Testimonail2.css";
import Balloon1 from "./TestimonailImages/balloon1.svg";
import Balloon2 from "./TestimonailImages/balloon2.svg";
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import { useEffect, useState } from "react";

const Card = (props) => {
  return (
    <>
      <div class="item" onClick={props.onClick}>
        <div className="package-col">
          <div className="qt-icon">
            <ImQuotesRight />
          </div>
          {/* <div className="author">
       Name..
    </div> */}
          <div className="description">
            <p>
              <q id="quate"> {props.review} </q>
            </p>
          </div>
          <div className="media-img testimonial-Icons">
            <img src={props.icon} alt="man icon" />
          </div>
        </div>
      </div>
    </>
  );
};

const Testimonial2 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const api = endpoints.home.testimonials;
    setLoading(true);
    axios
      .get(api)
      .then((res) => {
        if (res.data.status === true) {
          const val = res.data.body;
          setData(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is the error which we are getting here");
      });
  }, []);

  const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: false,
    center: true,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
        center: false,
      },
      400: {
        items: 1,
        center: false,
      },
      600: {
        items: 1,
        center: false,
      },
      700: {
        items: 2,
        center: false,
      },
      1000: {
        items: 3,
      },
    },
  };

  const handleSlick = (index) => {
    // alert("slick slider")
  };

  return (
    <>
      {data.length != 0 && (
        <div className="testimonial-pack-slider">
          <div className="testimonial-section-slider">
            <div className="container-fluid">
              <>
                <div className="title">
                  <div className="row">
                    <div className="title-col">
                      <h3>Testimonials</h3>
                      <h2>Satisfied Clients About Us</h2>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-10 offset-lg-1">
                    <OwlCarousel
                      className="owl-theme category"
                      id="category"
                      items={5}
                      loop
                      margin={10}
                      dots={false}
                      {...options}
                      nav
                    >
                      {data.length != 0 &&
                        data.map((item, index) => {
                          return (
                            <>
                              <Card
                                icon={item.avatar}
                                review={item.desc}
                                key={index}
                                onClick={() => handleSlick(index)}
                              />
                            </>
                          );
                        })}
                      {/* 
                      {loading && (
                        <div class="item">
                          <div className="">
                            <Skeleton height={300} variant="rectangular" />
                          </div>
                        </div>
                      )} */}
                    </OwlCarousel>
                  </div>
                </div>

                <div className="baloon-elements">
                  <div
                    className="left_element"
                    data-aos="flip-left"
                    data-aos-duration="600"
                  >
                    <img
                      src={Balloon1}
                      alt="balloons"
                      data-aos="fade-up"
                      data-aos-duration="600"
                    />
                  </div>
                  <div
                    className="right_element"
                    data-aos="flip-left"
                    data-aos-duration="600"
                  >
                    <img
                      src={Balloon2}
                      alt="balloons"
                      data-aos="fade-up"
                      data-aos-duration="600"
                    />
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Testimonial2;
