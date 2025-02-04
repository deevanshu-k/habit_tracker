import { Action } from "redux";

// Action Types
export const GLOBAL_LOADING_START = "global/loadingStart";
export const GLOBAL_LOADING_END = "global/loadingEnd";

// Global Loading Start Action
export interface GlobalLoadingStartAction extends Action {
    type: typeof GLOBAL_LOADING_START;
}
export const globalLoadingStartAction = (): GlobalLoadingStartAction => ({
    type: GLOBAL_LOADING_START,
});

// Global Loading End Action
export interface GlobalLoadingEndAction extends Action {
    type: typeof GLOBAL_LOADING_END;
}
export const globalLoadingEndAction = (): GlobalLoadingEndAction => ({
    type: GLOBAL_LOADING_END,
});

// Actions
export type GlobalActions = GlobalLoadingStartAction | GlobalLoadingEndAction;
