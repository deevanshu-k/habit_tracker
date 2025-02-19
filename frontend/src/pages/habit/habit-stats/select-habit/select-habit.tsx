import { Select } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { Habit, StoreState } from "../../../../store/store.type";

const SelectHabit: React.FC<{
    setHabitSelected: (habit: Habit | undefined) => void;
}> = ({ setHabitSelected }) => {
    const habits = useSelector<StoreState, Habit[]>((s) => s.habit.data);
    return (
        <Select.Root
            defaultValue="default"
            onValueChange={(id: string) => {
                const h = habits.find((h) => h.id === id);
                if (h) {
                    setHabitSelected(h);
                } else {
                    setHabitSelected(undefined);
                }
            }}
            size={"2"}
        >
            <Select.Trigger />
            <Select.Content>
                <Select.Group>
                    <Select.Item value="default">All</Select.Item>
                    {habits.map((habit) => (
                        <Select.Item key={habit.id} value={habit.id}>
                            {habit.title}
                        </Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default SelectHabit;
