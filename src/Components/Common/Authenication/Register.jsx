// this is the component which will be used inside the authepopup ;

import React, { useState } from "react";
import "./Auth.css";
import { validate } from "react-email-validator";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../elements/Button/Button";
import "react-toastify/dist/ReactToastify.css";
import { TbArrowBackUp } from "react-icons/tb";

const Register = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [refferalCode, setRefferalCode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {setShowAuthPopup,setUserLogedIn,setAuthScreen } = props;

  const register = () => {
    if (fullName === "") {
      setErrors({ fullName: "Please enter your name" });
    } else if (fullName.length < 4) {
      setErrors({ fullName: "Full name must be greater than 3 character" });
    } else if (email === "") {
      setErrors({ email: "Please enter your email" });
    } else if (!validate(email)) {
      setErrors({ email: "Invalid email -id" });
    } else if (phoneNo === "") {
      setErrors({ phoneNo: "Please enter phone no." });
    } else if (phoneNo.length !== 10) {
      setErrors({ phoneNo: "Phone must be of 10 digit" });
    } else if (password === "") {
      setErrors({ password: "Please enter password" });
    } else if (password.length < 6) {
      setErrors({ password: "Password must be greater than 6 character" });
    } else {


       const registerUrl = endpoints.authentication.register;
       //const registerUrl = 'https://xperienceit.in/api/user-register';

      setErrors({});
      setIsLoading(true);

      const val = {
        first_name: fullName,
        email: email,
        password: password,
          phone: `91${phoneNo}`,
        referral_code: refferalCode,
      };

      const headers = {
        "Content-type": "application/json; charset=UTF-8",
      };


      axios
        .post(registerUrl, val, { headers: headers })
        .then((res) => {
          console.log(res, "register successfully");
          setIsLoading(false);
          if (res.data.status === true) {
            toast(res.data.message, { type: "success" });
            const token = res.data.body.access_token;
            localStorage.setItem("access_token",token);
            setUserLogedIn(true);
            setShowAuthPopup(false);
          } else if (res.data.status === false) {
            toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, "this is the error");
        });
    }
  };

  return (
    <>
     <div className="back"   onClick={() => setAuthScreen("loginWithOtp")}>
    {/* <span><MdBackup/></span> */}
    <span><TbArrowBackUp/></span>
    </div>
      <div className="register">
        <div className="register_row row">
          <div className="register_row_col col-sm-12 col-md-6 col-lg-6 ">
            <label htmlFor="firstName">
              Full Name{" "}
              <span style={{ color: "red", fontSize: "20px" }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter First Name"
              id="firstName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <span className="errorText">{errors.fullName}</span>
          </div>
          <div className="register_row_col col-sm-12 col-md-6 col-lg-6 ">
            <label htmlFor="number">
              Mobile No{" "}
              <span style={{ color: "red", fontSize: "20px" }}>*</span>
            </label>
            <input
              type="number"
              placeholder="Enter Mobile No."
              id=" number"
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <span className="errorText">{errors.phoneNo}</span>
          </div>
        </div>
        <div className="register_row row">
          <div className="register_row_col col-sm-12 col-md-6 col-lg-6 ">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter E-mail"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="errorText">{errors.email}</span>
          </div>
          <div className="register_row_col col-sm-12 col-md-6 col-lg-6 ">
            <label htmlFor="number">
              Password <span style={{ color: "red", fontSize: "20px" }}>*</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              id=" number"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="errorText">{errors.password}</span>
          </div>
        </div>
        <div className="register_row row">
          <div className="register_row_col referral col-sm-12 col-md-12 col-lg-12 ">
            <label htmlFor="refferal">Referral Code (optional)</label>
            <input
              type="text"
              placeholder="ABCDE"
              id="refferal"
              value={refferalCode}
              onChange={(e) => setRefferalCode(e.target.value)}
            />
          </div>
        </div>
        {/* <button  className="rgst_btn">Register</button> */}
        <div style={{ marginBottom: "40px" }} className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <button onClick={register} title="Register" isLoading={isLoading} className="regBttn">Register</button>
        </div>
        </div>
        {/* here we are adding toast container */}
        <ToastContainer />
      </div>
    </>
  );
};

// exporting the file ;
export default Register;
