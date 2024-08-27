import { combineReducers } from "redux";
import userSlice from "./User/userSlice";
import countrySlice from "./Country/countrySlice";
import stateSlice from "./State/stateSlice";
import citySlice from "./City/citySlice";
import clientSlice from "./Client/clientSlice";
import clientScrollSlice from "./Client/clientScrollSlice";


const rootReducer = combineReducers({
    user: userSlice,
    country: countrySlice,
    state: stateSlice,
    city: citySlice,
    client: clientSlice,
    clientscroll: clientScrollSlice,
})

export default rootReducer;