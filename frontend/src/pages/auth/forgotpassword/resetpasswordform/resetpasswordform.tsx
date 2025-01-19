import { Box, Button, Text, TextField } from "@radix-ui/themes";
import React from "react";

const ResetPasswordForm: React.FC = () => {
    return (
        <Box className="min-w-[420px] p-9">
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    New password <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    type="password"
                    radius="none"
                    placeholder="Enter password"
                    size="3"
                    className="tracking-wider"
                />
            </Box>
            <Button
                radius="none"
                className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                size="3"
                mt="5"
            >
                Save
            </Button>
        </Box>
    );
};

export default ResetPasswordForm;
