import { combineEpics } from "redux-observable";
import { fetchUserEpic, logoutUserEpic } from "./user/user.epic";
import { addHabitEpic, getHabitsEpic } from "./habit/habit.epic";

export const rootEpic = combineEpics<any>(
    logoutUserEpic,
    fetchUserEpic,
    getHabitsEpic,
    addHabitEpic
);
