
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import { BsArrowRightCircleFill } from "react-icons/bs";
import "./TourPanel2.css";
import axios from "axios";
import { endpoints } from "../../../services/endpoints";
import { useEffect,useState } from 'react';
import Skeleton from "@mui/material/Skeleton";



const Card = (props) => {
  return (
    <>

      <div class='item'>
        <div className="package-col">
          <div className="media-img">
            {props.img ? <img src={props.img} alt="first tour" /> : <Skeleton variant="rectangular" height={400} />}
            <div className="details">
              <h3>{props.text1 ? props.text1 : <Skeleton variant="text" width={100} />}</h3>
              <h2>{props.text2 ? props.text2 : <Skeleton variant="text" width={160} />}</h2>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};







const TourPanel2 = (props) => {


  const [data, setData] = useState([1, 2, 3, 4, 5, 6]);

  useEffect(() => {
    const api = endpoints.home.tour;
    axios
      .get(api)
      .then((res) => {
        // console.log(res, "this is the response ");
        if (res.data.status === true) {
          const val = res.data.body;
          setData(val);
        }
      })
      .catch((err) => {
        console.log(err, "this is the error ");
      });
  }, []);


  const options = {
    margin: 0,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    // navText: ["Prev", "Next"],
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      600: {
        items: 1,
      },
      700: {
        items: 2,
      },
      1000: {
        items: 4,

      }
    },
  };

  return (
    <>
      <div className="tour-pack-slider">

        <div className="tour-section-slider">
          <div className="container-fluid common-container">
            <div className="title-with-button">
              <div className="row">
                <div className="title-col">
                  <h2>Our <span>Xperience Tour</span></h2>
                  <div className="more-btn">
                    <button className='btn more-btn'>View All <BsArrowRightCircleFill /></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OwlCarousel className='owl-theme category' id='category' items={5} loop margin={10} dots={false} {...options} nav>


          {data.map((item, index) => {
              return (
                <>
                  <Card
                    img={item.image_path}
                    text1={item.name}
                    text2={item.title}
                   
                    key={index}
                  />
                </>
              );
            })}




          </OwlCarousel>

        </div>

      </div>

    </>
  )
}

export default TourPanel2;
