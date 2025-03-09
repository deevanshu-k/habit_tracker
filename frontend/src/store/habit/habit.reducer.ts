import { Habit, HabitFreqType, HabitState } from "../store.type";
import {
    ADD_HABIT_SUCCESS,
    DELETE_HABIT_SUCCESS,
    FETCH_HABIT_FAIL,
    FETCH_HABIT_SUCCESS,
    FETCH_TODAY_HABITS,
    FETCH_TODAY_HABITS_SUCCESS,
    HabitActions,
    UPDATE_HABIT,
    UPDATE_HABIT_SUCCESS,
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
            return {
                ...state,
                data: [...state.data, newHabit],
                today: state.today.isAlreadyFetched
                    ? {
                          ...state.today,
                          data:
                              newHabit.frequency_type ===
                                  HabitFreqType.FIXED_DAYS &&
                              newHabit.frequency[new Date().getDay()] === "1"
                                  ? [
                                        ...state.today.data,
                                        {
                                            id: newHabit.id,
                                            title: newHabit.title,
                                            description: newHabit.description,
                                            color: newHabit.color,
                                            is_done: false,
                                            note: "",
                                        },
                                    ]
                                  : [...state.today.data],
                      }
                    : { ...state.today },
            };
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
            const now = new Date();
            return {
                ...state,
                data: habits,
                today: state.today.isAlreadyFetched
                    ? {
                          ...state.today,
                          data: state.today.data.map((th) =>
                              action.payload.habit_id === th.id &&
                              action.payload.date === now.getDate()
                                  ? { ...th, is_done: action.payload.is_done }
                                  : th
                          ),
                      }
                    : { ...state.today },
            };
        case DELETE_HABIT_SUCCESS:
            return {
                ...state,
                data: state.data.filter((h) => h.id !== action.payload.id),
                today: {
                    ...state.today,
                    data: state.today.data.filter(
                        (h) => h.id !== action.payload.id
                    ),
                },
            };
        case UPDATE_HABIT:
            return {
                ...state,
            };
        case UPDATE_HABIT_SUCCESS:
            let newState: HabitState = state;
            if (action.payload.is_archived) {
                newState = {
                    ...state,
                    data: state.data.filter((h) => h.id !== action.payload.id),
                    today: {
                        ...state.today,
                        data: state.today.data.filter(
                            (h) => h.id !== action.payload.id
                        ),
                    },
                };
                return newState;
            }
            const currentDay = new Date().getDay();
            if (
                action.payload.frequency_type === HabitFreqType.FIXED_DAYS &&
                action.payload.frequency.length === 7
            ) {
                if (action.payload.frequency[currentDay] === "0") {
                    newState.today.data = newState.today.data.filter(
                        (h) => h.id !== action.payload.id
                    );
                } else if (
                    !newState.today.data.find((h) => h.id === action.payload.id)
                ) {
                    newState.today.data = [
                        ...newState.today.data,
                        {
                            id: action.payload.id,
                            title: action.payload.title,
                            description: action.payload.description,
                            color: action.payload.color,
                            is_done: false,
                            note: "",
                        },
                    ];
                }
            }
            newState = {
                ...state,
                data: state.data.map((h) =>
                    h.id === action.payload.id
                        ? {
                              ...h,
                              title: action.payload.title,
                              description: action.payload.description,
                              frequency_type: action.payload.frequency_type,
                              frequency: String(action.payload.frequency),
                              color: action.payload.color,
                              is_archived: action.payload.is_archived,
                          }
                        : h
                ),
                today: state.today.isAlreadyFetched
                    ? {
                          ...state.today,
                          data: state.today.data.map((h) =>
                              h.id === action.payload.id
                                  ? {
                                        ...h,
                                        title: action.payload.title,
                                        description: action.payload.description,
                                        frequency_type:
                                            action.payload.frequency_type,
                                        frequency: String(
                                            action.payload.frequency
                                        ),
                                        color: action.payload.color,
                                        is_archived: action.payload.is_archived,
                                    }
                                  : h
                          ),
                      }
                    : { ...state.today },
            };
            return newState;
        default:
            return { ...state };
    }
};
