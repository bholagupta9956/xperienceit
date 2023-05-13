// here we will define all the function of the project ;

// defining the authenication function ;

export const openAuthenication = () =>{
    return {
        type : "OPEN_AUTHENICATION"
    }
}

export const closePopup = () =>{
    return  {
        type : "CLOSE_POPUP"
    }
}

export const showXperienceSelect = () =>{
    return {
        type : "OPEN_XPERIENCE_SELECT"
    }
}

export const showLocationPopup = () =>{
    return{
        type : "SHOW_LOCATION_POPUP"
    }
}

// WRITING THE FUNCTION WHICH WILL BE USED TO UPDATE THE LOCATION OF THE USER ;

export const updateLocation  = (data) =>{
    return {
        type : "UPDATE_LOCATION" ,
        payload : data
    }
}


// WRITING CODE FOR HANDLING THE WISHLIST ;

export const updateWishList = (data) =>{
    return {
        type : "UPDATE_WISHLIST" ,
        payload : data
    }
}

export const callWishListData = () =>{
    return {
        type : "CALL_WISHLIST_DATA"
    }
}