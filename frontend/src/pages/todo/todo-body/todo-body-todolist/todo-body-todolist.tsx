import { Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import React from "react";

const TodoBodyTodolist: React.FC = ({}) => {
    return (
        <Box className="w-full">
            <Flex direction="column" gap="3">
                {[
                    "Do college assignments",
                    "Bring vegitables",
                    "Read blog",
                ].map((t) => (
                    <Box className="px-4 rounded border border-[var(--gray-7)] w-full h-[50px] flex flex-row gap-4 justify-between items-center">
                        <div>
                            <Checkbox className="" size="3" />
                        </div>
                        <div className="flex-grow">
                            <Text>{t}</Text>
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
