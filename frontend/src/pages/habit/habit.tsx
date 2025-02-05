import React from "react";
import HabitStats from "./habit-stats/habit-stats";
import Notes from "./notes/notes";
import { Flex } from "@radix-ui/themes";

const Habit: React.FC = () => {
    return (
        <Flex direction={"column"} gap={"9"} m={"5"}>
            <HabitStats />
            <Notes />
        </Flex>
    );
};

export default Habit;
