import { combineEpics } from "redux-observable";
import { fetchUserEpic, logoutUserEpic } from "./user/user.epic";

export const rootEpic = combineEpics(logoutUserEpic, fetchUserEpic);
