import { Button, Dialog, Flex, TextArea, Tooltip } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";

const AddNoteToHabit: React.FC<{
    children: React.ReactNode;
    tooltip: string;
    habit: string;
    previous_note: string;
    onSubmit: (_note: string) => void;
}> = ({ children, tooltip, previous_note, onSubmit }) => {
    const { register, handleSubmit } = useForm<{
        note: string;
    }>({ defaultValues: { note: previous_note } });

    return (
        <Dialog.Root>
            <Tooltip content={tooltip}>
                <Dialog.Trigger>{children}</Dialog.Trigger>
            </Tooltip>

            <Dialog.Content maxWidth="450px">
                <Dialog.Title>Note</Dialog.Title>
                <form onSubmit={handleSubmit((data) => onSubmit(data.note))}>
                    <Flex direction="column" gap="3">
                        <label>
                            <TextArea
                                rows={4}
                                {...register("note", { required: true })}
                            ></TextArea>
                        </label>
                    </Flex>

                    <Flex gap="3" mt="3" justify="end">
                        <Dialog.Close>
                            <Button size={"1"} variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit" size={"1"}>
                                Save
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default AddNoteToHabit;
