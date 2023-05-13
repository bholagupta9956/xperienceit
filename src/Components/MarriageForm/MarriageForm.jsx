// This will be model of the marriage form ;

import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "./marriageForm.css";
import Marriage from "../../assets/images/mrg.jpg";
import MarriageSignup from "./MarriageSignup";
import MarriageLogin from "./MarriageLogin";
import { AiOutlineCloseCircle } from "react-icons/ai";

const MarriageForm = ({ showMarriageForm, setShowMarriageForm }) => {
  
  const [showForm, setShowForm] = useState("signup");

  return (
    <Modal show={showMarriageForm} size="lg">
      <div className="container-fluid  bg-light mrgFormCont">
        <div className="row">
          <div className="col-lg-5 col-md-12 col-sm-12 px-0">
            <img src={Marriage} alt="" className="w-100 h-100" />
          </div>
          {showForm === "signup" && (
            <MarriageSignup setShowForm={setShowForm} />
          )}
          {showForm === "login" && <MarriageLogin setShowForm={setShowForm} />}
        </div>
        <div className="cutoption" onClick={() => setShowMarriageForm(false)}>
          <AiOutlineCloseCircle size={32} color="gray" />
        </div>
      </div>
    </Modal>
  );
};

export default MarriageForm;
