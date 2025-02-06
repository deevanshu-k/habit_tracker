import { Action } from "redux";
import { Habit } from "../store.type";
import { AddHabitResponse } from "../../api/habit.api";

// Action types
export const FETCH_HABIT = "habit/fetch";
export const FETCH_HABIT_SUCCESS = "habit/fetchSuccess";
export const FETCH_HABIT_FAIL = "habit/fetchFail";
export const ADD_HABIT = "habit/add";
export const ADD_HABIT_SUCCESS = "habit/addSuccess";
export const ADD_HABIT_FAIL = "habit/addFail";

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

// Add Habit Action
export interface AddHabitAction extends Action {
    type: typeof ADD_HABIT;
    payload: {
        title: string;
        description: string;
        color: string;
    };
}
export const addHabitAction = (
    _title: string,
    _description: string,
    _color: string
): AddHabitAction => ({
    type: ADD_HABIT,
    payload: {
        title: _title,
        description: _description,
        color: _color,
    },
});

// Add Habit Success Action
export interface AddHabitSuccessAction extends Action {
    type: typeof ADD_HABIT_SUCCESS;
    payload: AddHabitResponse;
}
export const addHabitSuccessAction = (
    _habit: AddHabitResponse
): AddHabitSuccessAction => ({
    type: ADD_HABIT_SUCCESS,
    payload: _habit,
});

// Add Habit Success Action
export interface AddHabitFailAction extends Action {
    type: typeof ADD_HABIT_FAIL;
    payload: {
        error: string;
    };
}
export const addHabitFailAction = (_error: string): AddHabitFailAction => ({
    type: ADD_HABIT_FAIL,
    payload: {
        error: _error,
    },
});

// Actions
export type HabitActions =
    | FetchHabitAction
    | FetchHabitSuccessAction
    | FetchHabitFailAction
    | AddHabitAction
    | AddHabitSuccessAction
    | AddHabitFailAction;
