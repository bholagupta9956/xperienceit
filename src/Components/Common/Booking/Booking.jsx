// this is  the booking component here we are creating ;
import React, { useEffect, useState } from "react";
import "./Booking.css";
import Cake from "./BookingImages/cake.svg";
import CandleLight from "./BookingImages/candle-light.svg";
import Anniversary from "./BookingImages/anniversary.svg";
import Car from "./BookingImages/car.svg";
import Cinema from "./BookingImages/cinema.svg";
import Couple from "./BookingImages/wedding-couple.svg";
import Carousel from 'react-elastic-carousel';



const Card = ({img , text}) => {


  return (
    <>
      <div className="carousel_item" data-aos="fade-up">
        <div className="carousel_item_box">
          <img src={img} alt="cake icon" />
        </div>
        <h4>{text}</h4>
      </div>
    </>
  );
};

const Booking = () => {

  
const data = [
    {id : 1 , text : "Birthday Surprises" , img : Cake},
    {id : 2 , text : "Anniversary" , img : Anniversary },
    {id : 3 , text : "Candle light dinner" , img : CandleLight} ,
    {id : 4 , text : "Long rides" , img : Car},
    {id : 5 , text : "Private movie" , img : Cinema},
    {id : 6 , text : 'Marriage' , img : Couple}
  ]

  const breakPoints = [
    {width : 500 , itemsToShow : 2},
    {width : 600 , itemsToShow : 2 },
    {width : 680 , itemsToShow : 3 },
    {width : 900 , itemsToShow : 4},
    {width : 1100 , itemsToShow : 5},
    {width : 1300 , itemsToShow : 6}
  ]

  return (
    <>
    <div className="booking">
      <Carousel breakPoints = {breakPoints}
      className = "carousel_container">

       
      <Card img = {Cake} text = "Birthday Surprises"/>
      <Card img = {Anniversary} text = "Anniversary"/>
      <Card img = {CandleLight} text = "Candle light dinner"/>
      <Card img = {Car} text = "Long rides"/>
      <Card img = {Cinema} text = "Private movie" />
      <Card img = {Couple} text = "Marriage"/>
      <Card img = {Cake} text = "Birthday Surprises"/>
      <Card img = {Anniversary} text = "Anniversary"/>
      <Card img = {CandleLight} text = "Candle light dinner"/>
      <Card img = {Car} text = "Long rides"/>
      <Card img = {Cinema} text = "Private movie" />
      <Card img = {Couple} text = "Marriage"/>
    
      </Carousel>
      
    </div>
     
    </>
  );
};

// exporting the component ;
export default Booking;
