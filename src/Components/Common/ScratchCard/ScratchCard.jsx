// This is the scratch card component ;
import React from "react";
import {Modal} from "react-bootstrap"
import "./Scratch.css";
import Background from "./background.png";
import couponCover from "./card.jpeg";
import ScratchCard from 'react-scratch-coupon'

const ScratchCards = () =>{

   
    return(<>
    <Modal
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
        size="lg"
        centered
      >
    <div className="scratch">
        <div className="scratch_background">
            <img src={Background} alt="background img" />
        </div>
        <h2>Congratulation</h2>
        <h4>You earn a scratch card </h4>
        <ScratchCard width={300} height={200} cover={couponCover} className = "scratchCard">
		<form className="form" >
			<h2>Hello There!</h2>
			<h1><code>Coupon code : 1651613335</code></h1>
		</form>
	  </ScratchCard>
     
       
    </div>
    </Modal>
    </>)
}

// exporting the scratchCard ;
export default ScratchCards ;