// here we are storing the wishlist data ;


const initialState = {
    wishListArray : [] ,
    status : false
}

const handleWishtListData = (state = initialState , action) =>{
    if(action.type === "UPDATE_WISHLIST"){
        return {
            ...state , wishListArray : action.payload
        }
    }
    else if(action.type === "CALL_WISHLIST_DATA"){
        return {
            ...state , status : !state.status
        }
    }
    else {
        return state ;
    }
}

export default handleWishtListData; 
