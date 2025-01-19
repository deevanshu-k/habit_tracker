import {
    Box,
    Button,
    Card,
    Separator,
    Text,
    TextField,
} from "@radix-ui/themes";
import React from "react";
import GoogleIcon from "../../../../components/custom-icons/googleicon";
import { useNavigate } from "react-router";

const SignUpCard: React.FC<{ verifyOtp: () => void }> = ({ verifyOtp }) => {
    const navigate = useNavigate();

    return (
        <Card className="min-w-[420px] p-9">
            <Button
                variant="soft"
                radius="none"
                className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
            >
                <div className="w-[18px]">
                    <GoogleIcon size={48} />
                </div>
                <Separator orientation="vertical" ml={"2"} size={"2"} />
                <div className="flex-1">
                    <Text size={"3"} className="tracking-widest">
                        Sign up with Google
                    </Text>
                </div>
            </Button>
            <Box my={"4"} className="flex align-middle justify-evenly">
                <Separator mt={"3"} size={"3"} />
                <Text as="p" align={"center"} className="opacity-40">
                    Or, register with your email
                </Text>
                <Separator mt={"3"} size={"3"} />
            </Box>
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    First name <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    type="text"
                    radius="none"
                    placeholder="Your first name"
                    size="3"
                />
            </Box>
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    Last name <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    type="text"
                    radius="none"
                    placeholder="Your last name"
                    size="3"
                />
            </Box>
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    Email <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    type="email"
                    radius="none"
                    placeholder="abc@example.com"
                    size="3"
                />
            </Box>
            <Box mb="4">
                <Text as="p" size={"3"} mb="1" className="opacity-70">
                    Password <Text className="text-red-500">*</Text>
                </Text>
                <TextField.Root
                    type="password"
                    radius="none"
                    placeholder="Your password"
                    size="3"
                />
            </Box>
            <Button
                radius="none"
                className="flex h-[40px] w-[100%] pl-4 cursor-pointer"
                size="3"
                mt="5"
                onClick={verifyOtp}
            >
                Sign up
            </Button>
            <Box mt="5" className="flex align-middle justify-center">
                <Text as="span" align="center" className="opacity-40">
                    Already have an account?
                </Text>
                <Text
                    ml="1"
                    color="grass"
                    onClick={() => navigate("/signin")}
                    className="hover:underline cursor-pointer"
                >
                    Sign in
                </Text>
            </Box>
        </Card>
    );
};

export default SignUpCard;
