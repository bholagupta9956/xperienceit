
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../elements/Button/Button";
import "./Enquiry.css";
import Cut from "./cut.svg";
import Logo from "./logo.svg";

import { validate } from "react-email-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Enquiry = (props) => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const  { setShowEnquiry  , showEnquiry} = props;


  const enquirySave = () => {
    if (name === "") {
      setErrors({ name: "Name must not be blank" });
    } else if (name.length < 4) {
      setErrors({ name: "Name must be greater than 3 character" });
    } else if (email === "") {
      setErrors({ email: "Email must not be blank" });
    } else if (!validate(email)) {
      setErrors({ email: "Invalid email" });
    } else if (phoneNo === "") {
      setErrors({ phoneNo: "Phone no must not be blank" });
    } else if (phoneNo.toString().length !== 10) {
      setErrors({ phoneNo: "Phone no must be of 10 digit" });
    } else if (message === "") {
      setErrors({ name: "Notes must not be blank" });
    } else {
      setErrors({});

      setIsLoading(true);
      const data = {
        name: name,
        email: email,
        phone: `91${phoneNo}`,

        note: message,
      };

      console.log(data, "jhcjlsggiguGIUGIGV");
      const api = "https://admin.xperienceit.in/api/enquiry-form";

      axios
        .post(api, data)
        .then((res) => {
          console.log(res, "enquiry result returned");
          if (res.data.status==="true"){
            toast(res.data.message, { type: "success" })
            setIsLoading(false);
          }
          else if(res.data.status==="false"){
            toast(res.data.message, { type: "error" })
          }
         
        })
        .catch((err) => {
          console.log(err, "enquiry data not found");

          setIsLoading(false);
        });
    }
  };
  const [show, setShow] = useState(true);
  const handleShow = () => setShow(false);

  return (
    <>
      <Modal
        show={showEnquiry}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
        <div className="enq">
          <div className="enq_logo">
            <img src={Logo} alt="logo icon" />
          </div>

          <div className="enq_header">
            <h4>Enquiry Here...</h4>
          </div>

          <div className="enquiryPage">
            <div className="enquiry_input">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors.name}</span>

              <label htmlFor="email">Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors.email}</span>

              <label htmlFor="phoneNo">Phone</label>
              <input
                type="number"
                placeholder="Enter Your Phone Number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <span style={{ color: "red" }}>{errors.phoneNo}</span>

              <label htmlFor="message">Message</label>
              <textarea
                placeholder="Write Your Message Here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <span style={{ color: "red" }}>{errors.message}</span>

              <div
                style={{
                  marginTop: "30px",
                  marginBottom: "15px",
                  paddingBottom: "30px",
                }}
              >
                <Button
                  title="Submit"
                  onClick={() => enquirySave()}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <ToastContainer />
          </div>

          <div className="auth_cut">
            <img src={Cut} alt="cut icon" onClick={() =>handleShow()}/>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Enquiry;
