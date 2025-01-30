export interface AuthState {
    user: null | { id: string };
    error: null | string;
    loading: boolean;
}

export interface StoreState {
    auth: AuthState;
}
