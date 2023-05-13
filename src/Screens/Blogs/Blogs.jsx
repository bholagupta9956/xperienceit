// This is the blogs section of the experience it;

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
import { useHistory, generatePath, useLocation } from "react-router-dom";


const Blogs = () => {

  const location = useLocation();
  const history = useHistory();

  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllBlogs = () => {
    const url = endpoints.blogs.allBlogs;

    setLoading(true);

    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        if (res.data.status === true) {
          const val = res.data.body;
          setAllBlogs(val);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err, "this is the error");
      });
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const getBlogDetails = (data) => {

    const title = data.title.replaceAll(" ", "-");
    const path = generatePath("/blogs/:blog_name", {
      "blog_name": title,
    });
    history.push(path , {blogDetails : JSON.stringify(data)})
  };

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
          <div className="row d-flex justify-content-between  blogCont ">
            <div className="col-lg-12 col-md-12 col-sm-12 px-4 py-4  shadow rounded bg-light mb-5">
              {allBlogs.length != 0 &&
                allBlogs.map((itm, ind) => {
                  return (
                    <>
                      <PostingCard
                        data={itm}
                        key={ind}
                        getBlogDetails={getBlogDetails}
                      />
                    </>
                  );
                })}
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12 d-flex blogsright flex-column ">
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
              {/* <div className="col-12 shadow rounded bg-light py-4  ">
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

export default Blogs;
