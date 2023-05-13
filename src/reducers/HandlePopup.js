// here we write all the function of the authenication ;

const initialState = {
    show : ""
}

const HandlePopup = (state = initialState , action ) =>{
    if(action.type === "OPEN_AUTHENICATION"){
         return {
             ...state , show : "authenication_popup"
         }
    }
    else if(action.type === "CLOSE_POPUP"){
        return {
            ...state , show : "close_popup" 
        }
    }
    else if(action.type === "OPEN_XPERIENCE_SELECT"){
        return {
            ...state , show : "xperience_select"
        }
    }
    else if(action.type === "SHOW_LOCATION_POPUP"){
        return {
            ...state , show : "show_location"
        }
    }
    else {
        return state ;
    }
}

export default HandlePopup;