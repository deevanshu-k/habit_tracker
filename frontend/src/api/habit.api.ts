import { Habit } from "../store/store.type";
import axiosInstance from "./api_instance";

const habitService = {
    getHabits: async (month: number, year: number): Promise<Habit[]> => {
        const res = await axiosInstance.get(
            `/api/habit?month=${month}&year=${year}`
        );
        return res.data.data;
    },
};

export default habitService;
