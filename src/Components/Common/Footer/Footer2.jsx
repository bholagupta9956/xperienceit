import React from "react";
import Contact from "./FooterImages/contact.svg";
import Email from "./FooterImages/email.svg";
import Facebook from "./FooterImages/facebook.svg";

import Girl from "./FooterImages/Girl.png";
import PlayStore from "./FooterImages/playstore.png";
import AppStore from "./FooterImages/appstore.png";
import Twitter from "./FooterImages/twitter.svg";
import Balloon from "./FooterImages/Gubbara.png";
import Whatsapp from "./FooterImages/whatsapp.svg";
import Youtube from "./FooterImages/youtube.svg";
import "./Footer2.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"

const Footer2 = () => {
    const history = useHistory()
const WhoWeAre=()=>{
  history.push("./who-we-are")
}


  return (
    <>
      <footer class="section footer_section">
        <div class="container">
          <div class="row">
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="footer_col social_media">
                <h4>Need help ? </h4>
                <div className="footer_col1_media">
                  <a href="https://www.facebook.com/xperienceit.in
">
                    {" "}
                    <img src={Facebook} alt="facebook icon" />
                  </a>
                  <a href="https://api.whatsapp.com/send/?phone=7080581133&text&type=phone_number&app_absent=0">
                    {" "}
                    <img src={Whatsapp} alt="Whatsapp icon" />
                  </a>
                  <a href="https://twitter.com/xperienceitpvt">
                    {" "}
                    <img src={Twitter} alt="Twitter icon" />
                  </a>
                  <a href="https://www.youtube.com/channel/UCppIPLXOZAF6LwZNjqmFthQ">
                    {" "}
                    <img src={Youtube} alt="Youtube icon" />
                  </a>
                </div>
                <a onClick={() =>history.push("/tnc")} className="tnc">
                  Terms and Conditions
                </a>
                <a href="	https://admin.xperienceit.in/page/become-a-vendor " className="tnc">
                 Become a Merchant
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12">
              <div className="footer_col quick_links">
                <h4>Contact us</h4>
                <ul>
                  <li>
                    <a href="/contact">Contact us</a>
                  </li>
                  <li>
                    <a href="https://skyviewads.com/it-services-in-lucknow/">
                      Our company
                    </a>
                  </li>
                  {/* <li>
                    <a href="">Services</a>
                  </li> */}
                  <li>
                    <a href="/who-we-are">Who we are</a>
                  </li>
                  <li>
                    <a href="/blogs">Blogs</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
              <div className="footer_col">
                <div>
                  <h4>Connect now for services</h4>
                  <div className="footer_col3_contact">
                    <a href="tel:7080581133">
                      <img
                        src={Contact}
                        alt="contact icon"
                        style={{ width: "30px", marginRight: "10px" }}
                      />
                      +91 7080581133
                    </a>
                  </div>
                  <div className="footer_col3_email">
                    <a href="https://api.whatsapp.com/send/?phone=7080581133&text&type=phone_number&app_absent=0">
                      <img
                        src={Email}
                        alt="email icon"
                        style={{ width: "30px", marginRight: "11px" }}
                      />
                      contact@experienceit.in{" "}
                    </a>
                  </div>
                  <div className="footer_col3_whatsapp">
                    <a href="mailto:contact@experienceit.in">
                      <img
                        src={Whatsapp}
                        alt="email icon"
                        style={{ width: "30px", marginRight: "11px" }}
                      />
                       +91 7080581133
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-12">
              <div className="footer_col app_img">
                <img src={PlayStore} alt="playstore icon" />
                <img src={AppStore} alt="appstore icon" />
              </div>
            </div>
          </div>
        </div>
        <div className="copy_right_area">
          <p class="text">
            {" "}
            &copy;By Skyview Smart Solutions <a href="www.skyview.com">www.skyviewads.com</a> 
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer2;
