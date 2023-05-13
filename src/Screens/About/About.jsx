import React from "react";
import Footer2 from "../../Components/Common/Footer/Footer2";
import Navebar3 from "../../Components/Common/Navbar/Navebar3";
import TaskBar from "../../Components/HomeScreenDetails/TaskBar/TaskBar";

const About = () => {
  return (
    <>
      <div className="container-fluid">
        <Navebar3 />
        <TaskBar />
        <div className="row d-flex justify-content-center my-4 mt-5">
          <div
            className="col-lg-9 col-md-12 col-12 rounded shadow px-5 py-4"
            style={{ background: "#f0f0f075" }}
          >
            <h5 className="text-center">About XperienceIt</h5>
            <p className="content py-2">
              XperienceIt is making celebrations awesome since 2015! The idea
              stemmed from the fact that - We are so involved in our day to day
              lives that we forget to appreciate the moments that we work so
              hard for and the people who make it possbile!{" "}
            </p>
            <p className="font-weight-light font-italic text-center">
              The more you praise and celebrate your life, the more there is in
              life to celebrate
            </p>
            <h5 className="text-center my-2">
              What is the XperienceIt vision ?
            </h5>
            <p className="font-weight-light font-italic text-center">
              Our vision is to spread smiles throughout the world
            </p>
            <p className="content py-2">
              Whether it's an anniversary, loved one's birthday, a baby shower,
              an office party or just a prank - These are all celebrations which
              need to be cherished and with this vision we continue providing
              new experiences, unique surprises, phenomenal customer service and
              an incredible execution so that we can spread more smiles in the
              world!
            </p>
          </div>
        </div>

        <Footer2 />
      </div>
    </>
  );
};

export default About;
