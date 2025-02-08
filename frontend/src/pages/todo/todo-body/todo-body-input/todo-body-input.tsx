import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
    addTodoAction,
    AddTodoAction,
} from "../../../../store/todo/todo.action";

const TodoBodyInput: React.FC = ({}) => {
    const [isFocused, setIsFocused] = useState(false);
    const dispatch = useDispatch<Dispatch<AddTodoAction>>();
    const { register, handleSubmit, reset } = useForm<{ title: string }>();

    const onSubmit = (data: { title: string }) => {
        dispatch(addTodoAction(data.title));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input
                {...register("title", { required: true })}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="px-4 w-full h-[50px]"
                style={{
                    borderWidth: "1px",
                    borderColor: isFocused ? "transparent" : "var(--gray-7)",
                    outlineWidth: "2px",
                    outlineStyle: "solid",
                    outlineColor: isFocused ? "var(--accent-7)" : "transparent",
                }}
                placeholder="Enter todo here"
            />
            <button type="submit" hidden></button>
        </form>
    );
};

export default TodoBodyInput;
