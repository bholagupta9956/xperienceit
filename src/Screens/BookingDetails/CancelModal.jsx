import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import "./BookingDetails.css";
import "./CancelModal.css";
import Close from "./BookingDetailsImages/close24.png";
import CancelNoModal from "./CancelNoModal";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import { is } from "ramda";
import { toast, ToastContainer } from "react-toastify";

const CancelModal = (props) => {
  const {
    isOpen,
    setIsOpen,
    CancelOrder,
    setCancelReason,
    cancelReason,
    setShowFinalCancel,
    showFinalCancel,
  } = props;

  const [isOthers, setIsOthers] = useState(false);
  const [allCancelReason, setAllCancelReason] = useState([]);

  const confirmCancel = () => {
    if (cancelReason == "") {
      toast("Please give us reason for cancel", { type: "warning" });
    } else {
      
      CancelOrder();
    }
  };

  const handleCancelReason = (dta) => {
    setIsOthers(false);
    setCancelReason(dta);
  };

  const getAllCancelReason = () => {
    const url = endpoints.booking.cancelReason;

    axios
      .post(url)
      .then((res) => {
        if (res.data.status) {
          var dta = res.data.body;
          setAllCancelReason(dta);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getAllCancelReason();
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
        show={isOpen}
      >
        <div className="cancelation-policy">
          <div className="Cancel-Policy-heading">
            <h4>Cancellation Reason</h4>
            <span className="cancel-cross" onClick={() => setIsOpen(false)}>
              <img src={Close} />
            </span>
          </div>
          <hr />

          {allCancelReason.length != 0 &&
            allCancelReason.map((itm, ind) => {
              return (
                <>
                  <div className="cancel_input" key={ind}>
                    <div className="cancel_policy_input_box">
                      <input
                        type="radio"
                        name="trip"
                        id={ind}
                        value={itm}
                        onChange={(e) => handleCancelReason(e.target.value)}
                      />
                       
                      <label htmlFor={ind} className="canceltext">
                        {itm}
                      </label>
                    </div>
                  </div>
                </>
              );
            })}

          <div className="cancel_input">
            <div className="cancel_policy_input_box">
              <input
                type="radio"
                name="trip"
                id="romantic"
                onChange={() => setIsOthers(true)}
              />
              <label htmlFor="romantic" className="canceltext px-1">
                Other Reason
              </label>
            </div>
            {isOthers && (
              <div className="otherResionInput">
                <input
                  type="text"
                  className="writeResion"
                  placeholder="write reason here..."
                />
              </div>
            )}
          </div>
          <div className="cancelbookingbuttons">
            <button className="noCancelation" onClick={() => setIsOpen(false)}>
              No
            </button>
            <button className="YesCancelation" onClick={confirmCancel}>
              Yes, Cancel
            </button>
          </div>
        </div>
      </Modal>
      <CancelNoModal
        modalOpen={showFinalCancel}
        setModalOpen={setShowFinalCancel}
        CancelOrder={CancelOrder}
      />
      <ToastContainer />
    </>
  );
};

export default CancelModal;
