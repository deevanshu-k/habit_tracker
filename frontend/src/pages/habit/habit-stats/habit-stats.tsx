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
import { Flex } from "@radix-ui/themes";
import HabitStickySideBar from "./habit-sticky-sidebar/habit-sticky-sidebar";

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
                <HabitStickySideBar month={month} year={year} />
            </div>
        </Flex>
    );
};

export default HabitStats;
