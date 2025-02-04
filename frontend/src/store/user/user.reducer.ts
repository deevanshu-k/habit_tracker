import { UserState } from "../store.type";
import {
    FETCH_USER_FAIL,
    FETCH_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    UserActions,
} from "./user.action";

const initialState: UserState = {
    data: null,
};

export const userReducer = (
    state: UserState = initialState,
    action: UserActions
): UserState => {
    switch (action.type) {
        case LOGOUT_USER_SUCCESS:
            return { ...state, data: null };
        case FETCH_USER_SUCCESS:
            return { ...state, data: action.payload.user };
        case FETCH_USER_FAIL:
            return { ...state, data: null };
        default:
            return { ...state };
    }
};
