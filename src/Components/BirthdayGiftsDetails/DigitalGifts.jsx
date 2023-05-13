// This is the digital gifts section ;

import React , {useEffect ,useState} from "react";

import Carousel from "react-elastic-carousel"
import Star from "./BirthdayGiftsImages/star.svg";
import "./birthdayGifts.css";
import axios from "axios";
import { endpoints } from "../../services/endpoints";
import Skeleton from "@mui/material/Skeleton";


const Card = (props) =>{
    return (<>
         <div className="card" data-aos="flip-left" data-aos-duration="600" key={props.key}>
        <div className="card_img">
          {props.img ? <img src={props.img} alt="movie img" /> : <Skeleton height={250} variant="rectangular"/>}
          
        </div>
        <div className="card_info">
          <div className="card_info_1">
            <h5>{props.heading ? props.heading : <Skeleton variant="text"/>}</h5>
            <h6> {props.price ? `₹ ${props.price}` : <Skeleton  variant="text" width={80}/>}</h6>
            <span>Get It Today</span>
          </div>

          <div className="card_info_2">
          
            <div className="card_info_box">
              <h6>{props.rating}</h6>
              <img src={Star} alt="star icon" width="15px" />
            </div>
            <span>{props.review} Reviews</span>
          </div>
        </div>
      </div>
    </>)
}

const DigitalGifts = () =>{
    const breakPoints = [
        
        {width :500 , itemsToShow : 1 },
        {width : 600 , itemsToShow : 2},
        {width : 1050 , itemsToShow : 3},
        {width : 1100 , itemsToShow : 4}
      ]

      const [data ,setData] = useState([]);

      useEffect(() =>{
        const api = endpoints.birthday.digitalGifts;

        axios.get(api)
        .then((res) =>{
            console.log(res , "this is the response");
            if(res.data.success){
                const val = res.data.body ;
                setData(val)
            }
        })
        .catch((err) =>{
            console.log(err ,"this is the error which we are getting here")
        })
      },[]);

    return(<>

    <div className="digitalGifts">
    <div className="coupleOffers_heading">
            <h3>Digital Gifts</h3>
            <button>View all</button>
        </div>

        <div className="seller1">
        <Carousel breakPoints = {breakPoints} >
            
            {data.map((item,index) =>{
                return(<>
                    <Card img = {item.image_id} heading = {item.title} price = {item.outlay_price} key={index} rating={item.rating} review={item.review}/>
                </>)
            })}
           
        </Carousel>
    </div>
    </div>
    </>)
}

// exporting the digitalGifts component ;
export default DigitalGifts ;