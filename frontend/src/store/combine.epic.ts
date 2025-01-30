import { combineEpics } from "redux-observable";
import { signinEpic } from "./auth/auth.epic";

export const rootEpic = combineEpics(signinEpic);
