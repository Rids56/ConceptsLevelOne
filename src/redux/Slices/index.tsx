import { combineReducers } from "redux";
import userSlice from "./User/userSlice";
import countrySlice from "./Country/countrySlice";
import stateSlice from "./State/stateSlice";
import citySlice from "./City/citySlice";


const rootReducer = combineReducers({
    user: userSlice,
    country: countrySlice,
    state: stateSlice,
    city: citySlice,
})

export default rootReducer;