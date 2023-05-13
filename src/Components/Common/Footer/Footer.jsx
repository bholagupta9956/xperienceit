// In this tutorial we are going to design the footer of the project ;


import React from "react";
import "./Footer.css";
import Contact from "./FooterImages/contact.svg";
import Email from "./FooterImages/email.svg";
import Facebook from "./FooterImages/facebook.svg";

import Girl from "./FooterImages/Girl.png";
import PlayStore from "./FooterImages/playstore.png";
import AppStore from "./FooterImages/appstore.png";
import Twitter from "./FooterImages/twitter.svg";
import Balloon from "./FooterImages/Gubbara.png"
import Whatsapp from "./FooterImages/whatsapp.svg";
import Youtube from "./FooterImages/youtube.svg";


const Footer = () => {

  return (
    <>
      <div className="footer">
        <div className="footer_left" data-aos="fade-up">
          <div className="footer_col1">
            <h4>Need help ? </h4>
            <div className="footer_col1_media">
              <img src={Facebook} alt="facebook icon" />
              <img src={Whatsapp} alt="Whatsapp icon" />
              <img src={Twitter} alt="Twitter icon" />
              <img src={Youtube} alt="Youtube icon" />
            </div>

            <span>Terms And conditions</span>
          </div>
          <div className="footer_col2">
            <h4>Contact us</h4>
            <div className="footer_col2_text">
              <h6>Our company</h6>
              <h6>Services</h6>
              <h6>Who we are </h6>
              <h6>Blogs</h6>
            </div>
          </div>
        </div>
        <div className="footer_right" data-aos="fade-up">
          <div className="footer_col3">
            <div >
              <h4>Connect now for services</h4>
              <div className="footer_col3_contact">
                <img
                  src={Contact}
                  alt="contact icon"
                  style={{ width: "30px" , marginRight : "10px"}}
                />
                <h5>444-333-0897</h5>
              </div>
              <div className="footer_col3_email">
                <img src={Email} alt="email icon" style={{ width: "30px" , marginRight : "11px"}} />
                <span>experienceIt@gmail.com</span>
              </div>
            </div>
          </div>
            <div className="footer_col4">
              <img src={PlayStore} alt="playstore icon" />
              <img src={AppStore} alt="appstore icon" />

            </div>
        </div>

        <p className = "copyright">Copyright by Skyview smart solutions P.V.T LTD  www.skyview.com</p>
        <div className="footer_girls" data-aos="fade-up" data-aos-duration = "800" style ={{zIndex : -1}}>
            <img src={Girl} alt="girl " style = {{width : "79%"}}/>
            
        </div>
        <div className="footer_balloon" data-aos="fade-left" data-aos-duration = "800" style ={{zIndex : -1}}>
             <img src={Balloon} alt="balloon "  style = {{width : "63%"}}/>
        </div>
      </div>
    </>
  );
}


// exporting the component ;
export default Footer;
