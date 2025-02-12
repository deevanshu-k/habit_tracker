import React, { useEffect, useState } from "react";
import SelectMonth from "./select-month/select-month";
import HabitStatsBody from "./habit-stats-body/habit-stats-body";
import { MONTH } from "../../../utils/date.utils";
import { useDispatch } from "react-redux";
import {
    fetchHabitAction,
    FetchHabitAction,
} from "../../../store/habit/habit.action";
import { Dispatch } from "redux";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

const HabitStats: React.FC = () => {
    const now = new Date();
    const [month, setMonth] = useState<MONTH>((now.getMonth() + 1) as MONTH);
    const [year, setYear] = useState<number>(now.getFullYear());
    const dispatch = useDispatch<Dispatch<FetchHabitAction>>();

    useEffect(() => {
        dispatch(fetchHabitAction(month, year));
    }, [month, year]);

    const prevMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
            return;
        }
        setMonth((month - 1) as MONTH);
    };
    const nextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
            return;
        }
        setMonth((month + 1) as MONTH);
    };

    return (
        <Flex gap={"8"} className="flex-col-reverse lg:flex-row">
            <div className="flex-grow">
                <div className="flex justify-center pb-4">
                    <SelectMonth
                        goToPrevMonth={prevMonth}
                        goToNextMonth={nextMonth}
                        month={month}
                        year={year}
                    />
                </div>
                <div>
                    <HabitStatsBody month={month} year={year} />
                </div>
            </div>
            {/* Sticky Sidebar */}
            <div className="w-full lg:w-[400px] lg:self-start lg:sticky lg:top-10 p-4 border-2 border-[var(--gray-7)]">
                <Text align="center" as="div" color="gray" className="p-4">
                    Habits
                </Text>
                <Flex direction="column" gap={"4"}>
                    <Box className="w-full relative group shadow-[var(--grass-2)] shadow-sm">
                        <div className="flex flex-row justify-between p-3 shadow-lg">
                            <Text as="div" color="gray">
                                Go to gym
                            </Text>
                            <Text>8/10</Text>
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
                    <Button
                        variant="soft"
                        color="grass"
                        className="w-full h-[40px]"
                    >
                        <PlusIcon />
                        <Text>Add Habit</Text>
                    </Button>
                </Flex>
            </div>
        </Flex>
    );
};

export default HabitStats;
