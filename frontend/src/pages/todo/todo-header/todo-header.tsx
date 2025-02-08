import { Box, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../store/store.type";

const useTodoCount = () => {
    const totalHabitCount = useSelector<StoreState, number>(
        (s) => s.habit.today.data.length
    );
    const totalCompletedHabitCount = useSelector<StoreState, number>(
        (s) => s.habit.today.data.filter((h) => h.is_done).length
    );
    const totalTodoCount = useSelector<StoreState, number>(
        (s) => s.todo.today.data.length
    );
    const totalCompletedTodoCount = useSelector<StoreState, number>(
        (s) => s.todo.today.data.filter((t) => t.is_done).length
    );

    return {
        total: totalHabitCount + totalTodoCount,
        completed: totalCompletedHabitCount + totalCompletedTodoCount,
    };
};

const TodoHeader: React.FC = ({}) => {
    const { total, completed } = useTodoCount();
    return (
        <Box>
            <Flex direction="row" justify="between">
                <Heading weight="light">Todays Todo</Heading>
                <Text size="6">
                    {completed} / {total}
                </Text>
            </Flex>
            <Separator className="w-full mt-4" />
        </Box>
    );
};

export default TodoHeader;
