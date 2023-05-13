// In this file we are creating the testimonail part of  the project which will show you all the records of the user ;
import React , {useState } from "react";
import "./Testimonail.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Man from "./TestimonailImages/man.svg";
import Balloon1 from "./TestimonailImages/balloon1.svg";
import Balloon2 from "./TestimonailImages/balloon2.svg";
import pinkFlow from "./TestimonailImages/pinkflow.svg";
import yellowFlow from "./TestimonailImages/yellow.svg";
import axios from "axios";
import {endpoints} from "../../../services/endpoints"
import { useEffect } from "react";
import { RssFeed } from "@material-ui/icons";

//Allows for server-side rendering.

const Card = (props) => {
  return (
    <>
    <div className="reveiwitem">
      <div className="testimonial_card" data-aos="flip-left" data-aos-duration = "600" onClick={props.onClick} >
        <div className="testomonial_head">
        "
        </div>
        <div className="testimonial_text">
        <p>
           {props.review} 
        </p>
        </div>
        <div className="testimonial_icon">
            <img src={props.icon} alt="man icon"/>
          </div>
        <div className="testimonial_footer">
        <img src={yellowFlow} alt="background img" />
          </div>
          
      </div>
      </div>
    </>
  );
};

const Testimonial = (props) => {

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0px",
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          infinite: true,
          
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }

    ]
  };

  const [data , setData] = useState([]);
  
  useEffect(() =>{
    const api = endpoints.home.testimonials;
    
    axios.get(api)
    .then((res) =>{
      // console.log(res , "this is the response");
      if(res.data.status===true){
        const val = res.data.body;
        setData(val);
      }
    })
    .catch((err) =>{
      console.log(err , "this is the error which we are getting here")
    });

  },[]);

  const handleSlick = (index) =>{
    // alert(index ,"index here")
  }


  

  return (
    <>
      <div className="testimonials">
        <div className="testimonials_heading">
          <h5>Testimonials</h5>
          <h3>Satisfied Clients About Us </h3>

          <div className="testimonials_container">
            <Slider {...settings}  className="testimonials_slider">
              
              
              {data.map((item ,index) =>{
                return(<>
                  <Card icon={item.avatar} review={item.desc} key={index} onClick={() => handleSlick(index)} />
                </>)
              })}
            </Slider>
          </div>
          
            <div className="left_balloons" >
              <img src={Balloon1} alt="balloons" data-aos="fade-up" data-aos-duration = "600"/>
            </div>
            <div className="right_balloons" >
              <img src={Balloon2} alt="balloons" data-aos="fade-up" data-aos-duration = "600"/>
          </div>


        </div>
      </div>
    </>
  );
};

// exporting the testimonial component ;
export default Testimonial;
