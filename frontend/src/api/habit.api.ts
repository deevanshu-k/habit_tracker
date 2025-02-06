import { Habit, HabitFreqType } from "../store/store.type";
import axiosInstance from "./api_instance";

export interface AddHabitResponse {
    id: string;
    title: string;
    description: string;
    frequency_type: HabitFreqType;
    frequency: number;
    color: string;
}

export interface UpdateHabitLogResponse {
    id: string;
    is_done: boolean;
    note: string;
}

const habitService = {
    getHabits: async (month: number, year: number): Promise<Habit[]> => {
        const res = await axiosInstance.get(
            `/api/habit?month=${month}&year=${year}`
        );
        return res.data.data;
    },
    addHabit: async (
        title: string,
        description: string,
        f_type: HabitFreqType,
        f: number,
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
};

export default habitService;
