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
};

export default habitService;
