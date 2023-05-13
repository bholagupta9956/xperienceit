import React, { useState } from "react";
import Cut from "./cut.svg";
import Logo from "./logo.svg";
import { Modal } from "react-bootstrap";
import "./TourForm.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../elements/Button/Button";

const TourForm3 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(false);

  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <div className="tour">
          <div className="tour_logo">
            <img src={Logo} alt="logo icon" />
          </div>

          <div className="tour_header">
            <h4>May I know what kind destination you are looking for? </h4>
          </div>

          <div className="tourPage">
            <div className="tour_input">
              <div className="input_box">
                <input type="radio" name="trip" id="kerala" />
                <label htmlFor="kerala" className="text">
                  Kerala
                </label>
              </div>

              <div className="input_box">
                <input type="radio" name="trip" id="maldives" />
                <label htmlFor="maldives" className="text">
                  Maldives
                </label>
              </div>
              <div className="input_box">
                <input type="radio" name="trip" id="andman" />
                <label htmlFor="andman" className="text">
                  Andman
                </label>
              </div>
              <div className="input_box">
                <input type="radio" name="trip" id="bali" />
                <label htmlFor="bali" className="text">
                  Bali
                </label>
              </div>
              <div className="input_box">
                <input type="radio" name="trip" id="mauritius" />
                <label htmlFor="mauritius" className="text">
                  Mauritius
                </label>
              </div>
              <div className="input_box">
                <input type="radio" name="trip" id="other" />
                <label htmlFor="other" className="text">
                  Other
                </label>
              </div>

              <div
                style={{
                  marginTop: "30px",
                  marginBottom: "15px",
                  paddingBottom: "30px",
                  justifyContent: "space-between",
                }}
              >
                <div className="row">
                  <div className="col-sm-6">
                    <button href="#" class="previous">
                      &laquo; Previous
                    </button>
                  </div>
                  <div className="col-sm-6">
                    <button href="#" class="next">
                      Next &raquo;
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <ToastContainer />
          </div>

          <div className="auth_cut">
            <img src={Cut} alt="cut icon" onClick={() => handleShow()} />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TourForm3;
