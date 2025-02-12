import {
    Box,
    CheckboxCards,
    Flex,
    HoverCard,
    Separator,
    Text,
} from "@radix-ui/themes";
import React from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import {
    updateHabitLogAction,
    UpdateHabitLogAction,
} from "../../../../../store/habit/habit.action";

const HabitCheckBox: React.FC<{
    id: string;
    is_done: boolean;
    title: string;
    updateStatus: (is_done: boolean) => void;
}> = ({ id, is_done, title, updateStatus }) => {
    return (
        <CheckboxCards.Root size="1" defaultValue={[is_done ? id : ""]}>
            <CheckboxCards.Item
                value={id}
                onClick={() => updateStatus(!is_done)}
            >
                {title}
            </CheckboxCards.Item>
        </CheckboxCards.Root>
    );
};

const CellHabitStat: React.FC<{
    habits: {
        id: string;
        title: string;
        description: string;
        color: string;
        is_done: boolean;
        note: string;
    }[];
    date: number;
    month: number;
    year: number;
}> = ({ habits, date, month, year }) => {
    const dispatcher = useDispatch<Dispatch<UpdateHabitLogAction>>();

    const updateHabitLog = (_id: string, _is_done: boolean, _note: string) => {
        dispatcher(
            updateHabitLogAction(_id, date, month, year, _is_done, _note)
        );
    };
    return (
        <HoverCard.Root>
            <HoverCard.Trigger>
                <Box className="border flex justify-center items-center rounded-full w-[40px] aspect-square cursor-pointer">
                    <Text>
                        {habits.reduce((p, h) => p + (h.is_done ? 1 : 0), 0) +
                            "/" +
                            habits.length}
                    </Text>
                </Box>
            </HoverCard.Trigger>
            <HoverCard.Content size={"1"}>
                <Flex direction={"column"} gap={"2"}>
                    {habits
                        .filter((habit) => habit.is_done)
                        .map((habit) => (
                            <div key={habit.id}>
                                <HabitCheckBox
                                    id={habit.id}
                                    is_done={habit.is_done}
                                    title={habit.title}
                                    updateStatus={(s) =>
                                        updateHabitLog(habit.id, s, habit.note)
                                    }
                                />
                            </div>
                        ))}
                    {habits.filter((habit) => !habit.is_done).length > 0 &&
                    habits.filter((habit) => habit.is_done).length > 0 ? (
                        <Separator orientation="horizontal" my={"2"} size="4" />
                    ) : (
                        ""
                    )}

                    {habits
                        .filter((habit) => !habit.is_done)
                        .map((habit) => (
                            <div key={habit.id}>
                                <HabitCheckBox
                                    id={habit.id}
                                    is_done={habit.is_done}
                                    title={habit.title}
                                    updateStatus={(s) =>
                                        updateHabitLog(habit.id, s, habit.note)
                                    }
                                />
                            </div>
                        ))}
                </Flex>
            </HoverCard.Content>
        </HoverCard.Root>
    );
};

export default CellHabitStat;
