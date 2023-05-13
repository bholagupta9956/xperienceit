// In this component we are going to design the  the offers popup here ;

import React from "react";
import "./OffersPopup.css";
import { Modal } from "react-bootstrap";
import Gifts from "./images/ballon&gifts.svg";
import Girl from "./images/girls.svg";
import Cut from "./images/cut.svg";

const OffersPopup = () => {
    
  return (
    <>
      <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <div className="offersPopup">
          <div className="offersPopup_left">
            <img src={Gifts} alt="gifts icon" />
          </div>
          <div className="offersPopup_right">
            <h3>
              Mohd has given you a 200 Rs discount for your First Xperience It
              login .
            </h3>

            <div className="offersPopup_para">
              <p>
                You will get instant 200 Rs discount on your booking while your
                friend will receive the credit when you book an Xperience
              </p>
            </div>

            <button className="offersPopup_btn">Sign In To Claim</button>
          </div>

          <div className="offersPopup_girl">
            <img src={Girl} alt="girl icon" />
          </div>

          {/* adding cut options here */}
          <div className="offersPopup_cut">
            <img src={Cut} alt="cut icon " />
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the offersPopup ;
export default OffersPopup;
