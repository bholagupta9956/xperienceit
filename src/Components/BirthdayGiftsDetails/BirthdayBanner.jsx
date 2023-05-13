// This is the birthday banner ; which we are creating just for demo purpose ;
import React , {useState ,useEffect} from "react";
import "./birthdayGifts.css";
import Carousel from "react-elastic-carousel";

import {useDispatch} from "react-redux";
import {showXperienceSelect} from "../../actions/index"
import RightArrow from "./BirthdayGiftsImages/rightarrow.svg";
import axios from "axios";
import { endpoints } from "../../services/endpoints";


const Card = (props) => {
  
  console.log(props.img ,"image here")
  return (
    <>
      <div className="birthdayImg">
          <img src={props.img} alt="background img" />
          <div className="birthday_text" >
              <div data-aos="zoom-in" >
            <h2>Birthday Gifts</h2>
            <h4>#MakeItGrand</h4>
            </div>
          </div>
      </div>
    </>
  );
};

const BirthdayBanner = () => {
  const dispatch = useDispatch();
  const breakPoints = [
    { width: 500, itemsToShow: 1 },
    { width: 600, itemsToShow: 1 },
    { width: 1050, itemsToShow: 1 },
    { width: 1100, itemsToShow: 1 },
  ];

  const [data ,setData] = useState([]);

  useEffect(() => {
    const api = endpoints.birthday.banner ;
    axios.get(api)
    .then((res) =>{
      if(res.data.success){
        const val = res.data.body;
        setData(val)
      }
    })
    .catch((err) =>{
      console.log(err ,"this is the error which we are getting here")
    })
  },[]);

  return (
    <>
      <div className="birthdayBanner">
        <Carousel breakPoints={breakPoints}>
         
          {data.map((item,index) =>{
            return(<>
            <Card img={item.image_path} key={index}/></>)
          })}
        </Carousel>

        {/* here we are adding the smaall bar ; */}
        <div className="main_bottom_bar">
          <div className="main_bottom_bar_1">
          <h5>Search your</h5>
            <h3>Xperiences</h3>
            </div>
          <div
            className="main_bottom_bar_2"
            onClick={() => dispatch(showXperienceSelect())}
          >
            <h4>
              Occasion
              <br /> <span>Anniversary</span>
            </h4>
            <img src={RightArrow} alt="arrow icon" />
          </div>
          <div className="main_bottom_bar_3">
            <h5>Find Surprises</h5>
          </div>
        </div>

      </div>
    </>
  );
};

// exporting the component ;
export default BirthdayBanner;
