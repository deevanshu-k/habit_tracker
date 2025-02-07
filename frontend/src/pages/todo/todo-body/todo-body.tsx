import { Box, Flex } from "@radix-ui/themes";
import React from "react";
import TodoBodyInput from "./todo-body-input/todo-body-input";
import TodoBodyHabitlist from "./todo-body-habitlist/todo-body-habitlist";
import TodoBodyTodolist from "./todo-body-todolist/todo-body-todolist";
import SeperatorWithMiddleText from "../../../components/seperator-with-middle-text/seperator-with-middle-text";

const TodoBody: React.FC = ({}) => {
    return (
        <Flex direction="column" align="center" gap="4">
            <Box className="w-[40%]">
                <TodoBodyInput />
            </Box>
            <Box className="w-[40%]">
                <SeperatorWithMiddleText txt="Habits" />
            </Box>
            <Box className="w-[40%]">
                <TodoBodyHabitlist />
            </Box>
            <Box className="w-[40%]">
                <SeperatorWithMiddleText txt="Todos" />
            </Box>
            <Box className="w-[40%]">
                <TodoBodyTodolist />
            </Box>
        </Flex>
    );
};

export default TodoBody;
