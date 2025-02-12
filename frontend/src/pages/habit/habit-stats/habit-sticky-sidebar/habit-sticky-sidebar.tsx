import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { Habit, StoreState } from "../../../../store/store.type";
import AddHabit from "../../../../components/add-habbit/add-habit";

const HabitStickySideBar: React.FC = ({}) => {
    const habits = useSelector<StoreState, Habit[]>((s) => s.habit.data);
    return (
        <>
            <Text align="center" as="div" color="gray" className="p-4">
                Habits
            </Text>
            <Flex direction="column" gap={"4"}>
                {habits.map((habit) => (
                    <Box
                        key={habit.id}
                        className="w-full relative group shadow-[var(--grass-2)] shadow-sm"
                    >
                        <div className="flex flex-row justify-between p-3 shadow-lg">
                            <Text as="div" color="gray">
                                {habit.title}
                            </Text>
                            <Text>
                                {habit.logs.reduce(
                                    (p, h) => p + Number(h.is_done),
                                    0
                                ) +
                                    "/" +
                                    "10"}
                            </Text>
                        </div>
                        <div className="absolute top-0 hidden group-hover:flex flex-row transition-all duration-300 justify-evenly items-center w-full h-full p-2 bg-[var(--gray-2)]">
                            <Button
                                className="w-[30%] cursor-pointer"
                                variant="ghost"
                                color="grass"
                            >
                                Edit
                            </Button>
                            <Button
                                className="w-[30%] cursor-pointer"
                                variant="ghost"
                                color="grass"
                            >
                                Delete
                            </Button>
                            <Button
                                className="w-[30%] cursor-pointer"
                                variant="ghost"
                                color="grass"
                            >
                                Archive
                            </Button>
                        </div>
                    </Box>
                ))}

                <AddHabit>
                    <Button
                        variant="soft"
                        color="grass"
                        className="w-full h-[40px]"
                    >
                        <PlusIcon />
                        <Text>Add Habit</Text>
                    </Button>
                </AddHabit>
            </Flex>
        </>
    );
};

export default HabitStickySideBar;
