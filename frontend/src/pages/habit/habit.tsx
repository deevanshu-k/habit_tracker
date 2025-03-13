import React from "react";
import HabitStats from "./habit-stats/habit-stats";
import { Flex } from "@radix-ui/themes";

const Habit: React.FC = () => {
    return (
        <div className="p-10">
            <Flex direction={"column"} gap={"9"}>
                <HabitStats />
                {/* In progress  */
                /* <Container size={"2"} mt={"6"}>
                    <Notes />
                </Container> */}
            </Flex>
        </div>
    );
};

export default Habit;
