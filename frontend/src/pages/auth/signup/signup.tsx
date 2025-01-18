import {
    Box,
    Button,
    Card,
    Flex,
    Heading,
    Separator,
    Text,
} from "@radix-ui/themes";
import React from "react";
import GoogleIcon from "../../../components/custom-icons/googleicon";

const SignUp: React.FC = () => {
    return (
        <Flex direction="column" align={"center"} className="h-screen">
            <Box p="7">
                <Heading size={"7"} weight={"bold"} align={"center"}>
                    Transform Your Life, One Habit at a Time 🌟
                </Heading>
                <Text
                    as="p"
                    size={"5"}
                    weight={"bold"}
                    color="gray"
                    align={"center"}
                >
                    Small Steps, Big Changes 🚀 Start Your Journey Today!
                </Text>
            </Box>
            <Card className="min-w-[420px] p-5">
                <Button variant="soft" className="flex h-[50px] w-[100%] pl-4 cursor-pointer">
                    <div className="w-[20px]">
                        <GoogleIcon size={48} />
                    </div>
                    <Separator orientation="vertical" ml={"2"} size={"2"} />
                    <div className="flex-1">
                        <Text size={"4"} className="tracking-widest">
                            Sign in with Google
                        </Text>
                    </div>
                </Button>
                <Box my={"4"} className="flex align-middle justify-evenly">
                    <Separator mt={"3"} size={"3"} />
                    <Text as="p" align={"center"}>
                        Or, register with your email
                    </Text>
                    <Separator mt={"3"} size={"3"} />
                </Box>
            </Card>
        </Flex>
    );
};

export default SignUp;
