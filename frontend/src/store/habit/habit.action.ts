import { Action } from "redux";
import { Habit } from "../store.type";

// Action types
export const FETCH_HABIT = "habit/fetch";
export const FETCH_HABIT_SUCCESS = "habit/fetchSuccess";
export const FETCH_HABIT_FAIL = "habit/fetchFail";

// Fetch Habit Action
export interface FetchHabitAction extends Action {
    type: typeof FETCH_HABIT;
    payload: {
        month: number;
        year: number;
    };
}
export const fetchHabitAction = (
    _month: number,
    _year: number
): FetchHabitAction => ({
    type: FETCH_HABIT,
    payload: {
        month: _month,
        year: _year,
    },
});

// Fetch Habit Success Action
export interface FetchHabitSuccessAction extends Action {
    type: typeof FETCH_HABIT_SUCCESS;
    payload: {
        habits: Habit[];
    };
}
export const fetchHabitSuccessAction = (
    _habits: Habit[]
): FetchHabitSuccessAction => ({
    type: FETCH_HABIT_SUCCESS,
    payload: {
        habits: _habits,
    },
});

// Fetch Habit Fail Action
export interface FetchHabitFailAction extends Action {
    type: typeof FETCH_HABIT_FAIL;
    payload: {
        error: string;
    };
}
export const fetchHabitFailAction = (_error: string): FetchHabitFailAction => ({
    type: FETCH_HABIT_FAIL,
    payload: {
        error: _error,
    },
});

// Actions
export type HabitActions =
    | FetchHabitAction
    | FetchHabitSuccessAction
    | FetchHabitFailAction;
