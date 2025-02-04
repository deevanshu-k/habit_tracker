import { combineReducers } from "redux";
import { globalReducer } from "./global/global.reducer";
import { userReducer } from "./user/user.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
});

export default rootReducer;
