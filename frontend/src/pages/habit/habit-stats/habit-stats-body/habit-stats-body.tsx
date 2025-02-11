import { Box, Button, Flex, ScrollArea, Text, Tooltip } from "@radix-ui/themes";
import React from "react";
import {
    getDaysInMonth,
    getOneLetterDayName,
    MONTH,
} from "../../../../utils/date.utils";
import { CheckIcon, Pencil2Icon } from "@radix-ui/react-icons";
import AddHabit from "../../../../components/add-habbit/add-habit";
import { useDispatch, useSelector } from "react-redux";
import { Habit, StoreState } from "../../../../store/store.type";
import { Dispatch } from "redux";
import {
    updateHabitLogAction,
    UpdateHabitLogAction,
} from "../../../../store/habit/habit.action";

const colorMap: Record<string, string> = {
    Gray: "bg-gray-500",
    Red: "bg-red-500",
    Green: "bg-green-500",
    Pink: "bg-pink-500",
    Sky: "bg-sky-500",
};

const HabitStatsBody: React.FC<{
    month: MONTH;
    year: number;
}> = ({ month, year }) => {
    const habits = useSelector<StoreState, Habit[]>((s) => s.habit.data);
    const dispatch = useDispatch<Dispatch<UpdateHabitLogAction>>();

    const updateHabitLog = (
        habit_id: string,
        date: number,
        month: number,
        year: number,
        is_done: boolean,
        note: string
    ) => {
        dispatch(
            updateHabitLogAction(habit_id, date, month, year, is_done, note)
        );
    };

    return (
        <Flex direction={"row"} className="">
            <Box width={"200px"}>
                <Box
                    height={"60px"}
                    className="flex items-center justify-center"
                >
                    <Text size={"3"} className="text-[var(--accent-10)]">
                        Habits
                    </Text>
                </Box>
                {habits.map((habit, i) => (
                    <Flex
                        justify="between"
                        height={"40px"}
                        className={`flex group items-center px-3 border-b border-l relative ${
                            i == 0 ? "border-t" : ""
                        }`}
                    >
                        <Text
                            size={"2"}
                            className="overflow-hidden max-w-[60%] text-ellipsis whitespace-nowrap"
                            wrap={"nowrap"}
                            title={habit.title}
                        >
                            {habit.title}
                        </Text>
                        <Text size="1">
                            {habit.logs.reduce(
                                (p, c) => p + (c.is_done ? 1 : 0),
                                0
                            )}
                            /31
                        </Text>
                        <Box className="absolute group-hover:flex hidden flex-row-reverse pr-2 items-center right-0 bg-[var(--gray-1)] w-[50px] h-full">
                            <Tooltip content="Edit habit">
                                <Pencil2Icon className="cursor-pointer hover:text-[var(--accent-10)]" />
                            </Tooltip>
                        </Box>
                    </Flex>
                ))}
                <AddHabit
                    children={
                        <Button
                            variant="outline"
                            radius="none"
                            className="mt-2 w-full cursor-pointer"
                        >
                            New Habit
                        </Button>
                    }
                />
            </Box>

            <Box className="w-[calc(100% - 200px)] overflow-hidden">
                <ScrollArea type="always" scrollbars="horizontal">
                    <Box height={"60px"} className="flex items-center">
                        {Array.from({ length: 31 }, (_, i) => (
                            <>
                                <div className="h-full w-[30px]">
                                    <div
                                        className={`h-[40%] text-center border-t border-r ${
                                            i == 0 ? "border-l" : ""
                                        }`}
                                    >
                                        <Text size={"1"}>
                                            {getDaysInMonth(year, month) >=
                                            i + 1
                                                ? getOneLetterDayName(
                                                      year,
                                                      month,
                                                      i + 1
                                                  )
                                                : ""}
                                        </Text>
                                    </div>
                                    <div
                                        className={`h-[60%] text-center border-b border-r border-t ${
                                            i == 0 ? "border-l" : ""
                                        }`}
                                    >
                                        <Text className="leading-8" size={"1"}>
                                            {getDaysInMonth(year, month) >=
                                            i + 1
                                                ? i + 1
                                                : ""}
                                        </Text>
                                    </div>
                                </div>
                            </>
                        ))}
                    </Box>
                    {habits.map((habit) => (
                        <Box height={"40px"} className="flex items-center">
                            {Array.from({ length: 31 }, (_, i) => (
                                <>
                                    <div
                                        className={`h-full cursor-pointer 
                                        ${
                                            habit.logs[i].is_done
                                                ? colorMap[habit.color] || ""
                                                : ""
                                        }
                                        hover:bg-green-500 flex items-center justify-center border-r w-[30px] border-b 
                                        ${i === 0 ? "border-l" : ""}
                                    `}
                                        onClick={() =>
                                            getDaysInMonth(year, month) >= i + 1
                                                ? updateHabitLog(
                                                      habit.id,
                                                      habit.logs[i].date,
                                                      month,
                                                      year,
                                                      !habit.logs[i].is_done,
                                                      habit.logs[i].note
                                                  )
                                                : ""
                                        }
                                    >
                                        {habit.logs[i].is_done ? (
                                            <CheckIcon />
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </>
                            ))}
                        </Box>
                    ))}
                </ScrollArea>
            </Box>

            {/* <Box width={"60px"}>
                <Box
                    height={"60px"}
                    className="flex flex-row border-t border-b"
                >
                    <Box className="w-[50%] flex items-center justify-center h-full border-r">
                        <Text align={"center"} size={"2"}>
                            Goal
                        </Text>
                    </Box>
                    <Box className="w-[50%] flex items-center justify-center h-full border-r">
                        <Text align={"center"} size={"2"}>
                            Done
                        </Text>
                    </Box>
                </Box>
                {habits.map((habit) => (
                    <Box height={"40px"} className="flex flex-row border-b">
                        <Box className="w-[50%] flex items-center justify-center h-full border-r">
                            <Text align={"center"} size={"2"}>
                                10
                            </Text>
                        </Box>
                        <Box className="w-[50%] flex items-center justify-center h-full border-r">
                            <Text align={"center"} size={"2"}>
                                {habit.logs.reduce(
                                    (p, c) => p + (c.is_done ? 1 : 0),
                                    0
                                )}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Box> */}
        </Flex>
    );
};

export default HabitStatsBody;
