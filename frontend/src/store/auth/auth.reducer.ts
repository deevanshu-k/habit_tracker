import { AuthState } from "../store.type";
import {
    AuthActions,
    FETCH_USER,
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS,
    SIGNIN,
    SIGNIN_FAIL,
    SIGNIN_SUCCESS,
    SIGNOUT,
    SIGNOUT_SUCCESS,
} from "./auth.action";

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const authReducer = (
    state: AuthState = initialState,
    action: AuthActions
): AuthState => {
    switch (action.type) {
        case SIGNIN:
            return { ...state, loading: true };
        case SIGNIN_SUCCESS:
            return { ...state, loading: false };
        case SIGNIN_FAIL:
            return { ...state, loading: false, user: null };
        case SIGNOUT:
            return { ...state, loading: true };
        case SIGNOUT_SUCCESS:
            return { ...state, loading: false, user: null };
        case FETCH_USER:
            return { ...state, loading: true };
        case FETCH_USER_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case FETCH_USER_FAIL:
            return { ...state, loading: false, user: null };
        default:
            return state;
    }
};
