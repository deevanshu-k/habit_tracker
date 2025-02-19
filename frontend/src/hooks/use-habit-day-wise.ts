import { useSelector } from "react-redux";
import { Habit, HabitFreqType, StoreState } from "../store/store.type";
import { MONTH } from "../utils/date.utils";

interface HabitReturnType {
    id: string;
    title: string;
    description: string;
    color: string;
    is_done: boolean;
    note: string;
}

export const useHabitDayWise = (
    month: MONTH,
    year: number
): Map<number, HabitReturnType[]> => {
    const habits = useSelector<StoreState, Habit[]>((s) => s.habit.data);
    let map = new Map<number, HabitReturnType[]>();

    habits.forEach((habit) => {
        habit.logs.forEach((log) => {
            const dayIndex = new Date(year, month - 1, log.date).getDay(); // month is 0-based
            if (
                habit.frequency_type == HabitFreqType.FIXED_DAYS &&
                habit.frequency[dayIndex] == "0"
            ) {
                return;
            }
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
