import React from 'react';
import Bride from "../../assets/icons/bride.png";
import Groom from "../../assets/icons/groom.png";

function MarriageLogin({setShowForm}) {
  return (
    <div className="col-lg-7 col-md-12 col-sm-12 px-0">
      <h5 className="text-center mt-4">Login with your email</h5>
      <form className="px-4 my-4 d-flex flex-column mrgLgnForm">
        
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
          
          

          <button
            type="button"
            class="btn text-light my-3"
            style={{
              width: "95%",
              margin: "auto",
              background: "var(--pink)",
            }}
          >
            Login
          </button>

          <div className="row d-flex text-center">
            <h6>
              Or <span className="mrgLogTxt" onClick={() => setShowForm("signup")}>Sign Up</span>
            </h6>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MarriageLogin