import { Action } from "redux";
import { TodayTodo } from "../store.type";

// Action types
export const FETCH_TODAY_TODOS = "todo/today/fetch";
export const FETCH_TODAY_TODOS_SUCCESS = "todo/today/fetchSuccess";
export const FETCH_TODAY_TODOS_FAIL = "todo/today/fetchFail";

// Fetch today todos action
export interface FetchTodayTodosAction extends Action {
    type: typeof FETCH_TODAY_TODOS;
}
export const fetchTodayTodosAction = (): FetchTodayTodosAction => ({
    type: FETCH_TODAY_TODOS,
});

// Fetch today todos success action
export interface FetchTodayTodosSuccessAction extends Action {
    type: typeof FETCH_TODAY_TODOS_SUCCESS;
    payload: TodayTodo[];
}
export const fetchTodayTodosSuccessAction = (
    _todos: TodayTodo[]
): FetchTodayTodosSuccessAction => ({
    type: FETCH_TODAY_TODOS_SUCCESS,
    payload: _todos,
});

// Fetch today todos fail action
export interface FetchTodayTodosFailAction extends Action {
    type: typeof FETCH_TODAY_TODOS_FAIL;
    payload: {
        error: string;
    };
}
export const fetchTodayTodosFailAction = (
    _error: string
): FetchTodayTodosFailAction => ({
    type: FETCH_TODAY_TODOS_FAIL,
    payload: {
        error: _error,
    },
});

// Actions
export type TodoActions =
    | FetchTodayTodosAction
    | FetchTodayTodosSuccessAction
    | FetchTodayTodosFailAction;
