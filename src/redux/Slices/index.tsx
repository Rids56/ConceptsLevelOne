import { combineReducers } from "redux";
import userSlice from "./User/userSlice";
import countrySlice from "./Country/countrySlice";


const rootReducer = combineReducers({
    user: userSlice,
    country: countrySlice,
})

export default rootReducer;