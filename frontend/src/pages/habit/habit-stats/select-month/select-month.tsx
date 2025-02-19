import { Button, Text } from "@radix-ui/themes";
import React from "react";
import { getMonthName, MONTH } from "../../../../utils/date.utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const SelectMonth: React.FC<{
    goToNextMonth: () => void;
    goToPrevMonth: () => void;
    month: MONTH;
    year: number;
}> = ({ goToPrevMonth, goToNextMonth, month, year }) => {
    const now = new Date();
    return (
        <div className="flex items-center justify-between w-[160px]">
            <Button size={"1"} variant="ghost" onClick={goToPrevMonth}>
                <ChevronLeftIcon />
            </Button>
            <Text size={"2"} mx={"3"}>
                {getMonthName(month)}, {year}
            </Text>
            <Button
                size={"1"}
                variant="ghost"
                disabled={
                    now.getFullYear() < year ||
                    (now.getFullYear() === year && now.getMonth() + 1 <= month)
                }
                onClick={goToNextMonth}
            >
                <ChevronRightIcon />
            </Button>
        </div>
    );
};

export default SelectMonth;
