import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../elements/Button/Button";
import "./Auth.css";

import Balloon from "./AuthImages/balloon.svg";
import { validate } from "react-email-validator";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";

const ForgatePassword = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const { setAuthScreen } = props;
  const api = endpoints.authentication.forgotPassword;

  const forgot = () => {
    if (email === "") {
      setErrors({ email: "Email must not be blank" });
    } else if (!validate(email)) {
      setErrors({ email: "Invalid email" });
    } else {
      setErrors({});
      setIsLoading(true);

      const data = {
        email: email,
      };

      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      axios
        .post(api, data)
        .then((res) => {
          // console.log(res, "vbjkkvldjfguiagviidlgavlgbal");
          if (res.data.status === true) {
            toast("Otp send successfully", { type: "success" });
            localStorage.setItem("email", email);
            setAuthScreen("changePassword");
            setIsLoading(false);
          } else if (res.data.status === false) {
            toast(res.data.msg, { type: "error" });

            setIsLoading(false);
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, " invalid FOrgotten password");
        });
    }
  };
  return (
    <>
      <div className="forgate_pass">
        <div className="forgate_input">
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.email}</span>

          <div style={{ marginTop: "30px", marginBottom: "15px" }}>
            <Button
              title="Forgot Password"
              onClick={forgot}
              isLoading={isLoading}
            />
            <div className="LogFor">
              <div className="Log">
                <span
                  className="otp_page"
                  onClick={() => setAuthScreen("login")}
                >
                  Login via email
                </span>
              </div>
              <div className="Forg">
                <span
                  className="forgotPage"
                  onClick={() => setAuthScreen("loginWithOtp")}
                >
                  Login via otp
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="forgate_footer">
          <h6>Other login method</h6>
          <div className="forgate_footer_images">
            <img src={Facebook} alt="facebook Icon" />
            <img src={Gmail} alt="gmail icon" />
            <img src={Twitter} alt="twitter icon" />
          </div>
        </div> */}

        <div className="forgate_balloon">
          <img src={Balloon} alt="balloon image" />
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ForgatePassword;
