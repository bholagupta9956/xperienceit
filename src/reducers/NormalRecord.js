// here we will keep nrmal recornd of the projec t;

import { FaGalacticSenate } from "react-icons/fa";

const initialState = {
    location : "Accross India" ,
    isLocationGot : true
}

const NormalRecord = (state = initialState , action) =>{

    if(action.type === "UPDATE_LOCATION"){
        return {
            ...state , location : action.payload , isLocationGot :  false 
        }
    }
    else if(action.type === "DELETE_LOCATION"){
        return {
            ...state , location : "Accross India" ,
            isLocationGot : false
        }
    }
    else {
        return state 
    }
}

export default NormalRecord ;