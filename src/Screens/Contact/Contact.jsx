import React, { useEffect, useState } from "react";
import "./contact.css";
import Footer2 from "../../Components/Common/Footer/Footer2";
import Navebar3 from "../../Components/Common/Navbar/Navebar3";
import TaskBar from "../../Components/HomeScreenDetails/TaskBar/TaskBar";
import ContactForm from "../../Components/ContactFom/ContactForm";

const Contact = () => {
  const [updateLocation, setUpdateLocation] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const [taskBarData, setTaskBarData] = useState([]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div className="contactScreen">
      <Navebar3
        updateLocation={updateLocation}
        setUpdateLocation={setUpdateLocation}
        showSideBar={showSideBar}
        setShowSideBar={setShowSideBar}
        taskBarData={taskBarData}
      />
    
      <TaskBar
        updateLocation={updateLocation}
        setTaskBarData={setTaskBarData}
      />
        <ContactForm />
      <Footer2 />
    </div>
  );
};

export default Contact;
