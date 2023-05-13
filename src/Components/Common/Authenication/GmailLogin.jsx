import React, { useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import "./Social.css";
import Google from "./AuthImages/google.svg";

const GmailLogin = () => {
  // Initialize Firebase
  const clientId =
    "120436807716-lqo0arsu3apt01fcede915munngn7b6g.apps.googleusercontent.com";

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });

  //   const thirdPartyLoginHandler = ({ response, provider, error }) => {
  //     console.log(" response>>", response)

  //  }
  //  const responseGoogle = (response) => {
  //     thirdPartyLoginHandler({ error: false, provider: 'google', response: response.profileObj })
  //     console.log(response,"google");
  //  }

  const onSuccess = (res) => {
    console.log("success: google login data", res);
  };
  const onFailure = (err) => {
    console.log("failed:", err);
  };

  return (
    <>
      <div className="googleLogin">
        <GoogleLogin
          // clientId="120436807716-lqo0arsu3apt01fcede915munngn7b6g.apps.googleusercontent.com"
          clientId={clientId}
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}><img src={Google} className="googleIcon"/></button>
          )}
          buttonText=" "
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
          // scope="https://www.googleapis.com/auth/drive.file"
          uxMode="redirect"
          redirectUri="http://localhost:3000"
        />
        ,
      </div>
    </>
  );
};

export default GmailLogin;
