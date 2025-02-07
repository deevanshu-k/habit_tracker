import React from "react";
import TodoHeader from "./todo-header/todo-header";
import TodoBody from "./todo-body/todo-body";
import { Flex } from "@radix-ui/themes";

const Todo: React.FC = ({}) => {
    return (
        <Flex direction="column">
            <TodoHeader />
            <TodoBody />
        </Flex>
    );
};

export default Todo;
