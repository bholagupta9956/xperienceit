import React, { useState } from "react";
import Cut from "./cut.svg";
import Logo from "./logo.svg";
import { Modal } from "react-bootstrap";
import "./TourForm2.css";

import { validate } from "react-email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TourForm8 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(false);
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errors, setErrors] = useState({});

  const tripForm = () => {
    if (email === "") {
      setErrors({ email: "Email must not be blank" });
    } else if (!validate(email)) {
      setErrors({ email: "Invalid email" });
    } else if (phoneNo === "") {
      setErrors({ phoneNo: "Phone no must not be blank" });
    } else if (phoneNo.toString().length !== 10) {
      setErrors({ phoneNo: "Phone no must be of 10 digit" });
    } else {
      setErrors({});

      setIsLoading(true);
      const data = {
        email: email,
        phone: phoneNo,
      };
    }
  };
  return (
    <>
      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <div className="tour2">
          <div className="tour2_logo">
            <img src={Logo} alt="logo icon" />
          </div>

          <div className="tour2_header">
            <h4>Your Email Id & Phone Number</h4>
          </div>

          <div className="tourPage2">
            <div className="tour2_input">
              <h4
                style={{
                  marginLeft: "5px",
                  fontWeight: "400",
                  fontSize: "16px",
                }}
              >
                We will send the you the best real time quotes of verified
                travel agent on this email id & phone number
              </h4>
              <div className="input_box4">
                <input
                  type="email"
                  name="trip"
                  placeholder=" Please mention your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <span style={{ color: "red" }}>{errors.email}</span>
              <div className="input_box4">
                <input
                  type="number"
                  name="trip"
                  placeholder=" Please mention your phone number"
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <span style={{ color: "red" }}>{errors.phoneNo}</span>

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
                    <button href="#" class="next" onClick={() => tripForm()}>
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

export default TourForm8;
