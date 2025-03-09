import { combineEpics } from "redux-observable";
import { fetchUserEpic, logoutUserEpic } from "./user/user.epic";
import {
    addHabitEpic,
    deleteHabitEpic,
    getHabitsEpic,
    getTodayHabitsEpic,
    updateHabitEpic,
    updateHabitLogEpic,
} from "./habit/habit.epic";
import {
    addTodosEpic,
    deleteTodosEpic,
    getTodayTodosEpic,
    updateTodosEpic,
} from "./todo/todo.epic";

export const rootEpic = combineEpics<any>(
    logoutUserEpic,
    fetchUserEpic,
    getHabitsEpic,
    addHabitEpic,
    updateHabitLogEpic,
    getTodayHabitsEpic,
    getTodayTodosEpic,
    addTodosEpic,
    updateTodosEpic,
    deleteTodosEpic,
    deleteHabitEpic,
    updateHabitEpic
);
