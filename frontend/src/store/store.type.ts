export interface UserDetail {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    mode: string;
}

export enum HabitFreqType {
    FIXED_DAYS,
    NO_OF_DAYS_IN_WEEKS,
    NO_OF_DAYS_IN_MONTHS,
}

export interface HabitLog {
    id: string;
    date: number;
    is_done: boolean;
    note: string;
}

export interface Habit {
    id: string;
    title: string;
    description: string;
    color: string;
    frequency: number;
    frequency_type: HabitFreqType;
    is_archived: boolean;
    is_deleted: boolean;
    logs: HabitLog[];
}

export interface GlobalState {
    loading: number;
}

export interface UserState {
    data: UserDetail | null;
}

export interface HabitState {
    data: Habit[];
}

export interface StoreState {
    user: UserState;
    habit: HabitState;
    global: GlobalState;
}
