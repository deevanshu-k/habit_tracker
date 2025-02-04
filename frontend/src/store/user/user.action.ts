import { Action } from "redux";
import { UserDetail } from "../store.type";

// Action types
export const FETCH_USER = "user/fetch";
export const FETCH_USER_SUCCESS = "user/fetchSuccess";
export const FETCH_USER_FAIL = "user/fetchFail";

// Fetch User Action
export interface FetchUserAction extends Action {
    type: typeof FETCH_USER
}
export const fetchUserAction = ():FetchUserAction => ({
    type: FETCH_USER
})

// Fetch User Success Action
export interface FetchUserSuccessAction extends Action {
    type: typeof FETCH_USER_SUCCESS;
    payload: {
        user: UserDetail
    }
}
export const fetchUserSuccessAction = (_user:UserDetail):FetchUserSuccessAction => ({
    type: FETCH_USER_SUCCESS,
    payload: {
        user: _user
    }
})

// Fetch User Fail Action
export interface FetchUserFailAction extends Action {
    type: typeof FETCH_USER_FAIL;
    payload: {
        error: string
    }
}
export const fetchUserFailAction = (_error: string):FetchUserFailAction => ({
    type: FETCH_USER_FAIL,
    payload: {
        error: _error
    }
})

// Actions
export type UserActions = FetchUserAction | FetchUserSuccessAction | FetchUserFailAction