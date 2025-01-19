import { Box, Button, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import { useNavigate } from "react-router";

const EnterEmailForm: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    return (
        <Box className="min-w-[420px] p-9">
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    Email <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    type="email"
                    radius="none"
                    placeholder="abc@example.com"
                    size="3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Box>
            <Button
                radius="none"
                className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                size="3"
                mt="5"
                onClick={() =>
                    window.location.replace(
                        `/reset-password?oobcode=jash&email=${email}`
                    )
                }
            >
                Reset Password
            </Button>
            <Box mt="5" className="flex align-middle justify-center">
                <Text
                    ml="1"
                    color="grass"
                    className="hover:underline cursor-pointer"
                    onClick={() => navigate("/signin")}
                >
                    Go to sign-in page
                </Text>
            </Box>
        </Box>
    );
};

export default EnterEmailForm;
