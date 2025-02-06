import { HabitState } from "../store.type";
import {
    FETCH_HABIT_FAIL,
    FETCH_HABIT_SUCCESS,
    HabitActions,
} from "./habit.action";

const initialState: HabitState = {
    data: [],
};

export const habitReducer = (
    state: HabitState = initialState,
    action: HabitActions
): HabitState => {
    switch (action.type) {
        case FETCH_HABIT_SUCCESS:
            return { ...state, data: action.payload.habits };
        case FETCH_HABIT_FAIL:
            return { ...state, data: [] };
        default:
            return { ...state };
    }
};
