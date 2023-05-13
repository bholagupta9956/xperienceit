import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import parse from "html-react-parser";
import './WhoWeAre.css';
const WhoWeAre = () => {
 const [whoWeAre,setWhoWeAre]=useState([])   
useEffect(()=>{
 const whoweareUrls="https://admin.xperienceit.in/api/who-we-are";
axios
.get(whoweareUrls)
.then((res)=>{
    if(res.data.status===true){
        var val=res.data.body;
        setWhoWeAre(val)
    }
})
.catch((err)=>{
    console.log(err,"Who we are response not found")
})
},[])
console.log(whoWeAre,"Who we are")

  return (
    <>
    <div className='container-fluid'>
        {whoWeAre.map((item,index)=>{
            return(
                <>
            <h4 style={{fontSize:"30px"}}>{item.title}</h4>
            <span>{item.desc && parse(item.desc)}</span>
            </>
            )
        })}
    </div>
    </>
  )
}

export default WhoWeAre;