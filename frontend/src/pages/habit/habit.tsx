import React from "react";
import HabitStats from "./habit-stats/habit-stats";
import Notes from "./notes/notes";
import {  Flex } from "@radix-ui/themes";

const Habit: React.FC = () => {
    return (
        <div className="px-5 py-9">
            <Flex direction={"column"} gap={"9"}>
                <HabitStats />
                <Notes />
            </Flex>
        </div>
    );
};

export default Habit;
