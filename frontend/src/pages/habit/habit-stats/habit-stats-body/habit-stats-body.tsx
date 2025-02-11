import React from "react";
import { getCalendarGrid, MONTH } from "../../../../utils/date.utils";
import { Box, Grid, Text } from "@radix-ui/themes";

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
                    {r.map((c, colIndex) => (
                        <Box
                            key={colIndex}
                            className={`p-4 relative aspect-square text-center border-r-2 border-b-2 border-[var(--gray-7)] last:border-r-0 cursor-pointer`}
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
                        </Box>
                    ))}
                </Grid>
            ))}
        </Box>
    );
};

export default HabitStatsBody;
