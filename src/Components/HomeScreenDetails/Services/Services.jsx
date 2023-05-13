// In this page  we are creating the services component ;
import React from "react";
import "./services.css";
import Express from "./ServicesImages/4.png";
import Medal from "./ServicesImages/1.png";
import Star from "./ServicesImages/2.png";
import Teamwork from "./ServicesImages/3.png";

const Services = () => {
  return (
    <>
      <div className="row services">
        <div className="services_heading">
          <h2>Why Choose Us ?</h2>
        </div>

        <div className="services_main col-sm-12 col-md-6 col-lg-12">
          <div className="services_left" data-aos="fade-right" data-aos-animation = "600">
            <div className="services_left_col1">
              <div className="services_left_box services_box1" >
                  <div className="services_left_box_img  strimg">
                  <img src={Star} alt="star icon" style = {{width  : '46%'}}/>
                 
                  </div>
             
                  <h5>Curate New and innovative <br /> ways to amaze you
                </h5>
              </div>
              <div className="services_left_box services_box2" >
                  <div className="services_left_box_img medlimg" >
                  <img src={Medal} alt="medal icon" style = {{ width : "43% " , marginBottom : "-6px"}}/>
                  </div>
               
                <h5>
                  No compromising with <br /> the quality
                </h5>
              </div>
            </div>
            <div className="services_left_col1">
              <div className="services_left_box services_box3" >
             
              <div className="services_left_box_img expimg">
                  <img src={Express} alt="express icon" style = {{width  : '50%'}}/>
                  </div>
                <h5>
                  Assured on-time <br /> services
                </h5>
              </div>
              <div className="services_left_box  services_box4"  >
              <div className="services_left_box_img teamimg">
                  <img src={Teamwork} alt="teamwork icon" style = {{width  : '50%' , marginBottom : "-5px"}}/>
                  </div>
                <h5>
                   our dedicated team <br /> is always at your help
                </h5>
              </div>
            </div>
          </div>
          <div className="services_right" data-aos="fade-left" data-aos-animation="600">
              <div className="services_right_heading">
                 <h2 style={{color:"#4c4a7a"}}>What we offer</h2>
              </div>

              <div className="services_right_text">
                  <p>Xperience It is considered one of India's premier event management firms, providing a wide range of unique event management services. Our specialised staff manages the end-to-end implementation, offering packages customized to your unique objectives. We are a full-service solution provider for all elements of events and entertainment, including planning, management, coordination, and execution, focusing on cost-effectiveness and quality.</p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

// exporting the component ;
export default Services;
