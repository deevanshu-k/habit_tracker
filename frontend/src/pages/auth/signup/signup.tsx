import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import VerifyOtpCard from "./verifyotpcard/verifyotpcard";
import SignUpCard from "./signupcard/signupcard";

const SignUp: React.FC = () => {
    const [verify, setVerifyOtp] = useState<boolean>(false);

    return (
        <Flex
            direction="column"
            align={"center"}
            justify={"center"}
            className="py-16 min-h-screen"
        >
            <Box pb="7" mb="2">
                <Heading size={"8"} weight={"bold"} align={"center"}>
                    {verify
                        ? "🔐 Verify your email!"
                        : "Transform Your Life, One Habit at a Time 🌟"}
                </Heading>
                <Text
                    as="p"
                    size={"5"}
                    color="gray"
                    weight="medium"
                    align={"center"}
                    mt="2"
                >
                    {verify
                        ? "One Time Password (OTP) has been sent via Email"
                        : "Small Steps, Big Changes 🚀 Start Your Journey Today!"}
                </Text>
            </Box>
            {verify ? (
                <VerifyOtpCard
                    editSignForm={() => setVerifyOtp(false)}
                    length={6}
                />
            ) : (
                <SignUpCard verifyOtp={() => setVerifyOtp(true)} />
            )}
        </Flex>
    );
};

export default SignUp;
