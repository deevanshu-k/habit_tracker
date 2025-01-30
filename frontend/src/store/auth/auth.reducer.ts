import { AuthState } from "../store.type";
import { AuthActions, SIGNIN, SIGNIN_SUCCESS } from "./auth.action";

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
            return { ...state, loading: false, user: action.payload };
        default:
            return state;
    }
};
