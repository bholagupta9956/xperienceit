// here we are going to design the otp screen;

import React from "react";
import axios from "axios";
import { useState } from "react";
import "./Auth.css";
import { endpoints } from "../../../services/endpoints";
import Button from "../../elements/Button/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import FacebookLogin from 'react-facebook-login';
import { MdBackup } from "react-icons/md";


const OtpPanel = (props) => {

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthScreen, setShowAuthPopup, setUserLogedIn } = props;
  

  const verifyOtp = () => {

    if (otp === "") {
      setErrors("Please enter otp");
    } else if (otp.length !== 4) {
      setErrors("Please enter valid OTP");
    } else {
      setErrors("");
      const verifyOtpUrl = endpoints.authentication.otpVerify;

      const phoneNo = localStorage.getItem("phoneNo");
      const val = {
        phone: `91${phoneNo}`,
        otp: otp,
      };

      const headers = {
        "Content-type": "application/json; charset=UTF-8",
      };

      const register = localStorage.getItem("register");
      setIsLoading(true);
      
      if(register == 2){
      axios
        .post(verifyOtpUrl, val, { headers: headers })
        .then((res) => {
          setIsLoading(false);
          console.log(res, "otp");
          if (res.data.status === true) {
            // if (res.data.registration == 1) {
            //   setAuthScreen("userDetails");
            //   localStorage.setItem("otp", otp);
            //   toast(res.data.message, { type: "success" });
            // } 
             if (res.data.registration == 2) {
              toast(res.data.message, { type: "success" });
              const token = res.data.body.access_token;
              const userDetails = res.data.body.user;
              localStorage.setItem("userDetails", JSON.stringify(userDetails));
              localStorage.setItem("access_token", token);
              setUserLogedIn(true);
              setShowAuthPopup(false);
            }
          } else if (res.data.status === false) {
            toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, "this is the error which we are  getting here");
        });

      }
      else if(register == 1){
        localStorage.setItem("otp", otp);
        setAuthScreen("userDetails");
      }
    }
  };


  return (
    <>
      <div className="otpScreen">
        <h4>Otp Verification</h4>
        <div className="auth_input otp_form">
          <label htmlFor="number">Enter Otp</label>
          <input
            type="number"
            placeholder="Enter your 4 digit otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <span style={{ color: "red", fontSize: "14px" }}>{errors}</span>
          <div style={{ marginTop: "25px" }}>
            <Button
              title="Verify OTP"
              onClick={verifyOtp}
              isLoading={isLoading}
            />
          </div>
          <div className="LogFor">
            <div className="Log">
              <u>
                <span
                  className=""
                  style={{ fontSize: "25px", color: "orange" }}
                  onClick={() => setAuthScreen("loginWithOtp")}
                >
                  {" "}
                  <MdBackup />
                </span>
                {/* <span
                  className="otp_page"
                  style={{ color: "grey", fontWeight: "600" }}
                  onClick={() => setAuthScreen("loginWithOtp")}
                >
                  GoBack
                </span> */}
              </u>
            </div>
            {/* <div className="Forg">
                <span
                  className="forgotPage"
                  style={{color:"grey",fontWeight:"600"}}
                  
                >
                 Resend Otp
                </span>
              </div> */}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default OtpPanel;
