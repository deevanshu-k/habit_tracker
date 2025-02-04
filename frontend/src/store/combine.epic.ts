import { combineEpics } from "redux-observable";
import { fetchUserEpic } from "./user/user.epic";

export const rootEpic = combineEpics(fetchUserEpic);
