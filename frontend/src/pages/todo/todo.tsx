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
import {
    fetchTodayTodosAction,
    FetchTodayTodosAction,
} from "../../store/todo/todo.action";

const Todo: React.FC = ({}) => {
    const isHabitAlreadyFetched = useSelector<StoreState, boolean>(
        (s) => s.habit.today.isAlreadyFetched
    );
    const isTodoAlreadyFetched = useSelector<StoreState, boolean>(
        (s) => s.todo.today.isAlreadyFetched
    );
    const dispatch =
        useDispatch<Dispatch<FetchTodayHabitsAction | FetchTodayTodosAction>>();

    useEffect(() => {
        if (!isHabitAlreadyFetched) {
            dispatch(fetchTodayHabitsAction());
        }
        if (!isTodoAlreadyFetched) {
            dispatch(fetchTodayTodosAction());
        }
    }, []);
    return (
        <Flex direction="column" gap="8" className="p-5">
            <TodoHeader />
            <TodoBody />
        </Flex>
    );
};

export default Todo;
