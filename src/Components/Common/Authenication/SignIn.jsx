import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import Twitter from "./AuthImages/twitter.svg";
import Facebook from "./AuthImages/facebook.svg";
import Gmail from "./AuthImages/gmail.svg";
import Balloon from "./AuthImages/balloon.svg";
import { endpoints } from "../../../services/endpoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../elements/Button/Button";
import { validate } from "react-email-validator";
import Google from "./AuthImages/google.svg";
import Loader from "../../../utils/Loader";
import {
  LoginSocialGoogle,
} from "reactjs-social-login";

const SignIn = (props) => {

  const { setAuthScreen, setUserLogedIn, setShowAuthPopup } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const phoneNo = localStorage.getItem("phoneNo");
  const otp = localStorage.getItem("otp");
  const [showLoginButton, setLoginButton] = useState(true);
  const [showLogoutButton, setLogoutButton] = useState(false);


  const signIn = () => {
    if (name === "") {
      setErrors({ fullName: "Please enter your name" });
    } else if (name.length < 4) {
      setErrors({ fullName: "Full name must be greater than 3 character" });
    } else if (email === "") {
      setErrors({ email: "Please enter your email" });
    } else if (!validate(email)) {
      setErrors({ email: "Invalid email id" });
    } else {
      setErrors({});
      setIsLoading(true);

      const api = endpoints.authentication.otpVerify;
      const val = {
        name: name,
        email: email,
        phone: `91${phoneNo}`,
        otp: otp,
      };

      const headers = {
        "Content-type": "application/json; charset=UTF-8",
      };
      setIsLoading(true);
      axios
        .post(api, val, { headers: headers })
        .then((res) => {
          console.log(res , "signin response here");
          setIsLoading(false);
          if (res.data.status === true) {
            toast("Login Successfully", { type: "success" });
              const token = res.data.body.access_token;
              const userDetails = res.data.body.user;
              localStorage.setItem("userDetails", JSON.stringify(userDetails));
              localStorage.setItem("access_token", token);
              setUserLogedIn(true);
              setShowAuthPopup(false);
          }
          else if(res.data.status === false){
            toast(res.data.message , {type : "warning"})
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, " Sign In Failed");
        });
    }
  };

  //Login Via Social

  const handleSocialLogin = (user) => {
    const socialLoginUrl =
      "https://admin.xperienceit.in/api/login-via-socials";

    const val = {
      email: user._profile.email,
      first_name: user._profile.firstName,
      type: "facebook",
    };

    axios
      .post(socialLoginUrl, val)
      .then((res) => {
        console.log(res, "usersData response");
        if (res.data.status) {
          const token = res?.data?.access_token;
          toast("Login Successfully", { type: "success" });
          setUserLogedIn(true);
          setShowAuthPopup(false);
          const userDetails = res.data.body.user;
          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          localStorage.setItem("access_token", token);
        } else if (res.data.status === false) {
          toast(res.data.message, { type: "error" });
          setAuthScreen("loginWithOtp")
        }
      })
      .catch((err) => {
        console.log(err, "usersData error");
      });
  };

  const handleSocialLoginFailure = (error) => {
    console.log(error);
  };

  const responseFacebook = (response) => {
    console.log(response);
  };

  
  const loginHandler = (res) => {
    console.log("res", res.profileObj);
    setLoginButton(false);
    setLogoutButton(true);
  };
  const failureHandler = (res) => {
    console.log("login failed", res);
  };

  const logoutHandler = (res) => {
    alert("logout sucessfully");
    setLoginButton(true);
    setLogoutButton(false);
  };
  return (
    <>
      <div className="signInPage">
        <div className="signIn_input">
          <label htmlFor="text">Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.name}</span>

          <label htmlFor="text">Email</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span style={{ color: "red" }}>{errors.email}</span>

          <div style={{ marginTop: "30px", marginBottom: "15px" }}>
            <Button
              title="Login"
              isLoading={isLoading}
              onClick={() => signIn()}
            />
          </div>
        </div>
      
        <div className="signIn_balloon">
          <img src={Balloon} alt="balloon image" />
        </div>

        <ToastContainer />
      </div>
    </>
  );
};

export default SignIn;
