import { Action } from "redux";
import { UserDetail } from "../store.type";

export const SIGNIN = "auth/signin";
export const SIGNIN_SUCCESS = "auth/signinSuccess";
export const SIGNIN_FAIL = "auth/signinFail";
export const SIGNUP = "auth/signup";
export const SIGNUP_SUCCESS = "auth/signupSuccess";
export const SIGNUP_FAIL = "auth/signupFail";
export const SIGNOUT = "auth/signout";
export const SIGNOUT_SUCCESS = "auth/signoutSuccess";
export const FETCH_USER = "user/detail";
export const FETCH_USER_SUCCESS = "user/detailSuccess";
export const FETCH_USER_FAIL = "user/detailFAIL";

export interface User {
    id: string;
    name: string;
    email: string;
}

// Signin
export interface SigninAction extends Action {
    type: typeof SIGNIN;
    payload: { email: string; password: string };
}

export interface SigninSuccessAction extends Action {
    type: typeof SIGNIN_SUCCESS;
    payload: User;
}

export interface SigninFailAction extends Action {
    type: typeof SIGNIN_FAIL;
    error: string;
}

export const signin = (email: string, password: string): SigninAction => ({
    type: SIGNIN,
    payload: {
        email,
        password,
    },
});

export const signinSuccess = (user: User): SigninSuccessAction => ({
    type: SIGNIN_SUCCESS,
    payload: user,
});

export const signinFail = (error: string): SigninFailAction => ({
    type: SIGNIN_FAIL,
    error,
});

// Signup
export interface SignupAction extends Action {
    type: typeof SIGNUP;
}

export interface SignupSuccessAction extends Action {
    type: typeof SIGNUP_SUCCESS;
    payload: User;
}

export interface SignupFailAction extends Action {
    type: typeof SIGNUP_FAIL;
    error: string;
}

export const signup = (): SignupAction => ({
    type: SIGNUP,
});

export const signupSuccess = (user: User): SignupSuccessAction => ({
    type: SIGNUP_SUCCESS,
    payload: user,
});

export const signupFail = (error: string): SignupFailAction => ({
    type: SIGNUP_FAIL,
    error,
});

// Signout
export interface SignOutAction extends Action {
    type: typeof SIGNOUT;
}

export const signout = (): SignOutAction => ({
    type: SIGNOUT,
});

export interface SignOutSuccessAction extends Action {
    type: typeof SIGNOUT_SUCCESS;
}

export const signoutSuccess = (): SignOutSuccessAction => ({
    type: SIGNOUT_SUCCESS,
});

// Fetch user
export interface FetchUserDetailAction extends Action {
    type: typeof FETCH_USER;
}
export const fetchUserDetail = (): FetchUserDetailAction => ({
    type: FETCH_USER,
});
export interface FetchUserDetailSuccessAction extends Action {
    type: typeof FETCH_USER_SUCCESS;
    payload: UserDetail;
}
export const fetchUserDetailSuccess = (
    user: UserDetail
): FetchUserDetailSuccessAction => ({
    type: FETCH_USER_SUCCESS,
    payload: user,
});
export interface FetchUserDetailFailAction extends Action {
    type: typeof FETCH_USER_FAIL;
    error: string;
}
export const fetchUserDetailFail = (
    error: string
): FetchUserDetailFailAction => ({
    type: FETCH_USER_FAIL,
    error,
});

// Union type for all auth actions
export type AuthActions =
    | SigninAction
    | SigninSuccessAction
    | SigninFailAction
    | SignupAction
    | SignupSuccessAction
    | SignupFailAction
    | SignOutAction
    | SignOutSuccessAction
    | FetchUserDetailAction
    | FetchUserDetailSuccessAction
    | FetchUserDetailFailAction;
