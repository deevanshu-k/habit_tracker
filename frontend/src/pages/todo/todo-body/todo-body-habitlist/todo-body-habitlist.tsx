import { Pencil2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, TodayHabit } from "../../../../store/store.type";
import { Dispatch } from "redux";
import {
    updateHabitLogAction,
    UpdateHabitLogAction,
} from "../../../../store/habit/habit.action";

const TodoBodyHabitlist: React.FC = ({}) => {
    const habits = useSelector<StoreState, TodayHabit[]>(
        (s) => s.habit.today.data
    );
    const dispatch = useDispatch<Dispatch<UpdateHabitLogAction>>();
    const now = new Date();
    const updateHabitStatus = (
        habit_id: string,
        is_done: boolean,
        note: string
    ) => {
        dispatch(
            updateHabitLogAction(
                habit_id,
                now.getDate(),
                now.getMonth() + 1,
                now.getFullYear(),
                is_done,
                note
            )
        );
    };
    return (
        <Box className="w-full">
            <Flex direction="column" gap="3">
                {habits.map((h) => (
                    <Box className="group px-4 rounded border border-[var(--gray-7)] w-full h-[50px] flex flex-row gap-4 justify-between items-center">
                        <div>
                            <Checkbox
                                checked={h.is_done}
                                onClick={() =>
                                    updateHabitStatus(h.id, !h.is_done, "")
                                }
                                className="cursor-pointer"
                                size="3"
                            />
                        </div>
                        <div className="flex-grow">
                            <Text>{h.title}</Text>
                        </div>
                        <Flex gap="3">
                            <Pencil2Icon
                                width="16px"
                                height={"16px"}
                                className="hidden group-hover:block hover:text-[var(--accent-10)] cursor-pointer"
                            />
                            <PlusCircledIcon
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

export default TodoBodyHabitlist;
