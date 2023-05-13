
import React, { useState } from "react";
import Cut from "./cut.svg";
import Logo from "./logo.svg";
import { Modal } from "react-bootstrap";
import "./TourForm2.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TourForm6 = () => {
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
        <div className="tour2">
          <div className="tour2_logo">
            <img src={Logo} alt="logo icon" />
          </div>

          <div className="tour2_header">
           
          </div>

          <div className="tourPage2">
          
            <div className="tour2_input">
            <h4 style={{marginLeft:"5px" ,fontWeight:"400"}}>When are you planning to go?</h4>
              <div className="input_box3">
                <input type="date" name="trip" id="date" />
               
                
                
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
  )
}

export default TourForm6;

