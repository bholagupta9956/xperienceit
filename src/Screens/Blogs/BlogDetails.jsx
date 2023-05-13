import React, { useEffect, useState } from "react";
import Navebar3 from "../../Components/Common/Navbar/Navebar3";
import "./blogs.css";
import Logo from "../../assets/icons/Layer2.png";
import PostingCard from "../../Components/Blogs/PostingCard/PostingCard";
import { ImSearch } from "react-icons/im";
import GuidesCard from "../../Components/Blogs/GuidesCard/GuidesCard";
import Footer2 from "../../Components/Common/Footer/Footer2";
import { endpoints } from "../../services/endpoints";
import axios from "axios";
import Img2 from "../../assets/images/new-year.png";
import { GiPlainSquare } from "react-icons/gi";
import HtmlParser from "react-html-parser";
import { useLocation, useHistory } from "react-router-dom";

const BlogDetails = () => {

  const location = useLocation();
  const history = useHistory();

  var blogDetails = location.state.blogDetails;
  blogDetails = JSON.parse(blogDetails);


  return (
    <>
      <div className="container-fluid ">
        <Navebar3 />
        <div className="row blogsCont d-flex justify-content-center">
          <div className="col-12 d-flex justify-content-center my-4 ">
            <img src={Logo} alt="" className="blogLogo" />
          </div>
          <div className="col-12 d-flex justify-content-center my-1 flex-column align-items-center">
            <h1 className="fw-bolder ">XperienceIt Guides</h1>
            <h6 className="text-secondary text-uppercase">
              Come XperienceIt with us
            </h6>
          </div>

          {/* adding the bottom container */}
          <div className="py-5 row d-flex justify-content-between  blogCont">
            <div className="col-lg-12 col-md-12 col-sm-12  py-4  shadow rounded bg-light ">
              <div className="row postingCrdCont">
                <h3 className="fw-bold my-2 " style={{ width: "100%" }}>
                  {blogDetails.title}
                </h3>
                <div className="col-12 d-flex align-items-center my-4">
                  <h6 className="text-secondary pr-2 fs-6 text-uppercase">
                    {blogDetails.user_person}
                  </h6>
                  <h6 className="text-secondary pr-2 fs-6">
                    <GiPlainSquare size={6} />
                  </h6>
                  <h6 className="text-secondary pr-2 fs-6 text-uppercase">
                    {blogDetails.date}
                  </h6>
                  <h6 className="text-secondary pr-2 fs-6">
                    <GiPlainSquare size={6} />
                  </h6>
                  {/* <h6 className="text-secondary pr-2 fs-6 text-uppercase">
                    LEAVE A COMMENT
                  </h6> */}
                </div>
                <img
                  src={blogDetails.image_id ? blogDetails.image_id : Img2}
                  alt=""
                  className="mb-2"
                />
              </div>

              {/* here we are showing the details of the blogs */}

              {blogDetails.blog_part.length != 0 &&
                blogDetails.blog_part.map((itm, ind) => {
                  return (
                    <>
                      <div
                        className="row postingCrdCont px-0"
                        style={{ marginTop: "2rem", marginBottom: "2rem" }}
                        key={ind}
                      >
                        <h4 className="fw-bold my-2 " style={{ width: "80%" }}>
                          {itm.title}
                        </h4>
                        <img
                          src={itm.image ? itm.image : Img2}
                          alt=""
                          className="mb-2"
                        />
                        <p
                          className="text-secondary my-1 "
                          style={{ fontSize: "14px" }}
                        >
                          {HtmlParser(itm.content)}
                        </p>
                      </div>
                    </>
                  );
                })}

              {/* ------------------------------ */}
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 d-flex align-items-end flex-column ">
              {/* <div className="col-11 shadow rounded bg-light py-4  px-4  mb-5">
                <div className="input-group my-2 px-3 blogsInput ">
                  <input
                    type="text"
                    className="form-control rounded-0 "
                    placeholder="Search and Hit Enter"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    style={{ height: "47px" }}
                  />
                  <div className="input-group-append">
                    <span
                      class="input-group-text rounded-0 "
                      style={{ background: "#e04f67" }}
                      id="basic-addon2"
                    >
                      <ImSearch color="white" />
                    </span>
                  </div>
                </div>
              </div> */}
              {/* <div className="col-11 shadow rounded bg-light py-4  px-4 ">
                <h6
                  className="text-uppercase text-center fw-bold text-light py-2 rounded-1 fs-6 "
                  style={{ background: "#663399" }}
                >
                  Latest Guides
                </h6>
                <GuidesCard />
                <GuidesCard />
                <GuidesCard />
                <GuidesCard />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default BlogDetails;
