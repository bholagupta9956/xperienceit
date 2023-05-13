import React, { useState, useRef } from "react";
import "./OtpPage.css";
import axios from "axios";
import Twitter from "./AuthImages/twitter.svg";
import Facebook from "./AuthImages/facebook.svg";
import Gmail from "./AuthImages/gmail.svg";
import { FaUser } from "react-icons/fa";

import Balloon from "./AuthImages/balloon.svg";
import { endpoints } from "../../../services/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../elements/Button/Button";
import Google from "./AuthImages/google.svg";
import Loader from "../../../utils/Loader";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import FbLogin from "./FbLogin";
import GmailLogin from "./GmailLogin";

const OtpPage = (props) => {
  const { setAuthScreen, setUserLogedIn, setShowAuthPopup } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [phoneNo, setPhoneNo] = useState("");

  const api = endpoints.authentication.otpLogin;

  const otpLogin = () => {
    if (phoneNo === "") {
      setErrors({ phoneNo: "Please enter phone no." });
    } else if (phoneNo.length !== 10) {
      setErrors({ phoneNo: "Phone must be of 10 digit" });
    } else {
      setErrors({});
      setIsLoading(true);
      const val = {
        phone: `91${phoneNo}`,
      };

      const headers = {
        "Content-type": "application/json; charset=UTF-8",
      };

      axios
        .post(api, val, { headers: headers })
        .then((res) => {
          setIsLoading(false);
          if (res.data.status === true) {
            const register = res.data?.is_user_register;
            localStorage.setItem("register", register);
            localStorage.setItem("phoneNo", phoneNo);
            toast(res.data.message, { type: "success" });
            setAuthScreen("otpScreen");
          } else if (res.data.status === false) {
            toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, "Otp Login Api Failed");
        });
    }
  };

  // from here we are handling the social login;

  const googleRef = useRef();
  const facebookRef = useRef();
  const onLoginStart = () => {
    // alert("login start");
  };

  const onLogoutFailure = () => {
    alert("logout fail");
  };

  const onLogoutSuccess = () => {};

  const handleSocialLogin = ({ provider, data }) => {
    const socialLoginUrl =
      "https://admin.xperienceit.in/api/login-via-socials";

    const val = {
      email: data.email,
      first_name: data.name,
      type_login: "google",
    };

    axios
      .post(socialLoginUrl, val)
      .then((res) => {
        console.log(res, "usersData response");
        if (res.data.status) {
          const token = res?.data?.access_token;
          toast("Login Successfully", { type: "success" });
          setShowAuthPopup(false);
          const userDetails = res.data.body.user;
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          localStorage.setItem("access_token", token);
          setUserLogedIn(true);
        } else if (res.data.status === false) {
          toast(res.data.message, { type: "error" });
        }
      })
      .catch((err) => {
        console.log(err, "usersData error");
      });
  };

  return (
    <>
      <div className="otpPage">
        <div className="otp_input">
          <label htmlFor="number">Mobile Login</label>
          <input
            type="number"
            placeholder="Enter 10 digit mobile number Eg:8745673414"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.phoneNo}</span>

          <div style={{ marginTop: "30px", marginBottom: "15px" }}>
            <Button
              title="Login Via OTP"
              isLoading={isLoading}
              onClick={() => otpLogin()}
            />
          </div>
        </div>

        
        {/* <div className="otp_balloon">
          <img src={Balloon} alt="balloon image" />
        </div> */}
        {isLoading && <Loader />}
        <ToastContainer />
      </div>
    </>
  );
};

export default OtpPage;
