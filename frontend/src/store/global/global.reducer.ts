import { GlobalState } from "../store.type";
import {
    GLOBAL_LOADING_END,
    GLOBAL_LOADING_START,
    GlobalActions,
} from "./global.action";

const initialState: GlobalState = {
    loading: 0,
};

export const globalReducer = (
    state: GlobalState = initialState,
    action: GlobalActions
): GlobalState => {
    switch (action.type) {
        case GLOBAL_LOADING_START:
            return { ...state, loading: state.loading + 1 };
        case GLOBAL_LOADING_END:
            return { ...state, loading: state.loading - 1 };
        default:
            return state;
    }
};
