// In this file we will manage both the sign and register component ;

import React, { useState } from "react";
import "./Auth.css";
import { Modal } from "react-bootstrap";
import BackgroundImg from "./AuthImages/background.svg";
import Logo from "./AuthImages/Layer2.png";
import Login from "./Login";
import Register from "./Register";
import Gmail from "./AuthImages/gmail.svg";
import Cut from "./AuthImages/cut.svg";
import OtpPage from "./OtpPage";
import OtpPanel from "./OtpPanel";
import EmailPanel from "./EmailPanel";
import ForgatePassword from "./ForgatePassword";
import ChangePassword from "./ChangePassword";
import SignIn from "./SignIn";
import FbLogin from "./FbLogin";
import GmailLogin from "./GmailLogin";

const AuthPopup = (props) => {
  const {
    showAuthPopup,
    setShowAuthPopup,
    setUserLogedIn,
    userLogedIn,
    authScreen,
    setAuthScreen,
  } = props;

  const [showLogin, setShowLogin] = useState(true);

  const [border, setBorder] = useState({
    login: "1.5px solid rgb(168, 161, 161 , 0.8)",
    register: "0px solid white",
  });

  const showLoginPage = () => {
    setShowLogin(true);
    setBorder({
      login: "1.5px solid rgb(168, 161, 161 , 0.8)",
      register: "0px solid white",
    });
  };

  const showRegisterPage = () => {
    setShowLogin(false);
    setBorder({
      login: "0px solid white",
      register: "1.5px solid rgb(168, 161, 161 , 0.8)",
    });
  };

  // here we are going to handle all the click events ;

  return (
    <>
      <Modal
        show={showAuthPopup}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
      >
        <div className="auth">
          <div className="auth_logoo">
            <img src={Logo} alt="logo icon" />
          </div>
          

          {authScreen === "otpScreen" && (
            <OtpPanel
              setAuthScreen={setAuthScreen}
              setShowAuthPopup={setShowAuthPopup}
              setUserLogedIn={setUserLogedIn}
            />
          )}
          {authScreen === "register" && (
            <Register
              setAuthScreen={setAuthScreen}
              setShowAuthPopup={setShowAuthPopup}
              setUserLogedIn={setUserLogedIn}
            />
          )}
          {authScreen === "emailPanel" && <EmailPanel />}
          {authScreen === "forgetPassword" && (
            <ForgatePassword setAuthScreen={setAuthScreen} />
          )}
          {authScreen === "changePassword" && (
            <ChangePassword setAuthScreen={setAuthScreen} />
          )}
          {authScreen === "loginWithOtp" && (
            <OtpPage
              setAuthScreen={setAuthScreen}
              setShowAuthPopup={setShowAuthPopup}
              setUserLogedIn={setUserLogedIn}
            />
          )}
         
          {authScreen === "userDetails" && (
            <SignIn
              setAuthScreen={setAuthScreen}
              setShowAuthPopup={setShowAuthPopup}
              setUserLogedIn={setUserLogedIn}
            />
          )}

          {authScreen === "login" && (
            <>
              <div className="auth_header">
                <div onClick={showLoginPage}>
                  <h4 style={{ borderBottom: border.login }}>Login</h4>
                </div>
                <div onClick={showRegisterPage}>
                  <h4 style={{ borderBottom: border.register }}>Register</h4>
                </div>
              </div>
              {showLogin ? (
                <Login {...props} />
              ) : (
                <Register setAuthScreen={setAuthScreen} />
              )}
            </>
          )}

          {/* footer part here */}

          <div className="otp_footer">
            <h6 className="d-flex justify-content-between align-items-center">
              <hr style={{ width: "40%" }} /> Or <hr style={{ width: "40%" }} />
            </h6>
            <div className="otp_footer_images">
              <div className="socialImgCon">
                <GmailLogin />
              </div>

              <div className="socialImgCon">
                <FbLogin
                  setShowAuthPopup={setShowAuthPopup}
                  setUserLogedIn={setUserLogedIn}
                />
              </div>

              <div className="socialImgCon "  >
                <img
                  src={Gmail}
                  alt="gmail icon"
                  onClick={() => setAuthScreen("login")}
                  className="googleEmail p-1"
                />
              </div>
            </div>
          </div>

          <p className="mb-4 text-center px-2" style={{fontSize: 13}}>By Logging in you are agreeing to our <a target="_blank" href="/tnc"><span style={{color: 'rgb(0, 0, 255)', textDecoration: 'underline'}}>Terms and Conditions</span></a> and our <a target="_blank" href="/privacy-policy"><span style={{color: 'rgb(0, 0, 255)', textDecoration: 'underline'}}>Privacy Policy</span></a></p>


          <div className="auth_cut" onClick={() => setShowAuthPopup(false)}>
            <img src={Cut} alt="cut icon" />
          </div>
        </div>
      </Modal>
    </>
  );
};

// exporting the component ;
export default AuthPopup;
