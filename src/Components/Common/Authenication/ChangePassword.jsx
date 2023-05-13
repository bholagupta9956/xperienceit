import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../elements/Button/Button";
import "./ChangePassword.css";
import axios from "axios";


const ChangePassword = (props) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setAuthScreen } = props;

  // const api = endpoints.authentication.changePassword;
  const api = "https://admin.xperienceit.in/api/submit-reset-password";
  const email = localStorage.getItem("email");
  const changePassword = () => {
    if (otp === "") {
      setErrors({ otp: "Please Enter Your Otp" });
    }
    else if (newPassword === "") {
      setErrors({ newPassword: "Please Enter Your password" });
    } else if (newPassword.length < 6) {
      setErrors({ newPassword: "Enter Password Must be grater than 6 digit" });
    } else if (confPassword === "") {
      setErrors({ confPassword: "Please Enter Your Confirm Password" });
    } else if (confPassword !== newPassword) {
      setErrors({ confPassword: "Your Password Dose Not Match" });
    } else {
      setErrors({});
      setIsLoading(true);
      const data = {
        otp: otp,
        password: newPassword,
        password_confirmation: confPassword,
        email: email,
      };
      axios
        .post(api, data)
        .then((res) => {
          if (res.data.status === true) {
            setIsLoading(false);
            setAuthScreen("login");
            toast(res.data.message ,{type : "success"})
          }
          else if(res.data.status === false){
            setIsLoading(false)
            toast(res.data.message , {type : "error"})
          }
        })
        .catch((err) => {
          console.log(err, "Invalid Change Password");
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div className="change_pass">
        <div className="change_input">
          <label htmlFor="otp">Enter OTP :</label>
          <input
            type="number"
            placeholder="Enter Your Otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.otp}</span>

          <label htmlFor="number">New Password :</label>
          <input
            type="password"
            placeholder="Enter Your New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.newPassword}</span>

          <label htmlFor="otp">Confirm Password :</label>
          <input
            type="password"
            placeholder="Enter Your Confirm Password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.confPassword}</span>

          <div style={{ marginTop: "30px", marginBottom: "15px" }}>
            <Button
              title="Change Password"
              isLoading={isLoading}
              onClick={() => changePassword()}
            />
          </div>
        </div>

        {/* <div className="forgate_balloon">
          <img src={Balloon} alt="balloon image" />
        </div> */}
        <ToastContainer />
      </div>
    </>
  );
};

export default ChangePassword;
