import { Button, Dialog, Flex, TextField, Tooltip } from "@radix-ui/themes";
import React from "react";
import { useForm } from "react-hook-form";

const EditTodo: React.FC<{
    children: React.ReactNode;
    previous_title: string;
    onSubmit: (_title: string) => void;
    tooltip: string;
}> = ({ children, previous_title, onSubmit, tooltip }) => {
    const { register, handleSubmit } = useForm<{
        title: string;
    }>({ defaultValues: { title: previous_title } });

    return (
        <Dialog.Root>
            <Tooltip content={tooltip}>
                <Dialog.Trigger>{children}</Dialog.Trigger>
            </Tooltip>

            <Dialog.Content maxWidth={"400px"}>
                <Dialog.Title size={"2"}>Todo</Dialog.Title>
                <form onSubmit={handleSubmit((data) => onSubmit(data.title))}>
                    <Flex direction="column" gap="3">
                        <label>
                            <TextField.Root
                                size={"3"}
                                {...register("title", { required: true })}
                                placeholder="Enter title here"
                            />
                        </label>
                    </Flex>

                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button size={"1"} variant="soft" color="gray">
                                Cancel
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button size={"1"} type="submit">
                                Update
                            </Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default EditTodo;
