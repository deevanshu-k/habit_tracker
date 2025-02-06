import { combineReducers } from "redux";
import { globalReducer } from "./global/global.reducer";
import { userReducer } from "./user/user.reducer";
import { habitReducer } from "./habit/habit.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
    habit: habitReducer,
});

export default rootReducer;
