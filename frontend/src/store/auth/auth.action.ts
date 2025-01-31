import { Action } from "redux";

export const SIGNIN = "auth/signin" as const;
export const SIGNIN_SUCCESS = "auth/signinSuccess" as const;
export const SIGNOUT = "auth/signout" as const;

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface SigninAction extends Action {
    type: typeof SIGNIN;
}

export interface SigninSuccessAction extends Action {
    type: typeof SIGNIN_SUCCESS;
    payload: User;
}

export interface SignOutAction extends Action {
    type: typeof SIGNOUT;
}

// Union type for all auth actions
export type AuthActions = SigninAction | SigninSuccessAction | SignOutAction;

// Action creators with proper typing
export const signin = (): SigninAction => ({
    type: SIGNIN,
});

export const signinSuccess = (user: User): SigninSuccessAction => ({
    type: SIGNIN_SUCCESS,
    payload: user,
});

export const signout = (): SignOutAction => ({
    type: SIGNOUT,
});
