// This is the main file of the reducers;
import { combineReducers } from "redux";
import HandlePopup from "./HandlePopup";
import NormalRecord from "./NormalRecord";
import handleWishtListData from "./wishList";
const rootReducer = combineReducers({
    HandlePopup , NormalRecord,handleWishtListData,
})

export default rootReducer;