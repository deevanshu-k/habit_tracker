import { useSelector } from "react-redux";
import { Habit, StoreState } from "../store/store.type";

interface HabitReturnType {
    id: string;
    title: string;
    description: string;
    color: string;
    is_done: boolean;
    note: string;
}

export const useHabitDayWise = ({}): Map<number, HabitReturnType[]> => {
    const habits = useSelector<StoreState, Habit[]>((s) => s.habit.data);
    let map = new Map<number, HabitReturnType[]>();

    habits.forEach((habit) => {
        habit.logs.forEach((log) => {
            const habitData: HabitReturnType = {
                id: habit.id,
                title: habit.title,
                description: habit.description,
                color: habit.color,
                is_done: log.is_done,
                note: log.note,
            };

            map.set(log.date, [...(map.get(log.date) || []), habitData]);
        });
    });

    return map;
};
