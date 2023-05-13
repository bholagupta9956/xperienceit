import React from 'react';
import "./nodata.css";
import Nodataimg from "../../../assets/images/nodata.png";


const Nodata = () => {
  return (
    <div className='noDataCont'>
        <img src={Nodataimg} alt="nodata img" />
    </div>
  )
}

export default Nodata