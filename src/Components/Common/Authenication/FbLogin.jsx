import React from "react";
import FacebookLogin from "react-facebook-login";
import { FaFacebook } from "react-icons/fa";
import axios from "axios";
import "./Social.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FbLogin = ({setUserLogedIn , setShowAuthPopup}) => {

  const responseFacebook = (response) => {
    console.log(response);
    const data = response;

    const socialLoginUrl =
    "https://admin.xperienceit.in/api/login-via-socials";

  const val = {
    email: data.email,
    first_name: data.name,
    type_login: "facebook",
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

  const failedResponse = (res) => {
    console.log(res);
  };
  const componentClicked = (data) => {
    console.warn(data);
  };

  return (
    <>
      <div className="facebookLogin">
        <FacebookLogin
          textButton=""
          appId="784025162894531"
          fields="name,email,picture"
          onSuccess={responseFacebook}
          onFailure={failedResponse}
          onClick={componentClicked}
          callback={responseFacebook}
          icon={<FaFacebook />}
        />
      </div>
    </>
  );
};

export default FbLogin;
