import { Habit, HabitFreqType, HabitState } from "../store.type";
import {
    ADD_HABIT,
    ADD_HABIT_SUCCESS,
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
        case ADD_HABIT_SUCCESS:
            let newHabit: Habit = {
                id: action.payload.id,
                title: action.payload.title,
                description: action.payload.description,
                color: action.payload.color,
                frequency_type: action.payload.frequency_type,
                frequency: action.payload.frequency,
                is_archived: false,
                is_deleted: false,
                logs: Array.from({ length: 31 }).map((_, k) => ({
                    id: "",
                    date: k + 1,
                    is_done: false,
                    note: "",
                })),
            };
            return { ...state, data: [...state.data, newHabit] };
        default:
            return { ...state };
    }
};
