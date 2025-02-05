import { Box, Button, Flex, Text } from "@radix-ui/themes";
import React from "react";
import {
    getDaysInMonth,
    getOneLetterDayName,
    MONTH,
} from "../../../../utils/date.utils";
import { CheckIcon } from "@radix-ui/react-icons";
import AddHabit from "../../../../components/add-habbit/add-habit";

const HabitStatsBody: React.FC<{
    month: MONTH;
    year: number;
    habbits?: number;
}> = ({ month, year, habbits = 5 }) => {
    return (
        <Flex direction={"row"}>
            <Box width={"230px"}>
                <Box
                    height={"60px"}
                    className="flex items-center justify-center"
                >
                    <Text size={"3"} color="grass">
                        Habits
                    </Text>
                </Box>
                {Array.from({ length: habbits }).map((_, i) => (
                    <Box
                        height={"40px"}
                        className={`flex items-center border-b border-l ${
                            i == 0 ? "border-t" : ""
                        }`}
                    >
                        <Text className="px-4" size={"2"}>
                            Habbit 1
                        </Text>
                    </Box>
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

            <Box>
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
                                        {getDaysInMonth(year, month) >= i + 1
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
                                        {getDaysInMonth(year, month) >= i + 1
                                            ? i + 1
                                            : ""}
                                    </Text>
                                </div>
                            </div>
                        </>
                    ))}
                </Box>
                {Array.from({ length: habbits }).map(() => (
                    <Box height={"40px"} className="flex items-center">
                        {Array.from({ length: 31 }, (_, i) => (
                            <>
                                <div
                                    className={`h-full hover:bg-green-500 flex items-center justify-center border-r w-[30px] border-b ${
                                        i == 0 ? "border-l" : ""
                                    }`}
                                >
                                    <CheckIcon />
                                </div>
                            </>
                        ))}
                    </Box>
                ))}
            </Box>

            <Box width={"150px"}>
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
                {Array.from({ length: habbits }).map(() => (
                    <Box height={"40px"} className="flex flex-row border-b">
                        <Box className="w-[50%] flex items-center justify-center h-full border-r">
                            <Text align={"center"} size={"2"}>
                                10
                            </Text>
                        </Box>
                        <Box className="w-[50%] flex items-center justify-center h-full border-r">
                            <Text align={"center"} size={"2"}>
                                20
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Flex>
    );
};

export default HabitStatsBody;
