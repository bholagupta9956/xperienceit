// This is the store of the project ;
import rootReducer from "./reducers/index";
import { createStore } from "redux";




const store = createStore(rootReducer ,
    //applyMiddleware(thunkMiddleware) 
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    
    )

export default store ;