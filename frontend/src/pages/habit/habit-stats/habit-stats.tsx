import React, { useState } from "react";
import SelectMonth, { MONTH } from "./select-month/select-month";

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
            <div className="flex justify-center">
                <SelectMonth
                    goToPrevMonth={prevMonth}
                    goToNextMonth={nextMonth}
                    month={month}
                    year={year}
                />
            </div>
            <div>Stats Body</div>
            <div>New Habit</div>
        </div>
    );
};

export default HabitStats;
