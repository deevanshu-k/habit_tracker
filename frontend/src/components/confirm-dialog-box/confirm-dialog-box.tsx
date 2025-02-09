import { AlertDialog, Button, Flex, Text, Tooltip } from "@radix-ui/themes";
import React from "react";

const ConfirmDialogBox: React.FC<{
    children: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    description: string;
    tooltip: string;
}> = ({ children, onCancel, onConfirm, title, description, tooltip }) => {
    return (
        <AlertDialog.Root>
            <Tooltip content={tooltip}>
                <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
            </Tooltip>
            <AlertDialog.Content size={"1"} maxWidth={"400px"}>
                <AlertDialog.Title>
                    <Text size="3">{title}</Text>
                </AlertDialog.Title>
                <AlertDialog.Description size="2">
                    {description}
                </AlertDialog.Description>

                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button
                            className="cursor-pointer"
                            onClick={onCancel}
                            size={"1"}
                            variant="soft"
                            color="gray"
                        >
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button
                            className="cursor-pointer"
                            onClick={onConfirm}
                            size={"1"}
                            variant="solid"
                            color="red"
                        >
                            Confirm
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default ConfirmDialogBox;
