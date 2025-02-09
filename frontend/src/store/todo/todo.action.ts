import { Action } from "redux";
import { TodayTodo } from "../store.type";

// Action types
export const FETCH_TODAY_TODOS = "todo/today/fetch";
export const FETCH_TODAY_TODOS_SUCCESS = "todo/today/fetchSuccess";
export const FETCH_TODAY_TODOS_FAIL = "todo/today/fetchFail";
export const ADD_TODO = "todo/add";
export const ADD_TODO_SUCCESS = "todo/addSuccess";
export const ADD_TODO_FAIL = "todo/addFail";
export const UPDATE_TODO = "todo/update";
export const UPDATE_TODO_SUCCESS = "todo/updateSuccess";
export const UPDATE_TODO_FAIL = "todo/updateFail";
export const DELETE_TODO = "todo/delete";
export const DELETE_TODO_SUCCESS = "todo/deleteSuccess";
export const DELETE_TODO_FAIL = "todo/deleteFail";

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

// Add todo action
export interface AddTodoAction extends Action {
    type: typeof ADD_TODO;
    payload: string;
}
export const addTodoAction = (_title: string): AddTodoAction => ({
    type: ADD_TODO,
    payload: _title,
});

// Add todo success action
export interface AddTodoSuccessAction extends Action {
    type: typeof ADD_TODO_SUCCESS;
    payload: TodayTodo;
}
export const addTodoSuccessAction = (
    _todo: TodayTodo
): AddTodoSuccessAction => ({
    type: ADD_TODO_SUCCESS,
    payload: _todo,
});

// Add todo fail action
export interface AddTodoFailAction extends Action {
    type: typeof ADD_TODO_FAIL;
    payload: {
        error: string;
    };
}
export const addTodoFailAction = (_error: string): AddTodoFailAction => ({
    type: ADD_TODO_FAIL,
    payload: {
        error: _error,
    },
});

// Update todo action
export interface UpdateTodoAction extends Action {
    type: typeof UPDATE_TODO;
    payload: {
        id: string;
        title: string;
        is_done: boolean;
    };
}
export const updateTodoAction = (
    _id: string,
    _title: string,
    _is_done: boolean
): UpdateTodoAction => ({
    type: UPDATE_TODO,
    payload: {
        id: _id,
        title: _title,
        is_done: _is_done,
    },
});

// Add todo success action
export interface UpdateTodoSuccessAction extends Action {
    type: typeof UPDATE_TODO_SUCCESS;
    payload: TodayTodo;
}
export const updateTodoSuccessAction = (
    _todo: TodayTodo
): UpdateTodoSuccessAction => ({
    type: UPDATE_TODO_SUCCESS,
    payload: _todo,
});

// Add todo fail action
export interface UpdateTodoFailAction extends Action {
    type: typeof UPDATE_TODO_FAIL;
    payload: {
        error: string;
    };
}
export const updateTodoFailAction = (_error: string): UpdateTodoFailAction => ({
    type: UPDATE_TODO_FAIL,
    payload: {
        error: _error,
    },
});

// Delete todo action
export interface DeleteTodoAction extends Action {
    type: typeof DELETE_TODO;
    payload: {
        id: string;
    };
}
export const deleteTodoAction = (_id: string): DeleteTodoAction => ({
    type: DELETE_TODO,
    payload: {
        id: _id,
    },
});

// Delete todo success action
export interface DeleteTodoSuccessAction extends Action {
    type: typeof DELETE_TODO_SUCCESS;
    payload: {
        id: string;
    };
}
export const deleteTodoSuccessAction = (
    _id: string
): DeleteTodoSuccessAction => ({
    type: DELETE_TODO_SUCCESS,
    payload: {
        id: _id,
    },
});

// Delete todo fail action
export interface DeleteTodoFailAction extends Action {
    type: typeof DELETE_TODO_FAIL;
    payload: {
        error: string;
    };
}
export const deleteTodoFailAction = (_error: string): DeleteTodoFailAction => ({
    type: DELETE_TODO_FAIL,
    payload: {
        error: _error,
    },
});

// Actions
export type TodoActions =
    | FetchTodayTodosAction
    | FetchTodayTodosSuccessAction
    | FetchTodayTodosFailAction
    | AddTodoAction
    | AddTodoSuccessAction
    | AddTodoFailAction
    | UpdateTodoAction
    | UpdateTodoSuccessAction
    | UpdateTodoFailAction
    | DeleteTodoAction
    | DeleteTodoSuccessAction
    | DeleteTodoFailAction;
