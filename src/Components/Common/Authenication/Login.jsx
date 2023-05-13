// This is the login component  which will be used inside the authenication file ;

import React, { useState, useRef } from "react";
import "./Auth.css";
import Twitter from "./AuthImages/twitter.svg";
import Facebook from "./AuthImages/facebook.svg";
import Gmail from "./AuthImages/gmail.svg";
import Balloon from "./AuthImages/balloon.svg";
import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../elements/Button/Button";
import { validate } from "react-email-validator";
import { initializeApp } from "firebase/app";
import Google from "./AuthImages/google.svg";
import { LoginSocialGoogle } from "reactjs-social-login";
// import { MdBackup } from "react-icons/md";
import { TbArrowBackUp } from "react-icons/tb";
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from "@greatsumini/react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import "./Social.css";
import FbLogin from "./FbLogin";
import GmailLogin from "./GmailLogin";

const Login = (props) => {
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState("");
  const { setUserLogedIn, setShowAuthPopup, setAuthScreen } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [fblogin, setFBLogin] = useState(false);
  const api = endpoints.authentication.login;

  const login = () => {
    if (email === "") {
      setErrors({ email: "Email must not be blank" });
    } else if (!validate(email)) {
      setErrors({ email: "Invalid email" });
    } else if (password === "") {
      setErrors({ password: "Please Enter Your Password" });
    } else if (password.length < 6) {
      setErrors({ password: "Password must be atleast 6 characters" });
    } else {
      setErrors({});

      setIsLoading(true);

      const data = {
        email: email,
        password: password,
      };
      const headers = {
        "Content-Type": "application/json; charset=utf-8",
      };

      axios
        .post(api, data, { headers: headers })
        .then((res) => {
          console.log();
          setIsLoading(false);
          console.log(res, "All Login Data");
          if (res.data.status === true) {
            toast("Login Successfully", { type: "success" });
            setShowAuthPopup(false);
            const token = res.data.body.access_token;
            const userDetails = res.data.body.user;
            localStorage.setItem("userDetails", JSON.stringify(userDetails));
            localStorage.setItem("access_token", token);
            setUserLogedIn(true);
          } else if (res.data.status === false) {
            toast(res.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, "Invalid Login ");
        });
    }
  };

  // from here we are handling the social login;

  const googleRef = useRef();

  const onLoginStart = () => {
    // alert("login start");
  };

  const onLogoutFailure = () => {
    alert("logout fail");
  };

  const onLogoutSuccess = () => {
    setProfile(null);
    setProvider("");
  };

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
      <div className="back" onClick={() => setAuthScreen("loginWithOtp")}>
        <span>
          <TbArrowBackUp />
        </span>
      </div>

      <div className="login">
        <div className="auth_input">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Enter Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.email}</span>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.email}</span>
          <span>{errors.password}</span>
          {/* <span style={{ color: "red", fontSize: "14px" }}>{errors}</span> */}
          <div style={{ marginTop: "30px", marginBottom: "15px" }}>
            <Button title="Login" onClick={login} isLoading={isLoading} />
            <div className="LogFor">
              <div className="Log mb-0">
                <span
                  className="otp_page"
                  onClick={() => setAuthScreen("loginWithOtp")}
                >
                  Login via otp
                </span>
              </div>
              <div className="Forg mb-0">
                <span
                  className="forgotPage mb-0"
                  onClick={() => setAuthScreen("forgetPassword")}
                >
                  Forgot Password
                </span>
              </div>
            </div>
          </div>
        </div>

       

        <ToastContainer />
      </div>
    </>
  );
};

// exporting the component ;
export default Login;
