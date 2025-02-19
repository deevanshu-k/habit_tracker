import { PlusIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Habit, HabitFreqType, StoreState } from "../../../../store/store.type";
import AddHabit from "../../../../components/add-habbit/add-habit";
import { Dispatch } from "redux";
import {
    deleteHabitAction,
    DeleteHabitAction,
} from "../../../../store/habit/habit.action";
import ConfirmDialogBox from "../../../../components/confirm-dialog-box/confirm-dialog-box";
import { countMatchingDays, MONTH } from "../../../../utils/date.utils";

const colorMap: Record<string, string> = {
    Gray: "bg-gray-500",
    Red: "bg-red-500",
    Green: "bg-green-500",
    Pink: "bg-pink-500",
    Sky: "bg-sky-500",
};

const HabitStickySideBar: React.FC<{ month: MONTH; year: number }> = ({
    month,
    year,
}) => {
    const dispatch = useDispatch<Dispatch<DeleteHabitAction>>();
    const habits = useSelector<StoreState, Habit[]>((s) => s.habit.data);

    const deleteHabit = (id: string) => {
        dispatch(deleteHabitAction(id));
    };

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
                            <Flex direction="row" align={"center"}>
                                <div
                                    className={`w-[10px] h-[10px] rounded-full mr-2 ${
                                        colorMap[habit.color]
                                    }`}
                                ></div>
                                <Text as="div" color="gray">
                                    {habit.title}
                                </Text>
                            </Flex>
                            <Text>
                                {habit.logs.reduce(
                                    (p, h) => p + Number(h.is_done),
                                    0
                                ) +
                                    "/" +
                                    (habit.frequency_type ===
                                    HabitFreqType.FIXED_DAYS
                                        ? countMatchingDays(
                                              year,
                                              month,
                                              habit.frequency
                                          )
                                        : habit.frequency)}
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
                            <ConfirmDialogBox
                                title="Are you sure?"
                                onConfirm={() => deleteHabit(habit.id)}
                                description={`Delete habit: ${habit.title}`}
                                onCancel={() => {}}
                                tooltip="delete habit"
                            >
                                <Button
                                    className="w-[30%] cursor-pointer"
                                    variant="ghost"
                                    color="grass"
                                >
                                    Delete
                                </Button>
                            </ConfirmDialogBox>
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
