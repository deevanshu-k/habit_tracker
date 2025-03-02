import {
    Box,
    Button,
    CheckboxCards,
    Dialog,
    Flex,
    RadioCards,
    Select,
    Text,
    TextArea,
    TextField,
} from "@radix-ui/themes";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { addHabitAction, AddHabitAction } from "../../store/habit/habit.action";

const AddHabit: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const dispatch = useDispatch<Dispatch<AddHabitAction>>();
    const { register, setValue, handleSubmit, control, watch, reset } =
        useForm<{
            title: string;
            description: string;
            color: string;
            weeklyFrequency: string[];
            selection: string;
        }>({
            defaultValues: {
                color: "Green",
                weeklyFrequency: [],
                selection: "",
            },
        });

    const onAddSumbmit = (data: {
        title: string;
        description: string;
        color: string;
    }) => {
        let freq = "";
        const wfreq = watch().weeklyFrequency;
        ["1", "2", "3", "4", "5", "6", "7"].forEach((t) => {
            freq = freq + String(Number(wfreq.includes(t)));
        });
        dispatch(
            addHabitAction(data.title, data.description, data.color, freq)
        );
        reset();
    };

    return (
        <Dialog.Root>
            <Dialog.Trigger>{children}</Dialog.Trigger>
            <Dialog.Content maxWidth="600px">
                <Dialog.Title align={"center"}>Add Habit</Dialog.Title>

                <form onSubmit={handleSubmit(onAddSumbmit)}>
                    <Flex direction="column" gap="4">
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
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                Weekly Frequency
                            </Text>
                            <Box>
                                <Controller
                                    name="weeklyFrequency"
                                    control={control}
                                    render={({ field }) => (
                                        <CheckboxCards.Root
                                            columns={{ initial: "1", sm: "4" }}
                                            value={field.value}
                                            onValueChange={(v) => {
                                                if (
                                                    v.length == 5 &&
                                                    !["2", "3", "4", "5", "6"]
                                                        .map((t) =>
                                                            v.includes(t)
                                                        )
                                                        .includes(false)
                                                ) {
                                                    setValue("selection", "1");
                                                } else if (
                                                    v.length == 7 &&
                                                    [
                                                        "1",
                                                        "2",
                                                        "3",
                                                        "4",
                                                        "5",
                                                        "6",
                                                        "7",
                                                    ].map((t) => v.includes(t))
                                                ) {
                                                    setValue("selection", "2");
                                                } else {
                                                    setValue("selection", "");
                                                }
                                                field.onChange(v);
                                            }}
                                        >
                                            <CheckboxCards.Item value="1">
                                                <Text weight="bold">
                                                    Sunday
                                                </Text>
                                            </CheckboxCards.Item>
                                            <CheckboxCards.Item value="2">
                                                <Text weight="bold">
                                                    Monday
                                                </Text>
                                            </CheckboxCards.Item>
                                            <CheckboxCards.Item value="3">
                                                <Text weight="bold">
                                                    Tuesday
                                                </Text>
                                            </CheckboxCards.Item>
                                            <CheckboxCards.Item value="4">
                                                <Text weight="bold">
                                                    Wednesday
                                                </Text>
                                            </CheckboxCards.Item>
                                            <CheckboxCards.Item value="5">
                                                <Text weight="bold">
                                                    Thursday
                                                </Text>
                                            </CheckboxCards.Item>
                                            <CheckboxCards.Item value="6">
                                                <Text weight="bold">
                                                    Friday
                                                </Text>
                                            </CheckboxCards.Item>
                                            <CheckboxCards.Item value="7">
                                                <Text weight="bold">
                                                    Saturday
                                                </Text>
                                            </CheckboxCards.Item>
                                        </CheckboxCards.Root>
                                    )}
                                />
                            </Box>
                            <Box mt="4">
                                <Controller
                                    name="selection"
                                    control={control}
                                    render={({ field }) => (
                                        <RadioCards.Root
                                            value={field.value}
                                            onValueChange={(v) => {
                                                if (v == "1") {
                                                    setValue(
                                                        "weeklyFrequency",
                                                        [
                                                            "2",
                                                            "3",
                                                            "4",
                                                            "5",
                                                            "6",
                                                        ]
                                                    );
                                                } else if (v == "2") {
                                                    setValue(
                                                        "weeklyFrequency",
                                                        [
                                                            "1",
                                                            "2",
                                                            "3",
                                                            "4",
                                                            "5",
                                                            "6",
                                                            "7",
                                                        ]
                                                    );
                                                }
                                                field.onChange(v);
                                            }}
                                        >
                                            <RadioCards.Item value="1">
                                                <Text weight="bold">
                                                    Week days
                                                </Text>
                                            </RadioCards.Item>
                                            <RadioCards.Item value="2">
                                                <Text weight="bold">
                                                    Every day
                                                </Text>
                                            </RadioCards.Item>
                                        </RadioCards.Root>
                                    )}
                                />
                            </Box>
                        </label>
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button
                                variant="soft"
                                color="gray"
                                onClick={() => reset()}
                            >
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
