import React from "react";
import { getCalendarGrid, MONTH } from "../../../../utils/date.utils";
import { Box, Grid, Text } from "@radix-ui/themes";
import { useHabitDayWise } from "../../../../hooks/use-habit-day-wise";
import CellHabitStat from "./cell-habit-stat/cell-habit-stat";
import { Habit } from "../../../../store/store.type";
import { colorMap } from "../../../../utils/color.utils";

const HabitStatsBody: React.FC<{
    month: MONTH;
    year: number;
    selectedhabit: Habit | undefined;
}> = ({ month, year, selectedhabit }) => {
    const dayToHabitsMap = useHabitDayWise(month, year);
    let grid: (number | null)[][] = getCalendarGrid(year, month - 1);

    return (
        <Box className="border-2 border-[var(--gray-7)] shadow-lg">
            {/* Weekday Headers */}
            <Grid columns="7" className="border-b-2 border-[var(--gray-7)]">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
                    (w, index) => (
                        <Box key={index} className="p-2 text-center uppercase">
                            <Text color="gray" size="2">
                                {w}
                            </Text>
                        </Box>
                    )
                )}
            </Grid>

            {/* Calendar Days */}
            {grid.map((r, rowIndex) => (
                <Grid key={rowIndex} columns="7">
                    {r.map((c, colIndex) => {
                        const habits = c ? dayToHabitsMap.get(c) || [] : [];
                        const sh = habits.find(
                            (_h) => _h.id === selectedhabit?.id
                        );
                        return (
                            <Box
                                key={colIndex}
                                className={`p-4 relative flex justify-center items-center aspect-square text-center border-r-2 border-b-2 border-[var(--gray-7)] last:border-r-0 ${
                                    sh && sh.is_done ? colorMap[sh.color] : ""
                                }`}
                                style={{
                                    borderBottom:
                                        rowIndex === grid.length - 1 ? 0 : "",
                                }}
                            >
                                <Text
                                    className="absolute right-0 top-0 p-2"
                                    color="gray"
                                >
                                    {c}
                                </Text>
                                {c &&
                                    (!selectedhabit ||
                                        (sh && habits.includes(sh))) && (
                                        <CellHabitStat
                                            date={c}
                                            month={month}
                                            year={year}
                                            habits={habits}
                                        />
                                    )}
                            </Box>
                        );
                    })}
                </Grid>
            ))}
        </Box>
    );
};

export default HabitStatsBody;
