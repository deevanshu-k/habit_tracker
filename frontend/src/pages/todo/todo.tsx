import React, { useEffect } from "react";
import TodoHeader from "./todo-header/todo-header";
import TodoBody from "./todo-body/todo-body";
import { Flex } from "@radix-ui/themes";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "../../store/store.type";
import { Dispatch } from "redux";
import {
    fetchTodayHabitsAction,
    FetchTodayHabitsAction,
} from "../../store/habit/habit.action";

const Todo: React.FC = ({}) => {
    const isAlreadyFetched = useSelector<StoreState, boolean>(
        (s) => s.habit.today.isAlreadyFetched
    );
    const dispatch = useDispatch<Dispatch<FetchTodayHabitsAction>>();

    useEffect(() => {
        if (!isAlreadyFetched) {
            dispatch(fetchTodayHabitsAction());
        }
    }, []);
    return (
        <Flex direction="column" gap="8" className="px-4">
            <TodoHeader />
            <TodoBody />
        </Flex>
    );
};

export default Todo;
