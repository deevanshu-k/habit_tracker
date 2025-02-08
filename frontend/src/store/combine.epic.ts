import { combineEpics } from "redux-observable";
import { fetchUserEpic, logoutUserEpic } from "./user/user.epic";
import {
    addHabitEpic,
    getHabitsEpic,
    getTodayHabitsEpic,
    updateHabitLogEpic,
} from "./habit/habit.epic";
import { addTodosEpic, getTodayTodosEpic } from "./todo/todo.epic";

export const rootEpic = combineEpics<any>(
    logoutUserEpic,
    fetchUserEpic,
    getHabitsEpic,
    addHabitEpic,
    updateHabitLogEpic,
    getTodayHabitsEpic,
    getTodayTodosEpic,
    addTodosEpic
);
