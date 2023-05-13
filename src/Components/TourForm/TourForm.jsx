import React from "react";
import Cut from "./cut.svg";
import Logo from "./logo.svg";
import { Modal } from "react-bootstrap";
import "./TourForm.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../elements/Button/Button";
const TourForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(false);
  return (
    <div>
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
            <h4>Hey! Are You looking for help in planing your trip</h4>
          </div>

          <div className="tourPage">
            <div className="tour_input">
            
            <div className="input_box">
                <input
                  type="radio"
                  name="trip"
                  id="romantic"
                   />
                  <label htmlFor="romantic" className="text">Yes!A romantic trip</label>
              </div>
              
              <div className="input_box">
                <input
                  type="radio"
                  name="trip"
                  id="family"
                   />
                  <label htmlFor="family" className="text">Yes!For a family trip</label>
              </div>
              <div className="input_box">
                <input
                  type="radio"
                  name="trip"
                  id="honeymoon"
                   />
                  <label htmlFor="honeymoon" className="text">Yes!A honeymoon trip</label>
              </div>
              <div className="input_box">
                <input
                  type="radio"
                  name="trip"
                  id="friends"
                   />
                  <label htmlFor="friends" className="text">Yes!For a trip with my friends</label>
              </div>
              <div className="input_box">
                <input
                  type="radio"
                  name="trip"
                  id="group"
                   />
                  <label htmlFor="group" className="text">For a group trip</label>
              </div>
              <div className="input_box">
                <input
                  type="radio"
                  name="trip"
                  id="solo"
                   />
                  <label htmlFor="solo" className="text">For a solo trip</label>
              </div>
           
              
<div
                style={{
                  marginTop: "30px",
                  marginBottom: "15px",
                  paddingBottom: "30px",
                }}
              >
                <Button title="Next" isLoading={isLoading} />
              </div>
            </div>

            <ToastContainer />
          </div>

          <div className="auth_cut">
            <img src={Cut} alt="cut icon" onClick={() => handleShow()} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TourForm;
