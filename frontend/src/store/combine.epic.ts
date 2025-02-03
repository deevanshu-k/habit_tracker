import { combineEpics } from "redux-observable";
import { fetchUserDetailEpic, signinEpic, signOutEpic } from "./auth/auth.epic";

export const rootEpic = combineEpics(
    signinEpic,
    fetchUserDetailEpic,
    signOutEpic
);
