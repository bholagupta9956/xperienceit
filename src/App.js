import React, { useEffect } from "react";
import HomeScreen from "./Screens/HomeScreen";
import BirthdayScreen from "./Screens/BirthdayScreen";
import ProductScreen from "./Screens/ProductScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import BirthdayGiftsScreen from "./Screens/BirthdayGiftsScreen";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonScreenPackeges from "./Screens/CommonScreenPackeges";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoriesPackegesScreen from "./Screens/CategoriesPackegesScreen";
import SubCategoryScreen from "./Screens/SubCategoryScreen";
import OfferScreen from "./Screens/OfferScreen";
import AllPackagesScreen from "./Screens/AllPackagesScreen";
import TourForm8 from "./Components/TourForm/TourForm8";
import BookingScreen from "./Screens/BookingScreen";
// import Navebar3 from "./Components/Common/Navbar/Navebar3";
import Menu from "./Components/Common/Navbar/Navbar2";
import AllPackageDetailsScreens from "./Screens/AllPackageDetailsScreens";
import WishlistScreen from "./Screens/WishlistScreen";
import UpcomingBooking from "./Screens/UpcomingBooking";
import PastBookingScreen from "./Screens/PastBookingScreen";
import FacebookLogin from "./Components/Common/Authenication/FbLogin";
import GmailLogin from "./Components/Common/Authenication/GmailLogin";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "video-react/dist/video-react.css";
import TermsConditions from "./Screens/TermsConditions/TermsConditions";
import Blogs from "./Screens/Blogs/Blogs";
import About from "./Screens/About/About";
import PrivacyPolicy from "./Screens/PrivacyPolicy/PrivacyPolicy";
import BlogDetails from "./Screens/Blogs/BlogDetails";
import BookingDetails from "./Screens/BookingDetails/BookingDetails";
import WhoWeAre from "./Screens/WhoWeAre/WhoWeAre";
import Invoice from "./Screens/Invoice/Invoice2";
import Contact from "./Screens/Contact/Contact";


const App = () => {
  
  const firebaseConfig = {
    apiKey: "AIzaSyDyB82j8L6CxenGVKE3hqOMVAQcJJZhRAI",
    authDomain: "xperienceit-caf4d.firebaseapp.com",
    projectId: "xperienceit-caf4d",
    storageBucket: "xperienceit-caf4d.appspot.com",
    messagingSenderId: "120436807716",
    appId: "1:120436807716:web:92cc6e0c302fc48a16a0b1",
    measurementId: "G-CL2Q9JPYH7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  AOS.init();
  document.onkeydown = function (e) {
    if (e.keyCode === 123) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
      return false;
    }
    if (e.ctrlKey && e.keyCode === "S".charCodeAt(0)) {
      return false;
    }
  };

  
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/menu" component={Menu} />
            <Route
              exact
              path="/birthday_gifts/"
              component={BirthdayGiftsScreen}
            />
            <Route exact path="/birthday_screen" component={BirthdayScreen} />
            <Route
              exact
              path="/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id"
              component={ProductScreen}
            />
            <Route
              exact
              path="/experiences/:location/:sub_category_name/:sub_category_id/child-category/:child_category_name/:child_category_id"
              component={CommonScreenPackeges}
            />
            {/* <Route exact path="/experiences/:location/:sub_category_name/:sub_category_id" component={CommonScreenPackeges}/> */}
            <Route
              exact
              path="/experiences/:location/category/:category_name/:category_id"
              component={CategoriesPackegesScreen}
            />
            <Route
              exact
              path="/experiences/:location/subCategory/:subCategory_name/:subCategory_id"
              component={SubCategoryScreen}
            />
            <Route
              exact
              path="/experiences/offer/:location/:offerName/:offerId"
              component={OfferScreen}
            />
            <Route exact path="/all_packages" component={AllPackagesScreen} />
            <Route exact path="/tour" component={TourForm8} />
            <Route
              exact
              path="/experiences/booking/:location/:parent_name/:parent_id/:package_name/:package_id"
              component={BookingScreen}
            />
            <Route
              exact
              path="/all_packages_details"
              component={AllPackageDetailsScreens}
            />
            <Route exact path="/wishlist" component={WishlistScreen} />
            <Route
              exact
              path="/upcoming-bookings"
              component={UpcomingBooking}
            />
            <Route exact path="/past-bookings" component={PastBookingScreen} />
            <Route exact path="/google" component={GmailLogin} />
            <Route exact path="/tnc" component={TermsConditions} />
            <Route exact path="/blogs" component={Blogs} />
            <Route exact path="/blogs/:blog_name" component={BlogDetails} />
            <Route exact path="/about" component={About} />
            <Route exact path="/privacy-policy" component={PrivacyPolicy} />
            <Route
              exact
              path="/experiences/:location/:sub_category_name/:sub_category_id/:package_name/:package_id/booking-details/:booking_id"
              component={BookingDetails}
            />
            <Route exact path="/who-we-are" component={WhoWeAre}/>
            {/* <Route exact path="/inv/:booking_id" component={Invoice}/> */}
            <Route exact path="/inv/:booking_id" component={Invoice}/>
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </Router>
        <ToastContainer limit={1} />
      </div>
    </>
  );
};

export default App;

