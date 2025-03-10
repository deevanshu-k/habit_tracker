import { Habit, HabitFreqType } from "../store/store.type";
import axiosInstance from "./api_instance";

export interface AddHabitResponse {
    id: string;
    title: string;
    description: string;
    frequency_type: HabitFreqType;
    frequency: string;
    color: string;
}

export interface UpdateHabitLogResponse {
    id: string;
    is_done: boolean;
    note: string;
}

export interface GetTodayHabitsResponse {
    id: string;
    title: string;
    description: string;
    color: string;
    is_done: boolean;
    note: string;
}

export interface DeleteHabitResponse {
    id: string;
}

export interface UpdateHabitResponse {
    id: string;
    title: string;
    description: string;
    frequency_type: HabitFreqType;
    frequency: string;
    color: string;
    is_archived: boolean;
}

const habitService = {
    getHabits: async (month: number, year: number): Promise<Habit[]> => {
        const res = await axiosInstance.get(
            `/api/habit?month=${month}&year=${year}`
        );
        return res.data.data;
    },
    getTodayHabits: async (): Promise<GetTodayHabitsResponse[]> => {
        const res = await axiosInstance.get(`/api/habit/today`);
        return res.data.data;
    },
    addHabit: async (
        title: string,
        description: string,
        f_type: HabitFreqType,
        f: number | string,
        color: string
    ): Promise<AddHabitResponse> => {
        const res = await axiosInstance.post(`/api/habit`, {
            title,
            description,
            f_type,
            f: String(f),
            color,
        });
        return res.data.data;
    },
    updateHabitLog: async (
        id: string,
        date: number,
        month: number,
        year: number,
        is_done: boolean,
        note: string
    ): Promise<UpdateHabitLogResponse> => {
        const res = await axiosInstance.put(`/api/habit/${id}/log`, {
            date,
            month,
            year,
            is_done,
            note,
        });
        return res.data.data;
    },
    deleteHabit: async (id: string): Promise<DeleteHabitResponse> => {
        const res = await axiosInstance.delete(`/api/habit/${id}`);
        return res.data.data;
    },
    updateHabit: async (
        id: string,
        title: string,
        description: string,
        color: string,
        f_type: HabitFreqType,
        f: string,
        is_archived: boolean
    ): Promise<UpdateHabitResponse> => {
        const res = await axiosInstance.put(`/api/habit/${id}`, {
            title,
            description,
            color,
            f_type,
            f: String(f),
            is_archived,
        });
        return res.data.data;
    },
};

export default habitService;
