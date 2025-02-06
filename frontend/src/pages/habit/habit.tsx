import React from "react";
import HabitStats from "./habit-stats/habit-stats";
import Notes from "./notes/notes";
import { Container, Flex } from "@radix-ui/themes";

const Habit: React.FC = () => {
    return (
        <div className="px-10 py-20">
            <Flex direction={"column"} gap={"9"}>
                <HabitStats />
                <Container size={"2"} mt={"6"}>
                    <Notes />
                </Container>
            </Flex>
        </div>
    );
};

export default Habit;
