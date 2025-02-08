import { Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState, TodayTodo } from "../../../../store/store.type";

const TodoBodyTodolist: React.FC = ({}) => {
    const todos = useSelector<StoreState, TodayTodo[]>(
        (s) => s.todo.today.data
    );
    return (
        <Box className="w-full">
            <Flex direction="column" gap="3">
                {todos.map((t) => (
                    <Box className="px-4 rounded border border-[var(--gray-7)] w-full h-[50px] flex flex-row gap-4 justify-between items-center">
                        <div>
                            <Checkbox
                                checked={t.is_done}
                                className=""
                                size="3"
                            />
                        </div>
                        <div className="flex-grow">
                            <Text>{t.title}</Text>
                        </div>
                        <Flex gap="3">
                            <PlusCircledIcon
                                width="16px"
                                height={"16px"}
                                className=" hover:text-[var(--accent-10)] cursor-pointer"
                            />
                            <Pencil2Icon
                                width="16px"
                                height={"16px"}
                                className=" hover:text-[var(--accent-10)] cursor-pointer"
                            />
                            <TrashIcon
                                width="16px"
                                height={"16px"}
                                className=" hover:text-[var(--accent-10)] cursor-pointer"
                            />
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default TodoBodyTodolist;
