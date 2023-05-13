// This is the marriage enquery form;
import React from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import Clock from "../../assets/images/clock.png";
import Enquiry1 from "./Enquiry1";

const MarriageEnquiry = (props) => {
  const { showMarriageForm, setShowMarriageForm } = props;

  return (
    <>
      <Modal show={showMarriageForm} size="xl">
        <div className="container-fluid  bg-light mrgFormCont">
          <div className="row">
            <div className="col-lg-4 col-md-12 col-sm-12 px-0 mrgLeftCol">
              <div className="row py-5 px-4 d-flex flex-column justify-content-between h-100">
                <div className="col-12 px-4">
                  <h2>Marriage Portal !</h2>
                  <p className="w-75 mt-4">
                    Update your account with additional wedding details to help
                    you plan
                  </p>
                </div>
                <div className="col-11 mt-5">
                  <img src={Clock} alt="" className="w-100 h-100" />
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-sm-12 px-0 ">
              <Enquiry1 showMarriageForm={showMarriageForm} setShowMarriageForm={setShowMarriageForm}/>
            </div>
          </div>
          <div className="cutoption" onClick={() => setShowMarriageForm(false)}>
            <AiOutlineCloseCircle size={32} color="gray" />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MarriageEnquiry;
