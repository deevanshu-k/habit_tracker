export interface UserDetail {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    mode: string;
}

export interface GlobalState {
    loading: number;
}

export interface UserState {
    data: UserDetail | null;
}

export interface StoreState {
    user: UserState;
    global: GlobalState;
}
