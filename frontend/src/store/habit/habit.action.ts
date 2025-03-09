import { Action } from "redux";
import { Habit, HabitFreqType, TodayHabit } from "../store.type";
import { AddHabitResponse, UpdateHabitResponse } from "../../api/habit.api";

// Action types
export const FETCH_HABIT = "habit/fetch";
export const FETCH_HABIT_SUCCESS = "habit/fetchSuccess";
export const FETCH_HABIT_FAIL = "habit/fetchFail";
export const ADD_HABIT = "habit/add";
export const ADD_HABIT_SUCCESS = "habit/addSuccess";
export const ADD_HABIT_FAIL = "habit/addFail";
export const UPDATE_HABITLOG = "habit/log/update";
export const UPDATE_HABITLOG_SUCCESS = "habit/log/updateSuccess";
export const UPDATE_HABITLOG_FAIL = "habit/log/updateFail";
export const FETCH_TODAY_HABITS = "habit/today/fetch";
export const FETCH_TODAY_HABITS_SUCCESS = "habit/today/fetchSuccess";
export const FETCH_TODAY_HABITS_FAIL = "habit/today/fetchFail";
export const DELETE_HABIT = "habit/delete";
export const DELETE_HABIT_SUCCESS = "habit/deleteSuccess";
export const DELETE_HABIT_FAIL = "habit/deleteFail";
export const UPDATE_HABIT = "habit/update";
export const UPDATE_HABIT_SUCCESS = "habit/updateSuccess";
export const UPDATE_HABIT_FAIL = "habit/updateFail";

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
        f: number | string;
    };
}
export const addHabitAction = (
    _title: string,
    _description: string,
    _color: string,
    _f: number | string
): AddHabitAction => ({
    type: ADD_HABIT,
    payload: {
        title: _title,
        description: _description,
        color: _color,
        f: _f,
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

// Update Habit Log Action
export interface UpdateHabitLogAction extends Action {
    type: typeof UPDATE_HABITLOG;
    payload: {
        habit_id: string;
        date: number;
        month: number;
        year: number;
        is_done: boolean;
        note: string;
    };
}
export const updateHabitLogAction = (
    _habit_id: string,
    _date: number,
    _month: number,
    _year: number,
    _is_done: boolean,
    _note: string
): UpdateHabitLogAction => ({
    type: UPDATE_HABITLOG,
    payload: {
        habit_id: _habit_id,
        date: _date,
        month: _month,
        year: _year,
        is_done: _is_done,
        note: _note,
    },
});

// Update Habit Log Success Action
export interface UpdateHabitLogSuccessAction extends Action {
    type: typeof UPDATE_HABITLOG_SUCCESS;
    payload: {
        habit_id: string;
        date: number;
        month: number;
        year: number;
        is_done: boolean;
        note: string;
    };
}
export const updateHabitLogSuccessAction = (_log: {
    habit_id: string;
    date: number;
    month: number;
    year: number;
    is_done: boolean;
    note: string;
}): UpdateHabitLogSuccessAction => ({
    type: UPDATE_HABITLOG_SUCCESS,
    payload: _log,
});

// Update Habit Log Fail Action
export interface UpdateHabitLogFailAction extends Action {
    type: typeof UPDATE_HABITLOG_FAIL;
    payload: {
        error: string;
    };
}
export const updateHabitLogFailAction = (
    _error: string
): UpdateHabitLogFailAction => ({
    type: UPDATE_HABITLOG_FAIL,
    payload: {
        error: _error,
    },
});

// Fetch today habits action
export interface FetchTodayHabitsAction extends Action {
    type: typeof FETCH_TODAY_HABITS;
}
export const fetchTodayHabitsAction = (): FetchTodayHabitsAction => ({
    type: FETCH_TODAY_HABITS,
});

// Fetch today habits success action
export interface FetchTodayHabitsSuccessAction extends Action {
    type: typeof FETCH_TODAY_HABITS_SUCCESS;
    payload: TodayHabit[];
}
export const fetchTodayHabitsSuccessAction = (
    _habits: TodayHabit[]
): FetchTodayHabitsSuccessAction => ({
    type: FETCH_TODAY_HABITS_SUCCESS,
    payload: _habits,
});

// Fetch today habits fail action
export interface FetchTodayHabitsFailAction extends Action {
    type: typeof FETCH_TODAY_HABITS_FAIL;
    payload: {
        error: string;
    };
}
export const fetchTodayHabitsFailAction = (
    _error: string
): FetchTodayHabitsFailAction => ({
    type: FETCH_TODAY_HABITS_FAIL,
    payload: {
        error: _error,
    },
});

// Delete habit action
export interface DeleteHabitAction extends Action {
    type: typeof DELETE_HABIT;
    payload: {
        id: string;
    };
}
export const deleteHabitAction = (id: string): DeleteHabitAction => ({
    type: DELETE_HABIT,
    payload: {
        id,
    },
});

// Delete habit success action
export interface DeleteHabitSuccessAction extends Action {
    type: typeof DELETE_HABIT_SUCCESS;
    payload: {
        id: string;
    };
}
export const deleteHabitSuccessAction = (
    id: string
): DeleteHabitSuccessAction => ({
    type: DELETE_HABIT_SUCCESS,
    payload: {
        id,
    },
});

// Delete habit fail action
export interface DeleteHabitFailAction extends Action {
    type: typeof DELETE_HABIT_FAIL;
    payload: {
        error: string;
    };
}
export const deleteHabitFailAction = (
    _error: string
): DeleteHabitFailAction => ({
    type: DELETE_HABIT_FAIL,
    payload: {
        error: _error,
    },
});

// Update habit action
export interface UpdateHabitAction extends Action {
    type: typeof UPDATE_HABIT;
    payload: {
        id: string;
        title: string;
        description: string;
        color: string;
        f_type: HabitFreqType;
        f: number | string;
        is_archived: boolean;
    };
}
export const updateHabitAction = (
    _id: string,
    _title: string,
    _description: string,
    _color: string,
    _f_type: HabitFreqType,
    _f: number | string,
    _is_archived: boolean
): UpdateHabitAction => ({
    type: UPDATE_HABIT,
    payload: {
        id: _id,
        title: _title,
        description: _description,
        color: _color,
        f_type: _f_type,
        f: _f,
        is_archived: _is_archived,
    },
});

// Update habit success action
export interface UpdateHabitSuccessAction extends Action {
    type: typeof UPDATE_HABIT_SUCCESS;
    payload: UpdateHabitResponse;
}
export const updateHabitSuccessAction = (
    _habit: UpdateHabitResponse
): UpdateHabitSuccessAction => ({
    type: UPDATE_HABIT_SUCCESS,
    payload: _habit,
});

// Update habit fail action
export interface UpdateHabitFailAction extends Action {
    type: typeof UPDATE_HABIT_FAIL;
    payload: {
        error: string;
    };
}
export const updateHabitFailAction = (
    _error: string
): UpdateHabitFailAction => ({
    type: UPDATE_HABIT_FAIL,
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
    | AddHabitFailAction
    | UpdateHabitLogAction
    | UpdateHabitLogSuccessAction
    | UpdateHabitLogFailAction
    | FetchTodayHabitsAction
    | FetchTodayHabitsSuccessAction
    | FetchTodayHabitsFailAction
    | DeleteHabitAction
    | DeleteHabitSuccessAction
    | DeleteHabitFailAction
    | UpdateHabitAction
    | UpdateHabitSuccessAction
    | UpdateHabitFailAction;
