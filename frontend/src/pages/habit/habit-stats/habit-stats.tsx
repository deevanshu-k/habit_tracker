import React, { useState } from "react";
import SelectMonth from "./select-month/select-month";
import HabitStatsBody from "./habit-stats-body/habit-stats-body";
import { MONTH } from "../../../utils/date.utils";

const HabitStats: React.FC = () => {
    const now = new Date();
    const [month, setMonth] = useState<MONTH>((now.getMonth() + 1) as MONTH);
    const [year, setYear] = useState<number>(now.getFullYear());

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
        <div>
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
    );
};

export default HabitStats;
