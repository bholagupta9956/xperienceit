// This is the popup handler of the component which will manage all the popup; which will be handled with the help of redux ;

import React from "react";
import AuthPopup from "../Components/Common/Authenication/AuthPopup";
import { useSelector } from "react-redux";
import Location from "../Components/Common/ChooseLocation/Location"
import XperienceSelect from "../Components/HomeScreenDetails/XperienceSelect/XperienceSelect";

const PopupHandler = () =>{
    const mystate = useSelector((state) => state.HandlePopup.show)
   
    if(mystate === "authenication_popup"){
        return <AuthPopup/>
    }
    else if(mystate === "xperience_select"){
        return <XperienceSelect/>
    }
    else if(mystate === "show_location"){
        return <Location/>
    }
    else if(mystate === "close_popup"){
        return null ;
    }
    

    return (<>
    </>)
}

// exporting the popuphandler ;
export default PopupHandler ;