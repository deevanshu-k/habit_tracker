import {
    Button,
    Dialog,
    Flex,
    Select,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addHabitAction, AddHabitAction } from "../../store/habit/habit.action";

const AddHabit: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { register, setValue, handleSubmit } = useForm<{
        title: string;
        description: string;
        color: string;
    }>({ defaultValues: { color: "Green" } });
    const dispatch = useDispatch<Dispatch<AddHabitAction>>();

    const onAddSumbmit = (data: {
        title: string;
        description: string;
        color: string;
    }) => {
        dispatch(addHabitAction(data.title, data.description, data.color));
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>{children}</Dialog.Trigger>
            <Dialog.Content maxWidth="450px">
                <Dialog.Title align={"center"}>Add Habit</Dialog.Title>

                <form onSubmit={handleSubmit(onAddSumbmit)}>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Title
                            </Text>
                            <TextField.Root
                                {...register("title", {
                                    required: "Title is required",
                                    minLength: 1,
                                })}
                            />
                        </label>
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Description
                            </Text>
                            <TextArea {...register("description")} />
                        </label>
                        <label className="flex flex-row gap-2">
                            <Text as="div" size="2" mb="1" weight="bold">
                                Color
                            </Text>
                            <Select.Root
                                size="1"
                                defaultValue="Green"
                                onValueChange={(value) =>
                                    setValue("color", value)
                                }
                            >
                                <Select.Trigger />
                                <Select.Content>
                                    {[
                                        "Gray",
                                        "Red",
                                        "Green",
                                        "Pink",
                                        "Sky",
                                    ].map((c, i) => (
                                        <Select.Item key={i} value={c}>
                                            {c}
                                        </Select.Item>
                                    ))}
                                </Select.Content>
                            </Select.Root>
                        </label>
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">Save</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AddHabit;
