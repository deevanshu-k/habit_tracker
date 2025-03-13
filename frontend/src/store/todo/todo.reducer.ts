import { TodoState } from "../store.type";
import { LOGOUT_USER_SUCCESS } from "../user/user.action";
import {
    ADD_TODO,
    ADD_TODO_SUCCESS,
    DELETE_TODO,
    DELETE_TODO_SUCCESS,
    FETCH_TODAY_TODOS,
    FETCH_TODAY_TODOS_SUCCESS,
    TodoActions,
    UPDATE_TODO,
    UPDATE_TODO_SUCCESS,
} from "./todo.action";

const initialState: TodoState = {
    today: {
        isAlreadyFetched: false,
        data: [],
    },
};

export const todoReducer = (
    state: TodoState = initialState,
    action: TodoActions
): TodoState => {
    switch (action.type) {
        case LOGOUT_USER_SUCCESS:
            return {
                today: {
                    isAlreadyFetched: false,
                    data: [],
                },
            };
        case ADD_TODO:
            return { ...state };
        case ADD_TODO_SUCCESS:
            return {
                ...state,
                today: {
                    ...state.today,
                    data: [...state.today.data, action.payload],
                },
            };
        case FETCH_TODAY_TODOS:
            return {
                ...state,
                today: { isAlreadyFetched: true, data: [] },
            };
        case FETCH_TODAY_TODOS_SUCCESS:
            return {
                ...state,
                today: { ...state.today, data: action.payload },
            };
        case UPDATE_TODO:
            return { ...state };
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                today: {
                    ...state.today,
                    data: state.today.data.map((t) =>
                        t.id === action.payload.id ? action.payload : t
                    ),
                },
            };
        case DELETE_TODO:
            return { ...state };
        case DELETE_TODO_SUCCESS:
            return {
                ...state,
                today: {
                    ...state.today,
                    data: state.today.data.filter(
                        (t) => t.id !== action.payload.id
                    ),
                },
            };
        default:
            return { ...state };
    }
};
