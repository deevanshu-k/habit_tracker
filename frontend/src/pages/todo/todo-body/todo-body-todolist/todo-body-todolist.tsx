import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Box, Checkbox, Flex, Text } from "@radix-ui/themes";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreState, TodayTodo } from "../../../../store/store.type";
import { Dispatch } from "redux";
import {
    deleteTodoAction,
    DeleteTodoAction,
    updateTodoAction,
    UpdateTodoAction,
} from "../../../../store/todo/todo.action";
import EditTodo from "../../../../components/edit-todo/edit-todo";
import ConfirmDialogBox from "../../../../components/confirm-dialog-box/confirm-dialog-box";

const TodoBodyTodolist: React.FC = ({}) => {
    const todos = useSelector<StoreState, TodayTodo[]>((s) => [
        ...s.todo.today.data.filter((t) => !t.is_done),
        ...s.todo.today.data.filter((t) => t.is_done),
    ]);
    const dispatch =
        useDispatch<Dispatch<UpdateTodoAction | DeleteTodoAction>>();
    const updateTodo = (todo_id: string, title: string, is_done: boolean) => {
        dispatch(updateTodoAction(todo_id, title, is_done));
    };
    const deleteTodo = (todo_id: string) => {
        dispatch(deleteTodoAction(todo_id));
    };
    return (
        <Box className="w-full">
            <Flex direction="column" gap="3">
                {todos.map((t) => (
                    <Box
                        key={t.id}
                        className="group px-4 rounded border border-[var(--gray-7)] w-full h-[50px] flex flex-row gap-4 justify-between items-center"
                    >
                        <div>
                            <Checkbox
                                checked={t.is_done}
                                onClick={() =>
                                    updateTodo(t.id, t.title, !t.is_done)
                                }
                                className="cursor-pointer"
                                size="3"
                            />
                        </div>
                        <div className="flex-grow">
                            <Text>{t.title}</Text>
                        </div>
                        <Flex gap="3">
                            <EditTodo
                                previous_title={t.title}
                                onSubmit={(_title) =>
                                    updateTodo(t.id, _title, t.is_done)
                                }
                            >
                                <Pencil2Icon
                                    width="16px"
                                    height={"16px"}
                                    className="hidden group-hover:block hover:text-[var(--accent-10)] cursor-pointer"
                                />
                            </EditTodo>
                            <ConfirmDialogBox
                                title="Are you sure? you want to delete this todo"
                                description={`${t.title}`}
                                onCancel={() => null}
                                onConfirm={() => deleteTodo(t.id)}
                            >
                                <TrashIcon
                                    width="16px"
                                    height={"16px"}
                                    className=" hover:text-[var(--accent-10)] cursor-pointer"
                                />
                            </ConfirmDialogBox>
                        </Flex>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default TodoBodyTodolist;
