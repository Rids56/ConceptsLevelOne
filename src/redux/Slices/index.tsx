import { combineReducers } from "redux";
import userSlice from "./User/userSlice";


const rootReducer = combineReducers({
    user: userSlice,
})

export default rootReducer;