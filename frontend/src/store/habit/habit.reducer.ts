import { Habit, HabitState } from "../store.type";
import {
    ADD_HABIT_SUCCESS,
    FETCH_HABIT_FAIL,
    FETCH_HABIT_SUCCESS,
    FETCH_TODAY_HABITS,
    FETCH_TODAY_HABITS_SUCCESS,
    HabitActions,
    UPDATE_HABITLOG_SUCCESS,
} from "./habit.action";

const initialState: HabitState = {
    data: [],
    today: {
        data: [],
        isAlreadyFetched: false,
    },
};

export const habitReducer = (
    state: HabitState = initialState,
    action: HabitActions
): HabitState => {
    switch (action.type) {
        case FETCH_TODAY_HABITS:
            return { ...state, today: { isAlreadyFetched: true, data: [] } };
        case FETCH_TODAY_HABITS_SUCCESS:
            return {
                ...state,
                today: { ...state.today, data: action.payload },
            };
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
        case UPDATE_HABITLOG_SUCCESS:
            let habits = state.data.map((h) => {
                if (h.id === action.payload.habit_id) {
                    return {
                        ...h,
                        logs: h.logs.map((l) => {
                            if (l.date === action.payload.date) {
                                return {
                                    ...l,
                                    is_done: action.payload.is_done,
                                    note: action.payload.note,
                                };
                            }
                            return l;
                        }),
                    };
                }
                return h;
            });
            return { ...state, data: habits };
        default:
            return { ...state };
    }
};
