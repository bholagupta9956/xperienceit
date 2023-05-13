import React, { useState, useEffect } from "react";
import "./profile.css";
import { Modal } from "react-bootstrap";

import Button from "../../elements/Button/Button";
import User from "../../../assets/icons/user.png";

import { endpoints } from "../../../services/endpoints";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Profile = (props) => {
  const { showProfile, setShowProfile, setUserProfile, setUserImg } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [refferalCode, setRefferalCode] = useState("sdrwd2342");
  const [errors, setErrors] = useState({});
  const [img, setImg] = useState("");
  const [imgFiles, setImgFiles] = useState([]);

  // const [image , setImage] = useState("")

  const api = endpoints.authentication.userProfiles;

  const accessToken = localStorage.getItem("access_token");

  const saveProfile = () => {
    if (names == "" || null) {
      setErrors({ name: "Name must not be blank" });
    } else if (names?.length < 3) {
      setErrors({ name: "Name must be greater than 3 character" });
    } else if (phoneNo === "") {
      setErrors({ phoneNo: "Phone no must not be blank" });
    }
    //  else if (phoneNo.length > 10) {
    //   setErrors({ phoneNo: "Invalid phone no" });
    // } 
    else {
      setErrors({});

      setIsLoading(true);

      const formData = new FormData();

      formData.append("first_name", names);
      formData.append("phone", phoneNo);
      formData.append("profileImg", imgFiles);
      formData.append("name", names);

      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      };

      axios
        .post("https://admin.xperienceit.in/api/updProfiles", formData, {
          headers: headers,
        })
        .then((result) => {
          console.log(result);
          if (result.data.status === true) {
            toast("Profile updated successfully", { type: "success" });
            setIsLoading(false);
            setShowProfile(false);
            getUserDetails();
          } else if (result.data.status === false) {
            toast(result.data.message, { type: "error" });
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err, "userdata not found  here");
        });
    }
  };

  const getUserDetails = () => {
    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      };

      fetch("https://admin.xperienceit.in/api/userProfiles", {
        headers: headers,
        method: "POST",
      })
        .then((rs) => rs.json())
        .then((result) => {
          if (result.status === true) {
            const data = result.body;
            setNames(data?.first_name);
            setEmail(data?.email);
            setPhoneNo(data?.phone);
            setRefferalCode(data?.own_referral_code);
            setIsLoading(false);
            setImg(data?.profileImg);
            //  setUserProfile(data?.profileImg)
            console.log(data?.profileImg);
            setUserImg(data?.profileImg);
          } else if (result.status === false) {
            toast(result.message, { type: "error" });
            setIsLoading(false);
          }
        })
        .catch((err) => {
          console.log(err, "this is th error");
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [accessToken, showProfile]);

  const handleChange = (e) => {
    setImgFiles(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
    setUserImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Modal
      show={showProfile}
      aria-labelledby="contained-modal-title-vcenter"
      size="lg"
      centered
    >
      <div className="auth">
        <div className="auth_logo" style={{ position: "relative" }}>
          <img
            src={img ? img : User}
            alt="logo icon"
            style={{ width: "100%" }}
          />
          <label htmlFor="uploadimg">+</label>
          <input
            type="file"
            name=""
            id="uploadimg"
            onChange={(e) => handleChange(e)}
            style={{ display: "none" }}
          />
        </div>

        <div className="auth_input otp_form profileCont">
          <label htmlFor="number">Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={names}
            onChange={(e) => setNames(e.target.value)}
          />
          <span>{errors.name}</span>

          <label htmlFor="number"> Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            readOnly={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>{errors.email}</span>

          <label htmlFor="number"> Phone No.</label>
          <input
            type="number"
            placeholder="Enter your phone no"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <span>{errors.phoneNo}</span>

          <label htmlFor="number"> Refferal Code</label>
          <input
            type="text"
            className="refCode"
            placeholder=""
            value={refferalCode}
            readOnly
          />

          <div className="profileBtn">
            <button className="savelBtn" onClick={saveProfile}>
              Save
            </button>

            <div className="cnclBtn">
              <button
                onClick={() => {
                  setShowProfile(false);
                  setErrors({});
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Modal>
  );
};

export default Profile;
