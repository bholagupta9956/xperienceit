// In this component we will maintian the task of the birthdayScreen ;
import React, { useState, useEffect } from "react";
import "./Birthday.css";
import Star from "./BirthdayImages/star.svg";

import { NavLink } from "react-router-dom";
import axios from "axios";



import { endpoints } from "../../services/endpoints";

const BirthdayCard = (props) => {
  return (
    <>
      <div className="birthdayCard" data-aos="flip-left">
        <img src={props.img} alt="anniversary img" />
        <div className="birthdayCard_box">
          <div className="birthday_box_row1">
            <h6>{props.heading}</h6>
            <div className="birthday_box_row1_star">
              <span>{props.rating}</span>
              <img src={Star} alt="star icon" />
            </div>
          </div>
          <div className="birthday_box_row2">
            <li className="pink_text">
              <span> ₹</span>
              <h5>{props.prices}</h5>
            </li>
            <li className="text2">
              <span>₹</span>
              <h6>{props.outlayprice && `₹ ${props.outlayprice}`}</h6>
            </li>
            <h6 className="text3">{props.discount}</h6>
          </div>
        </div>
        <NavLink to="productScreen" style={{ textDecoration: "none" }}>
          <button className="card_info_btn">Book now</button>
        </NavLink>
      </div>
    </>
  );
};

const BirthdayTaskBar = () => {
  // const breakPoints = [
  //   { width: 500, itemsToShow: 1 },
  //   { width: 600, itemsToShow: 2 },
  //   { width: 1050, itemsToShow: 3 },
  //   { width: 1100, itemsToShow: 4 },
  // ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const api = endpoints.birthday.birthdaySurprise;
    axios
      .get(api)
      .then((res) => {
        console.log(res,"birthdaySurprise")
        if (res.data.success) {
          const val = res.data.body;
          setData(val)
        }
      })
      .catch((err) => {
        console.error(err, "Error getting data Birthday surprise related data");
      });
  }, []);

  return (
    <>
      <div className="birthdayTaskbar">
        <h6>
          <span style={{ color: "var(--pink)" }}>Home</span> Birthday Services
        </h6>

        <div className="birthday_taskbar_box">
          <div className="birthday_taskbar_box_row1">
            <h3>Birthday Decoration Services</h3>
            <h6>|</h6>
            <h5>86 of 86 Gifts</h5>
          </div>
          <div className="birthday_taskbar_box_row2">
            <h5>Sort by:</h5>
            <span className="first">Recommended</span>
            <span>New</span>
            <span>Price : Low to High</span>
            <span>Price : High to Low</span>
          </div>

          <button className="birthday_taskbar_box_row1_btn">View all</button>
        </div>
        <div className="birthday_gifts">
        {data.map((item, index) => {
          return (
            <>
             
                <BirthdayCard
                  img={item.image_id}
                  heading={item.title}
                  prices={item.wholesale_price}
                  outlayprice={item.outlay_price}
                  discount={item.discount}
                  rating={item.rating}
                  review={item.review}
                  key={index.key}
                />

            </>
          );
        })}
        </div>
        

        <div className="birthday_para1" data-aos="fade-right">
          <p>
            {" "}
            Birthday is one of the most important occasions and there should be
            a memorable celebrations for that . Surprise your near and dear Ones
            on birthday with our awesome decoration services. The colorful
            balloons ,LED balloons , & polka dot balloons would be used to
            decorate the venue that would add the right amount of fun to this
            event . So , don't forget to contact us when you want to celebrate
            the birthday of you dear friend!
          </p>
        </div>

        <div className="birthday_para2" data-aos="fade-left">
          <h4>
            Make Your Celebrations Memorable With Our Exclusive Birthday Party
            Decoration
          </h4>
          <p>
            Every birthday celebration is special , be it's your dad's 50th
            birthday or your daughter's 18 birthday . The perfect birthday
            decoration can turn the entire decoration in the magical
            celebration. Also , it shows the person you are celebrating how much
            he/she means to you strenghten your relation with them . If your are
            in search of best birthday decoration services, then Ferns N Petals
            is the answer to all your problems . Whenever you need a birthday
            decoration at home or an exclusive birthday decoration at the party
            venue . We offer all the services at budget-friendly prices . Raging
            from ballon decoration services , flower decoration , car decoration
            , devotional decoration to wedding decoration , we offer a wide
            number of decoration services to make your events colorful and
            ultra-festive . It will give you and your guests a delightful memory
            of a particular event and occasion that will stay in your memory
            forever .{" "}
          </p>
        </div>
      </div>
    </>
  );
};

// exporting the component ;
export default BirthdayTaskBar;
