import React from "react";
import "./marriageForm.css";
import Bride from "../../assets/icons/bride.png";
import Groom from "../../assets/icons/groom.png";

function MarriageSignup({setShowForm}) {
  return (
    <div className="col-lg-7 col-md-12 col-sm-12 px-0">
      <h5 className="text-center mt-4">Sign up with your email</h5>
      <form className="px-4 my-4">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Location</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter location"
          />
        </div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
            <input
              type="date"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="date"
            />
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <input
              type="number"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Phone no."
            />
          </div>
          <div className="row my-1">
            <div className="col-lg-3 col-md-4 col-3 ">I am</div>
            <div className="col-lg-4 col-md-4 col-4 ">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label " htmlFor="flexRadioDefault1">
                <img src={Bride} alt="" className="w-25 mx-1" />
                <span>Bride</span>
              </label>
            </div>
            <div className="col-lg-4 col-md-4 col-4 ">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
              />
              <label className="form-check-label " htmlFor="flexRadioDefault1">
                <img src={Groom} alt="" className="w-25 mx-1" />
                <span>Groom</span>
              </label>
            </div>
          </div>

          <button
            type="button"
            class="btn text-light my-3"
            style={{
              width: "95%",
              margin: "auto",
              background: "var(--pink)",
            }}
          >
            Sign Up
          </button>

          <div className="row d-flex text-center">
            <h6>
              Or <span className="mrgLogTxt" onClick={() => setShowForm("login")}>Login</span>
            </h6>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MarriageSignup;
