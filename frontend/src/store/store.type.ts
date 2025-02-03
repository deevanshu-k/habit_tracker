export interface UserDetail {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    mode: string;
}

export interface AuthState {
    user: null | UserDetail;
    error: null | string;
    loading: boolean;
}

export interface StoreState {
    auth: AuthState;
}
